package com.eduplatform.auth.config;

import com.eduplatform.auth.entity.User;
import com.eduplatform.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create default admin account if not exists
        if (!userRepository.existsByEmail("admin@eduplatform.com")) {
            User admin = User.builder()
                    .firstName("Admin")
                    .lastName("EduPlatform")
                    .email("admin@eduplatform.com")
                    .password(passwordEncoder.encode("Admin@2024"))
                    .role("admin")
                    .enabled(true)
                    .build();
            userRepository.save(admin);
            log.info("✅ Admin account created: admin@eduplatform.com");
        }

        // Create demo teacher
        if (!userRepository.existsByEmail("prof@eduplatform.com")) {
            User teacher = User.builder()
                    .firstName("Mohammed")
                    .lastName("El Amrani")
                    .email("prof@eduplatform.com")
                    .password(passwordEncoder.encode("Prof@2024"))
                    .role("teacher")
                    .enabled(true)
                    .build();
            userRepository.save(teacher);
            log.info("✅ Teacher account created: prof@eduplatform.com");
        }

        // Create demo student
        if (!userRepository.existsByEmail("etudiant@eduplatform.com")) {
            User student = User.builder()
                    .firstName("Youssef")
                    .lastName("Benali")
                    .email("etudiant@eduplatform.com")
                    .password(passwordEncoder.encode("Etudiant@2024"))
                    .role("student")
                    .enabled(true)
                    .build();
            userRepository.save(student);
            log.info("✅ Student account created: etudiant@eduplatform.com");
        }

        // Create demo parent
        if (!userRepository.existsByEmail("parent@eduplatform.com")) {
            User parent = User.builder()
                    .firstName("Fatima")
                    .lastName("Zahra")
                    .email("parent@eduplatform.com")
                    .password(passwordEncoder.encode("Parent@2024"))
                    .role("parent")
                    .enabled(true)
                    .build();
            userRepository.save(parent);
            log.info("✅ Parent account created: parent@eduplatform.com");
        }
    }
}
