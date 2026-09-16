package com.accenture.ra.utils;

import com.accenture.ra.entity.RequestEntity;
import com.accenture.ra.entity.RequestServiceEntity;
import com.accenture.ra.entity.ServiceEntity;
import com.accenture.ra.request.ServiceFilterCriteria;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

public class ServiceSpecification {

    public static Specification<ServiceEntity> withFilters(ServiceFilterCriteria criteria) {

        return (root, query, criteriaBuilder) -> {
            if (criteria == null) {
                return criteriaBuilder.conjunction();
            }

            var predicates = new java.util.ArrayList<>();

            // Filtro per categoria
            if (criteria.getCategoryId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("serviceType").get("id"), criteria.getCategoryId()));
            }

            // Filtro per servizi
            if (criteria.getServiceIds() != null && !criteria.getServiceIds().isEmpty()) {
                predicates.add(root.get("id").in(criteria.getServiceIds()));
            }

            // Combina tutti i predicati con AND
            return criteriaBuilder.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
    }
}