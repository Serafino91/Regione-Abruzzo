package com.accenture.ra.entity;

import java.util.ArrayList;
import java.util.List;

import com.accenture.ra.model.ParamDetail;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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