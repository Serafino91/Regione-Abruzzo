package com.accenture.ra.mapper;

import com.accenture.ra.dto.request.RequestDetail;
import com.accenture.ra.entity.RequestEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {
        ProjectMapper.class,
        StateMapper.class,
        RequestServiceMapper.class
})
public interface RequestMapper {

    @Mapping(source = "requestServices", target = "services")
    RequestDetail toModel(RequestEntity entity);

    List<RequestDetail> toModelList(List<RequestEntity> entities);

    @Mapping(source = "services", target = "requestServices")
    RequestEntity toEntity(RequestDetail model);

    List<RequestEntity> toEntityList(List<RequestDetail> models);
}