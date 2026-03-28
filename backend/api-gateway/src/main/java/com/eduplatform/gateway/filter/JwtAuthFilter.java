package com.eduplatform.gateway.filter;

import com.eduplatform.gateway.util.JwtUtil;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class JwtAuthFilter extends AbstractGatewayFilterFactory<JwtAuthFilter.Config> {

    private final JwtUtil jwtUtil;

    // Routes that don't require authentication
    private static final List<String> OPEN_ENDPOINTS = List.of(
            "/api/auth/login",
            "/api/auth/register",
            "/api/auth/refresh-token"
    );

    // Role-based route protection
    private static final Map<String, List<String>> ROLE_PROTECTED_ROUTES = Map.of(
            "/api/admin", List.of("admin"),
            "/api/teacher", List.of("teacher", "admin"),
            "/api/courses/create", List.of("teacher", "admin"),
            "/api/exams/create", List.of("teacher", "admin"),
            "/api/exams/correct", List.of("teacher", "admin"),
            "/api/parent", List.of("parent", "admin")
    );

    public JwtAuthFilter(JwtUtil jwtUtil) {
        super(Config.class);
        this.jwtUtil = jwtUtil;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            String path = request.getURI().getPath();

            // Skip auth for public endpoints
            if (OPEN_ENDPOINTS.stream().anyMatch(path::startsWith)) {
                return chain.filter(exchange);
            }

            // Check Authorization header
            String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            String token = authHeader.substring(7);
            if (!jwtUtil.isTokenValid(token)) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            // Role-based access control
            String role = jwtUtil.extractRole(token);
            for (Map.Entry<String, List<String>> entry : ROLE_PROTECTED_ROUTES.entrySet()) {
                if (path.startsWith(entry.getKey())) {
                    if (role == null || !entry.getValue().contains(role)) {
                        exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
                        return exchange.getResponse().setComplete();
                    }
                    break;
                }
            }

            // Extract user info and strip any existing X-Auth headers to prevent spoofing
            String userId = jwtUtil.extractUserId(token);
            String email = jwtUtil.extractEmail(token);

            ServerHttpRequest modifiedRequest = request.mutate()
                    .headers(h -> {
                        h.remove("X-Auth-UserId");
                        h.remove("X-Auth-UserEmail");
                        h.remove("X-Auth-UserRole");
                    })
                    .header("X-Auth-UserId", userId != null ? userId : "")
                    .header("X-Auth-UserEmail", email != null ? email : "")
                    .header("X-Auth-UserRole", role != null ? role : "")
                    .build();

            return chain.filter(exchange.mutate().request(modifiedRequest).build());
        };
    }

    public static class Config {
        // Optional config class
    }
}
