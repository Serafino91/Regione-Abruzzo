package com.accenture.ra.mapper;

import com.accenture.ra.dto.request.ParamDetail;
import com.accenture.ra.dto.request.ServiceDetail;
import com.accenture.ra.entity.RequestServiceEntity;
import com.accenture.ra.entity.RequestServiceParamEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ServiceTypeMapper.class})
public interface RequestServiceMapper {

	@Mapping(source = "service.id", target = "id")
	@Mapping(source = "service.isBase", target = "base")
	@Mapping(source = "service.isOptional", target = "optional")
	@Mapping(source = "service.serviceType", target = "type")
	@Mapping(source = "service.name", target = "item")
	@Mapping(source = "params", target = "params")
	ServiceDetail toModel(RequestServiceEntity entity);

	List<ServiceDetail> toModelList(List<RequestServiceEntity> entities);

	@Mapping(source = "param.id", target = "id")
	@Mapping(source = "param.name", target = "name")
	@Mapping(source = "param.paramType", target = "paramType")
	@Mapping(source = "param.minValue", target = "minValue")
	@Mapping(source = "param.maxValue", target = "maxValue")
	@Mapping(source = "param.isRequired", target = "isRequired")
	ParamDetail toParamModel(RequestServiceParamEntity entity);

	List<ParamDetail> toParamModelList(List<RequestServiceParamEntity> entities);
}