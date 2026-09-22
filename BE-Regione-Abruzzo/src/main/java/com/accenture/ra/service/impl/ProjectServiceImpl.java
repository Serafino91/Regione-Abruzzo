package com.accenture.ra.service.impl;

import com.accenture.ra.dto.request.ProjectDetail;
import com.accenture.ra.dto.request.ProjectPatchRequest;
import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.mapper.ProjectMapper;
import com.accenture.ra.repository.ProjectRepository;
import com.accenture.ra.request.ProjectFilterCriteria;
import com.accenture.ra.service.ProjectService;
import com.accenture.ra.utils.ProjectSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


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
    public ProjectDetail patchProject(Long projectId, ProjectPatchRequest request) {
        ProjectEntity entity = projectRepository.findById(projectId).orElseThrow();

        if (request.getName() != null) entity.setName(request.getName());
        if (request.getDestinationLink() != null) entity.setDestinationLink(request.getDestinationLink());
        if (request.getDescription() != null) entity.setDescription(request.getDescription());
        entity.setUpdatedAt(LocalDateTime.now());

        return projectMapper.toModel(projectRepository.save(entity));
    }

    /**
	 * ...
	 *
	 * @return ...
	 */
    public Boolean deleteProject(Long serviceId) {
      return true;
    }



    public List<ProjectDetail> filterProjects(ProjectFilterCriteria criteria) {
        List<ProjectEntity> entities = projectRepository.findAll(ProjectSpecification.withFilters(criteria));
        return projectMapper.toModelList(entities);
    }
}
