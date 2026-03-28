package com.eduplatform.auth.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Simple in-memory rate limiter for login endpoint.
 * Allows max 5 attempts per minute per IP address.
 */
@Component
public class RateLimitFilter implements Filter {

    private static final int MAX_ATTEMPTS = 5;
    private static final long WINDOW_MS = 60_000; // 1 minute

    private final Map<String, RateInfo> requestCounts = new ConcurrentHashMap<>();

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;

        if (request.getRequestURI().contains("/api/auth/login") && "POST".equalsIgnoreCase(request.getMethod())) {
            String ip = request.getRemoteAddr();
            RateInfo rateInfo = requestCounts.computeIfAbsent(ip, k -> new RateInfo());

            long now = System.currentTimeMillis();
            if (now - rateInfo.windowStart.get() > WINDOW_MS) {
                rateInfo.count.set(0);
                rateInfo.windowStart.set(now);
            }

            if (rateInfo.count.incrementAndGet() > MAX_ATTEMPTS) {
                HttpServletResponse response = (HttpServletResponse) res;
                response.setStatus(429);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\":\"Trop de tentatives de connexion. Réessayez dans 1 minute.\",\"status\":429}");
                return;
            }
        }

        chain.doFilter(req, res);
    }

    private static class RateInfo {
        final AtomicInteger count = new AtomicInteger(0);
        final AtomicLong windowStart = new AtomicLong(System.currentTimeMillis());
    }
}
