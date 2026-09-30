package com.accenture.ra.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.accenture.ra.dto.response.TicketStateModel;
import com.accenture.ra.entity.TicketStateEntity;

@Mapper(componentModel = "spring")
public interface TicketStateMapper {

	TicketStateModel toModel(TicketStateEntity entity);
	
	List<TicketStateModel> toModelList(List<TicketStateEntity> entity);
	
	TicketStateEntity toEntity(TicketStateModel entity);
	
	List<TicketStateEntity> toEntityList(List<TicketStateModel> entity);
}
