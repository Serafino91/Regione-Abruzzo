package com.accenture.ra.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.accenture.ra.dto.request.ServiceDetail;
import com.accenture.ra.entity.ServiceEntity;

@Mapper(componentModel = "spring", uses = {ParamMapper.class, ParamListMapper.class, ServiceTypeMapper.class})
public interface ServiceMapper {

	@Mapping(source = "isBase", target = "base")
	@Mapping(source = "isOptional", target = "optional")
	@Mapping(source = "serviceType.name", target = "type")
	@Mapping(source = "paramList", target = "paramsList")
	@Mapping(source = "params", target = "params")
	@Mapping(source = "name", target = "item")
    ServiceDetail toModel(ServiceEntity entity);

    List<ServiceDetail> toModelList(List<ServiceEntity> entities);

    ServiceEntity toEntity(ServiceDetail model);

    @Mapping(source = "base", target = "isBase")
	@Mapping(source = "optional", target = "isOptional")
//    @Mapping(source = "type", target = "serviceType.name")
	@Mapping(source = "paramsList", target = "paramList")
	@Mapping(source = "params", target = "params")
//    @Mapping(source = "item", target = "name")
    List<ServiceEntity> toEntityList(List<ServiceDetail> models);

}
