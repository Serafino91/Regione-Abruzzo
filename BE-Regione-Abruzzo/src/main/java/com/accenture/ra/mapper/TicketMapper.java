package com.accenture.ra.mapper;

import com.accenture.ra.dto.response.TicketModel;
import com.accenture.ra.entity.TicketEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TicketMapper {

    @Mapping(source = "state.stateName", target = "state.name")
    TicketModel toModel(TicketEntity entity);

    List<TicketModel> toModelList(List<TicketEntity> entities);

    @Mapping(source = "state.name", target = "state.stateName")
    TicketEntity toEntity(TicketModel model);

    List<TicketEntity> toEntityList(List<TicketModel> models);

}
