package com.accenture.ra.controller;

import com.accenture.ra.dto.request.AccreditationRequest;
import com.accenture.ra.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/accreditation")
public class UserAccreditationController {

    private UserService userService;
    @PostMapping("/accredit")
    public ResponseEntity userAccreditation (@RequestBody AccreditationRequest request){
        userService.userAccreditation(request);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/status")
    public ResponseEntity<String> userAccreditationStatus (@RequestParam String CF){

        return new ResponseEntity<>(userService.userAccreditationStatus(CF), HttpStatus.OK);
    }

}
