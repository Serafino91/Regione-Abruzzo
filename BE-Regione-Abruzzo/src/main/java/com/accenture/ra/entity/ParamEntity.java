package com.accenture.ra.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "param")
public class ParamEntity {

	@Id
	private String id;

	@Column(name = "name")
	private String name;

	@Column(name = "param_type")
	private String paramType;

	@Column(name = "min_value")
	private String minValue;

	@Column(name = "max_value")
	private String maxValue;

	@Column(name = "is_required")
	private boolean isRequired;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "service_id", nullable = false)
	private ServiceEntity service;

}