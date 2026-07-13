package com.accenture.ra.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.accenture.ra.dto.request.ParamDetail;
import com.accenture.ra.entity.ParamEntity;

@Mapper(componentModel = "spring")
public interface ParamMapper {

    ParamDetail toModel(ParamEntity entity);

    List<ParamDetail> toModelList(List<ParamEntity> entities);

    ParamEntity toEntity(ParamDetail model);

    List<ParamEntity> toEntityList(List<ParamDetail> models);

}
