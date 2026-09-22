package com.accenture.ra.controller;

import com.accenture.ra.BaseCoreTest;
import com.accenture.ra.dto.response.ProjectDetailResponse;
import com.accenture.ra.dto.response.ProjectListResponse;
import com.accenture.ra.dto.response.RequestDetailResponse;
import com.accenture.ra.dto.response.RequestListResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.junit.jupiter.api.Assertions.*;

@Sql(scripts = { "classpath:cleanup.sql", "classpath:data.sql" }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
class RequestControllerTest extends BaseCoreTest {

	@Test
	void getCatalogRequestsListTest() throws Exception {

		final String methodName = "RequestControllerTest.getCatalogRequestsListTest()";
		logger.info(LOG_START_JUNIT, methodName);

		final String response = this.callGETmethodWithStatusResponseAsString("/request", this.success);

		RequestListResponse resp = objectMapper.readValue(response, RequestListResponse.class);

		assertNotNull(resp.getRequestsList());
		assertFalse(resp.getRequestsList().isEmpty());
		assertEquals("req_1234005670089", resp.getRequestsList().get(0).getRequestId());

		logger.info(LOG_END_JUNIT, methodName, response);
	}

	@Test
	void createRequestTest() throws Exception{
		final String methodName = "RequestControllerTest.createRequestTest()";
		logger.info(LOG_START_JUNIT, methodName);
		final String bodyContent = readStringFromFile("mocks/request/bodyRequestCreateMock.json");

		MultiValueMap<String, String> values = new LinkedMultiValueMap<>();
		values.add("accept", "application/json");
		HttpHeaders headers = new HttpHeaders(values);

		final String response = this.callPUTmethodWithStatusResponseAsString("/request", MediaType.APPLICATION_JSON,
				headers, bodyContent, this.created);

		RequestDetailResponse resp = objectMapper.readValue(response, RequestDetailResponse.class);

		assertNotNull(resp.getRequestDetail());

	}

	@Test
	void getFilteredRequestsTest() throws Exception {

		final String methodName = "RequestControllerTest.getFilteredRequestsTest()";
		logger.info(LOG_START_JUNIT, methodName);
		final String bodyContent = readStringFromFile("mocks/request/bodyRequestFilterMock.json");

		MultiValueMap<String, String> values = new LinkedMultiValueMap<>();
		values.add("accept", "application/json");
		HttpHeaders headers = new HttpHeaders(values);

		final String response = this.callPOSTmethodWithStatusResponseAsString("/request/filter", MediaType.APPLICATION_JSON,
				headers, bodyContent, this.success);

		RequestListResponse resp = objectMapper.readValue(response, RequestListResponse.class);

		assertNotNull(resp.getRequestsList());
		assertFalse(resp.getRequestsList().isEmpty());
		assertEquals("req_1234005670089", resp.getRequestsList().get(0).getRequestId());


		logger.info(LOG_END_JUNIT, methodName, response);
	}



	@Test
	void getProjectDetailTest() throws Exception {

		final String methodName = "RequestControllerTest.getRequestDetailTest()";

		logger.info(LOG_START_JUNIT, methodName);


		final String response = this.callGETmethodWithStatusResponseAsString("/request/req_1234005670089", this.success);

		RequestDetailResponse resp = objectMapper.readValue(response, RequestDetailResponse.class);


		assertNotNull(resp.getRequestDetail());
		assertEquals("req_1234005670089", resp.getRequestDetail().getRequestId());

		logger.info(LOG_END_JUNIT, methodName, response);
	}
}
