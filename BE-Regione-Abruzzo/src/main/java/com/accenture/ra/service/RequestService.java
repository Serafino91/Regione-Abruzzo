package com.accenture.ra.service;

import java.util.List;

import com.accenture.ra.dto.request.RequestDetail;
import com.accenture.ra.dto.response.RequestDetailResponse;
import com.accenture.ra.request.RequestCreationRequest;
import com.accenture.ra.request.RequestFilterCriteria;

public interface RequestService {

    public List<RequestDetail> getAllRequests();
    
    public RequestDetail getRequestById(String requestId);

    public RequestDetailResponse createRequest(RequestCreationRequest req);
    
    public List<RequestDetail> filterRequest(RequestFilterCriteria criteria);
}
