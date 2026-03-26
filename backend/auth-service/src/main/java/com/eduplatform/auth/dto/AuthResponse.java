package com.eduplatform.auth.dto;

/** Matches Angular interface: { user: User; token?: string; } */
public record AuthResponse(
    UserInfo user,
    String token
) {}
