package com.accenture.ra.controller;

import com.accenture.ra.BaseCoreTest;
import com.accenture.ra.dto.response.RequestDetailResponse;
import com.accenture.ra.dto.response.RequestListResponse;
import com.accenture.ra.dto.response.ServiceTypeListResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.junit.jupiter.api.Assertions.*;

@Sql(scripts = { "classpath:cleanup.sql", "classpath:data.sql" }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
class ServiceTypeControllerTest extends BaseCoreTest {

	@Test
	void getCatalogServiceTypeListTest() throws Exception {

		final String methodName = "ServiceTypeControllerTest.getCatalogServiceTypeListTest()";
		logger.info(LOG_START_JUNIT, methodName);

		final String response = this.callGETmethodWithStatusResponseAsString("/serviceType", this.success);

		ServiceTypeListResponse resp = objectMapper.readValue(response, ServiceTypeListResponse.class);

		assertNotNull(resp.getServiceType());
		assertFalse(resp.getServiceType().isEmpty());
		assertEquals("IaaS standard", resp.getServiceType().get(0).getName());

		logger.info(LOG_END_JUNIT, methodName, response);
	}

}
