package com.accenture.ra.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "param")
@SQLDelete(sql = "UPDATE param SET deleted = true WHERE id=?")
@SQLRestriction("deleted = false")
public class ParamEntity {

	@Id
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "param_type")
	private String paramType;

	@Column(name = "min_value")
	private String minValue;

	@Column(name = "max_value")
	private String maxValue;

	@Column(name = "is_required")
	private Boolean isRequired;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "service_id", nullable = false)
	private ServiceEntity service;
    @Column(name = "deleted", nullable = false)
    @Builder.Default
    private boolean deleted = false;

}