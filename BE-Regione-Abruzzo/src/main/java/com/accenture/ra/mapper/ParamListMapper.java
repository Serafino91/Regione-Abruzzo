package com.accenture.ra.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.accenture.ra.dto.request.ParamList;
import com.accenture.ra.entity.ParamListEntity;

@Mapper(componentModel = "spring")
public interface ParamListMapper {

    ParamList toModel(ParamListEntity entity);

    List<ParamList> toModelList(List<ParamListEntity> entities);

    ParamListEntity toEntity(ParamList model);

    List<ParamListEntity> toEntityList(List<ParamList> models);

}
