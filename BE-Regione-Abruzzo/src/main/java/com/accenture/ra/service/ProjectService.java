package com.accenture.ra.service;

import com.accenture.ra.model.ProjectDetail;
import com.accenture.ra.model.ProjectPatchRequest;
import com.accenture.ra.model.ServiceDetail;
import com.accenture.ra.model.ServicePatchRequest;

import java.util.List;

public interface ProjectService {

	public ProjectDetail getProjectById(Long prjectId);
    
    public List<ProjectDetail> getProjectAll();

    public ProjectDetail patchProject(Long projectId, ProjectPatchRequest request);
	
    public Boolean deleteProject(Long projectId);
    
}
