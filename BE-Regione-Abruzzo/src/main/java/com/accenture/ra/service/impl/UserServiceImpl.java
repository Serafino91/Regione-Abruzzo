package com.accenture.ra.service.impl;

import com.accenture.ra.dto.response.UserResponse;
import com.accenture.ra.entity.UserEntity;
import com.accenture.ra.mapper.UserMapper;
import com.accenture.ra.repository.UserRepository;
import com.accenture.ra.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public List<UserResponse> getUsers() {
        List<UserEntity> userEntities = userRepository.findAll();
        return userMapper.toDtoList(userEntities);
    }
}