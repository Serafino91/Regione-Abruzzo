package com.accenture.ra.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accenture.ra.dto.request.ProjectDetail;
import com.accenture.ra.dto.request.ProjectPatchRequest;
import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.mapper.ProjectMapper;
import com.accenture.ra.repository.ProjectRepository;
import com.accenture.ra.service.ProjectService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    @Override
    public Boolean existsProject(String name, String destinationLink) {
        return projectRepository.existsByNameAndDestinationLink(name, destinationLink);
    }

    @Override
    public ProjectDetail getProjectById(Long projectId) {
         ProjectEntity projectEntity = projectRepository.findById(projectId).get();
        return projectMapper.toModel(projectEntity);
    }

    /**
     * Gets the catalog services list.
     *
     * @return the catalog services list
     */
    @Override
    public List<ProjectDetail> getProjectAll() {
        List<ProjectEntity> entity = projectRepository.findAll();

        return projectMapper.toModelList(entity);
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
