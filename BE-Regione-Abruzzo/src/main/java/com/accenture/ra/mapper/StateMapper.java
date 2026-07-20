package com.accenture.ra.mapper;

import com.accenture.ra.dto.request.StateDetail;
import com.accenture.ra.entity.StateEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StateMapper {

    StateDetail toModel(StateEntity entity);

    List<StateDetail> toModelList(List<StateEntity> entities);

    StateEntity toEntity(StateDetail model);

    List<StateEntity> toEntityList(List<StateDetail> models);

}
