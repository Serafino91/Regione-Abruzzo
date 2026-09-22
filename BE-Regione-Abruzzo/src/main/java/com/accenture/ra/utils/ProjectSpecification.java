package com.accenture.ra.utils;

import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.request.ProjectFilterCriteria;
import org.springframework.data.jpa.domain.Specification;

public class ProjectSpecification {

    public static Specification<ProjectEntity> withFilters(ProjectFilterCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria == null) { return criteriaBuilder.conjunction();}

            var predicates = new java.util.ArrayList<>();

            if (criteria.getProjectId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("id"), criteria.getProjectId()));
            }
            if (criteria.getName() != null) {
                predicates.add(criteriaBuilder.equal(root.get("name"), criteria.getName()));
            }
            return criteriaBuilder.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
    }
}
