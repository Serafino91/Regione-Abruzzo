package com.accenture.ra.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.accenture.ra.dto.response.TicketStateModel;
import com.accenture.ra.entity.TicketStateEntity;

@Mapper(componentModel = "spring")
public interface TicketStateMapper {
	
    @Mapping(source = "stateName", target = "name")
    TicketStateModel toModel(TicketStateEntity entity);

    List<TicketStateModel> toModelList(List<TicketStateEntity> entities);

    @Mapping(source = "name", target = "stateName")
    TicketStateEntity toEntity(TicketStateModel model);

    List<TicketStateEntity> toEntityList(List<TicketStateModel> models);

}
