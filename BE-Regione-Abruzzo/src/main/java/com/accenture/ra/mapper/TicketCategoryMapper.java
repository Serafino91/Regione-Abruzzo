package com.accenture.ra.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.accenture.ra.dto.response.TicketCategoryModel;
import com.accenture.ra.entity.CategoryEntity;

@Mapper(componentModel = "spring")
public interface TicketCategoryMapper {

	TicketCategoryModel toModel(CategoryEntity entity);
	
	List<TicketCategoryModel> toModelList(List<CategoryEntity> entity);
	
	CategoryEntity toEntity(TicketCategoryModel entity);
	
	List<CategoryEntity> toEntityList(List<TicketCategoryModel> entity);
	
}
