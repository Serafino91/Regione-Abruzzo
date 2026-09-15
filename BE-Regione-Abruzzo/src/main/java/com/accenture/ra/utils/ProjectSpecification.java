package com.accenture.ra.utils;

import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.entity.RequestEntity;
import com.accenture.ra.entity.RequestServiceEntity;
import com.accenture.ra.entity.ServiceEntity;
import com.accenture.ra.request.ProjectFilterCriteria;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

public class ProjectSpecification {

    public static Specification<ProjectEntity> withFilters(ProjectFilterCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria == null) {
                return criteriaBuilder.conjunction();
            }

            var predicates = new java.util.ArrayList<>();
            // Filtro per id
            if (criteria.getProjectId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("id"), criteria.getProjectId()));
            }
            // Filtro per nome
            if (criteria.getName() != null) {
                predicates.add(criteriaBuilder.equal(root.get("name"), criteria.getName()));
            }
            // Combina tutti i predicati con AND
            return criteriaBuilder.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
    }
}
