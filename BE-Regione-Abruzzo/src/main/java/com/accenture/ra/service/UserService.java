package com.accenture.ra.service;

import com.accenture.ra.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    List<UserResponse> getUsers();
}
