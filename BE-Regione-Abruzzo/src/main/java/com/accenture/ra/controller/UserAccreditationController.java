package com.accenture.ra.controller;

import com.accenture.ra.dto.request.AccreditationRequestDto;
import com.accenture.ra.entity.User;
import com.accenture.ra.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/accred")
public class UserAccreditationController {

    private UserService userService;

    public ResponseEntity userAccreditation (@RequestBody AccreditationRequestDto request){
        userService.userAccreditation(request);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<String> userAccreditationStatus (@RequestParam String CF){

        return new ResponseEntity<>(userService.userAccreditationStatus(CF), HttpStatus.OK);
    }

}
