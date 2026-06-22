package com.accenture.ra.service.impl;

import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.model.ProjectDetail;
import com.accenture.ra.model.ProjectPatchRequest;
import com.accenture.ra.model.ServiceDetail;
import com.accenture.ra.model.ServicePatchRequest;
import com.accenture.ra.repository.ProjectRepository;
import com.accenture.ra.service.CatalogService;
import com.accenture.ra.service.ProjectMapper;
import com.accenture.ra.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public ProjectDetail getProjectById(Long projectId) {
         ProjectEntity projectEntity = projectRepository.findById(projectId).get();
        return ProjectMapper.toModel(projectEntity);
    }

    /**
     * Gets the catalog services list.
     *
     * @return the catalog services list
     */
    @Override
    public List<ProjectDetail> getProjectAll() {
        List<ProjectEntity> entity = projectRepository.findAll();

        return ProjectMapper.toModelList(entity);
    }

    /**
	 * ...
	 *
	 * @return ...
	 */
    public ProjectDetail patchProject(Long serviceId, ProjectPatchRequest request) {
        return null;
    }

    /**
	 * ...
	 *
	 * @return ...
	 */
    public Boolean deleteProject(Long serviceId) {
      return true;
    }
}
