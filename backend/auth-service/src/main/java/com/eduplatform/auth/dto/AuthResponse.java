package com.eduplatform.auth.dto;

public record AuthResponse(
    UserInfo user,
    String token,
    String refreshToken
) {}
