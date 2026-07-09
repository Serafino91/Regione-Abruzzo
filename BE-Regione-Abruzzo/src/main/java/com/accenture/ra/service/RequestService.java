package com.accenture.ra.service;

import java.util.List;

import com.accenture.ra.dto.request.RequestDetail;

public interface RequestService {

    public List<RequestDetail> getAllRequests();
    
    public RequestDetail getRequestById(String requestId);

    public RequestDetailResponse createRequest(RequestCreationRequest req);
}
