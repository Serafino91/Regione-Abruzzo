package com.accenture.ra.service;

import java.util.List;

import com.accenture.ra.model.RequestDetail;

public interface RequestService {

    public List<RequestDetail> getAllRequests();
    
    public RequestDetail getRequestById(String requestId);
}
