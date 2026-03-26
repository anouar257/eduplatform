package com.eduplatform.auth.dto;

/** Matches Angular interface: User { id: string; firstName; lastName; email; role; avatar?; bio? } */
public record UserInfo(
    String id,       // STRING, not Long — Angular expects string
    String firstName,
    String lastName,
    String email,
    String role,     // lowercase: "student", "teacher", "parent", "admin"
    String avatar,   // "avatar", NOT "avatarUrl" — matches Angular
    String bio
) {}
