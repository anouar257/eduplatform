package com.eduplatform.auth.service;

import com.eduplatform.auth.dto.*;
import com.eduplatform.auth.entity.User;
import com.eduplatform.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Email ou mot de passe incorrect"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Email ou mot de passe incorrect");
        }

        String accessToken = jwtService.generateToken(user.getId(), user.getEmail(), user.getRole());
        String refreshToken = jwtService.generateRefreshToken(user.getId(), user.getEmail());
        return new AuthResponse(toUserInfo(user), accessToken, refreshToken);
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Cet email est déjà utilisé");
        }

        String role = (request.role() != null && !request.role().isBlank()) ? request.role() : "student";

        // Block admin self-registration
        if ("admin".equalsIgnoreCase(role)) {
            throw new RuntimeException("Inscription en tant qu'admin non autorisée");
        }

        User user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(role)
                .enabled(true)
                .build();

        user = userRepository.save(user);

        String accessToken = jwtService.generateToken(user.getId(), user.getEmail(), user.getRole());
        String refreshToken = jwtService.generateRefreshToken(user.getId(), user.getEmail());
        return new AuthResponse(toUserInfo(user), accessToken, refreshToken);
    }

    public AuthResponse refreshToken(String refreshTokenStr) {
        if (!jwtService.isTokenValid(refreshTokenStr)) {
            throw new RuntimeException("Refresh token invalide ou expiré");
        }

        String type = jwtService.extractTokenType(refreshTokenStr);
        if (!"refresh".equals(type)) {
            throw new RuntimeException("Ce token n'est pas un refresh token");
        }

        String email = jwtService.extractEmail(refreshTokenStr);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        String newAccessToken = jwtService.generateToken(user.getId(), user.getEmail(), user.getRole());
        String newRefreshToken = jwtService.generateRefreshToken(user.getId(), user.getEmail());
        return new AuthResponse(toUserInfo(user), newAccessToken, newRefreshToken);
    }

    public UserInfo getMe(String token) {
        String email = jwtService.extractEmail(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return toUserInfo(user);
    }

    private UserInfo toUserInfo(User user) {
        return new UserInfo(
                String.valueOf(user.getId()),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.getAvatar(),
                user.getBio()
        );
    }
}
