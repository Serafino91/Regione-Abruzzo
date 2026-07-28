package com.accenture.ra.service;

import com.accenture.ra.dto.response.UserResponse;
import com.accenture.ra.entity.User;

import java.util.List;

public interface UserService {

    List<UserResponse> getUsers();
}
