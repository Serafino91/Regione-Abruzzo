package com.accenture.ra.utils;

import com.accenture.ra.entity.TicketEntity;
import com.accenture.ra.request.IncidentFilterCriteria;
import org.springframework.data.jpa.domain.Specification;

public class IncidentSpecification {

    public static Specification<TicketEntity> withFilters(IncidentFilterCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria == null) {
                return criteriaBuilder.conjunction();
            }

            var predicates = new java.util.ArrayList<>();

            // Filtro per codice
            if (criteria.getCode() != null && !criteria.getCode().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("code"), criteria.getCode()));
            }

            // Filtro per categoria
            if (criteria.getCategory() != null && !criteria.getCategory().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("category"), criteria.getCategory()));
            }

            // Filtro per sottocategoria
            if (criteria.getSubcategory() != null && !criteria.getSubcategory().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("subcategory"), criteria.getSubcategory().toLowerCase()));
            }

            // Filtro per stato
            if (criteria.getStateId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("state").get("id"), criteria.getStateId()));
            }

            // Filtro per data apertura FROM (da)
            if (criteria.getOpeningDateFrom() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("openingDate"), criteria.getOpeningDateFrom()));
            }

            // Filtro per data apertura TO (a)
            if (criteria.getOpeningDateTo() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("openingDate"), criteria.getOpeningDateTo()));
            }

            // Filtro per richiedente
            if (criteria.getApplicant() != null) {
                predicates.add(criteriaBuilder.equal(root.get("applicant"), criteria.getApplicant()));
            }
            
            // Combina tutti i predicati con AND
            return criteriaBuilder.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
    }
}
