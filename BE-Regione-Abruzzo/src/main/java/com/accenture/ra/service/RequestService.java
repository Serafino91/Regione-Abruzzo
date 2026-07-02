package com.accenture.ra.service;

import java.util.List;

import com.accenture.ra.model.RequestDetail;
import com.accenture.ra.request.RequestCreationRequest;
import com.accenture.ra.response.RequestDetailResponse;

public interface RequestService {

    public List<RequestDetail> getAllRequests();
    
    public RequestDetail getRequestById(String requestId);
    
    public RequestDetailResponse createRequest(RequestCreationRequest req);
}
