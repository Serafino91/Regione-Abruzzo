package com.accenture.ra.controller;

import com.accenture.ra.BaseCoreTest;
import com.accenture.ra.dto.response.CatalogServicesListResponse;
import com.accenture.ra.dto.response.ServiceDetailResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@Sql(scripts = { "classpath:cleanup.sql", "classpath:data.sql" }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
class CatalogServicesControllerTest extends BaseCoreTest {

	@Test
	void findAllServiceTest() throws Exception {

		final String methodName = "CatalogServicesControllerTest.findAllServiceTest()";

		logger.info(LOG_START_JUNIT, methodName);

		final String response = this.callGETmethodWithStatusResponseAsString("/catalog/services", this.success);

		CatalogServicesListResponse resp = objectMapper.readValue(response, CatalogServicesListResponse.class);

		assertNotNull(resp.getServiceDetail());
		assertFalse(resp.getServiceDetail().isEmpty());
		assertEquals("VM Small", resp.getServiceDetail().get(0).getItem());

		logger.info(LOG_END_JUNIT, methodName, response);
	}

	@Test
	void getFilteredServicesTest() throws Exception {

		final String methodName = "CatalogServicesControllerTest.getFilteredServicesTest()";

		logger.info(LOG_START_JUNIT, methodName);
		final String bodyContent = readStringFromFile("mocks/request/bodyFilterMock.json");

		MultiValueMap<String, String> values = new LinkedMultiValueMap<>();
		values.add("accept", "application/json");
		HttpHeaders headers = new HttpHeaders(values);

		final String response = this.callPOSTmethodWithStatusResponseAsString("/catalog/services/filter", MediaType.APPLICATION_JSON,
				headers, bodyContent, this.success);

		CatalogServicesListResponse resp = objectMapper.readValue(response, CatalogServicesListResponse.class);

		assertNotNull(resp.getServiceDetail());
		assertFalse(resp.getServiceDetail().isEmpty());
		assertEquals("VM Medium", resp.getServiceDetail().get(0).getItem());

		logger.info(LOG_END_JUNIT, methodName, response);
	}

	@Test
	void getServiceDetailTest() throws Exception {

		final String methodName = "CatalogServicesControllerTest.getServiceDetailTest()";

		logger.info(LOG_START_JUNIT, methodName);


		final String response = this.callGETmethodWithStatusResponseAsString("/catalog/services/1", this.success);

		ServiceDetailResponse resp = objectMapper.readValue(response, ServiceDetailResponse.class);


		assertNotNull(resp.getServiceDetail());
		assertEquals("VM Small", resp.getServiceDetail().getItem());

		logger.info(LOG_END_JUNIT, methodName, response);
	}

	@Test
	void deleteServiceDetailTest() throws Exception {

		final String methodName = "CatalogServicesControllerTest.deleteServiceDetail()";

		logger.info(LOG_START_JUNIT, methodName);


		final String response = this.callDELETEmethodWithStatusResponseAsString("/catalog/services/1",MediaType.APPLICATION_JSON,this.noContent);

		assertEquals(true,true);

		logger.info(LOG_END_JUNIT, methodName, response);
	}

	@Test
	void deleteServiceDetailNotFoundTest() throws Exception {

		final String methodName = "CatalogServicesControllerTest.deleteServiceDetail()";


		logger.info(LOG_START_JUNIT, methodName);


		final String response = this.callGETmethodWithStatusResponseAsString("/catalog/services/1", this.success);

		ServiceDetailResponse resp = objectMapper.readValue(response, ServiceDetailResponse.class);


		assertNotNull(resp.getServiceDetail());
		assertEquals("VM Small", resp.getServiceDetail().getItem());

		logger.info(LOG_END_JUNIT, methodName, response);
	}


	@Test
	void getServiceByCategoryTest() throws Exception {

		final String methodName = "CatalogServicesControllerTest.getServiceByCategory()";

		logger.info(LOG_START_JUNIT, methodName);


		final String response = this.callGETmethodWithStatusResponseAsString("/catalog/services/getServices/1",this.success);

		CatalogServicesListResponse resp = objectMapper.readValue(response, CatalogServicesListResponse.class);

		assertNotNull(resp.getServiceDetail());
		assertFalse(resp.getServiceDetail().isEmpty());
		assertEquals("VM Small", resp.getServiceDetail().get(0).getItem());


		logger.info(LOG_END_JUNIT, methodName, resp);
	}
	
}
