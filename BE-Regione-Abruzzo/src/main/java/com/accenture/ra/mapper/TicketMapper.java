package com.accenture.ra.mapper;

import com.accenture.ra.entity.Ticket;
import com.accenture.ra.model.TicketPayload;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TicketMapper {

    @Mapping(target = "hostName", source = "hostName")
    @Mapping(target = "message", source = "message")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Ticket toEntity(TicketPayload payload);
}