package com.accenture.ra.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.accenture.ra.dto.request.RequestDetail;
import com.accenture.ra.entity.RequestEntity;

@Mapper(componentModel = "spring", uses = {ProjectMapper.class, StateMapper.class, ServiceMapper.class, ServiceTypeMapper.class})
public interface RequestMapper {

    RequestDetail toModel(RequestEntity entity);

    List<RequestDetail> toModelList(List<RequestEntity> entities);

    RequestEntity toEntity(RequestDetail model);

    List<RequestEntity> toEntityList(List<RequestDetail> models);

}
