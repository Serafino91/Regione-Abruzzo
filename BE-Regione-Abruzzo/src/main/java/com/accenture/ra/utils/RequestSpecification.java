package com.accenture.ra.utils;

import com.accenture.ra.entity.RequestEntity;
import com.accenture.ra.entity.ServiceEntity;
import com.accenture.ra.request.RequestFilterCriteria;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

/**
 * Specification per la costruzione dinamica di query per filtrare le richieste
 * Consente di combinare più criteri di filtro opzionali in modo type-safe
 */
public class RequestSpecification {

    /**
     * Crea una Specification basata sui criteri di filtro forniti
     * 
     * @param criteria i criteri di filtro (possono essere nulli o parziali)
     * @return la Specification per la query
     */
    public static Specification<RequestEntity> withFilters(RequestFilterCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria == null) {
                return criteriaBuilder.conjunction();
            }

            var predicates = new java.util.ArrayList<>();

            // Filtro per stato
            if (criteria.getStateId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("state").get("id"), criteria.getStateId()));
            }

            // Filtro per categoria
            if (criteria.getCategoryId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("category").get("id"), criteria.getCategoryId()));
            }

            // Filtro per servizi
            if (criteria.getServiceIds() != null && !criteria.getServiceIds().isEmpty()) {
                Join<RequestEntity, ServiceEntity> serviceJoin = root.join("services", JoinType.INNER);
                predicates.add(serviceJoin.get("id").in(criteria.getServiceIds()));
                query.distinct(true);
            }

            // Filtro per data di creazione - da
            if (criteria.getSendFrom() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("createdAt"), criteria.getSendFrom()));
            }

            // Filtro per data di creazione - a
            if (criteria.getSendTo() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("createdAt"), criteria.getSendTo()));
            }

            // Filtro per project
            if (criteria.getProjectId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("project").get("id"), criteria.getProjectId()));
            }

            // Combina tutti i predicati con AND
            return criteriaBuilder.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
    }
}
