package com.accenture.ra.service;

import com.accenture.ra.dto.request.ProjectDetail;
import com.accenture.ra.dto.request.ProjectPatchRequest;

import java.util.List;

public interface ProjectService {

	public ProjectDetail getProjectById(Long prjectId);
    
    public List<ProjectDetail> getProjectAll();

    public ProjectDetail patchProject(Long projectId, ProjectPatchRequest request);
	
    public Boolean deleteProject(Long projectId);
    
}
