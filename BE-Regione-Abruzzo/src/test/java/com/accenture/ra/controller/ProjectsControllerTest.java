package com.accenture.ra.controller;

import com.accenture.ra.BaseCoreTest;
import com.accenture.ra.dto.response.*;
import com.fasterxml.jackson.core.type.TypeReference;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Sql(scripts = { "classpath:cleanup.sql", "classpath:data.sql" }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
class ProjectsControllerTest extends BaseCoreTest {

	@Test
	void getProjectListTest() throws Exception {

		final String methodName = "ProjectsControllerTest.getProjectListTest()";
		logger.info(LOG_START_JUNIT, methodName);

		final String response = this.callGETmethodWithStatusResponseAsString("/projects", this.success);

		ProjectListResponse resp = objectMapper.readValue(response, ProjectListResponse.class);

		assertNotNull(resp.getProjectsList());
		assertFalse(resp.getProjectsList().isEmpty());
		assertEquals("Progetto Artigiani", resp.getProjectsList().get(0).getName());

		logger.info(LOG_END_JUNIT, methodName, response);
	}

	@Test
	void getFilteredProjectTest() throws Exception {

		final String methodName = "ProjectsControllerTest.getFilteredProjectTest()";
		logger.info(LOG_START_JUNIT, methodName);
		final String bodyContent = readStringFromFile("mocks/request/bodyProjectFilterMock.json");

		MultiValueMap<String, String> values = new LinkedMultiValueMap<>();
		values.add("accept", "application/json");
		HttpHeaders headers = new HttpHeaders(values);

		final String response = this.callPOSTmethodWithStatusResponseAsString("/projects/filter", MediaType.APPLICATION_JSON,
				headers, bodyContent, this.success);

		ProjectListResponse resp = objectMapper.readValue(response, ProjectListResponse.class);

		assertNotNull(resp.getProjectsList());
		assertFalse(resp.getProjectsList().isEmpty());
		assertEquals("Progetto Artigiani", resp.getProjectsList().get(0).getName());


		logger.info(LOG_END_JUNIT, methodName, response);
	}



	@Test
	void getProjectDetailTest() throws Exception {

		final String methodName = "ProjectsControllerTest.getProjectDetailTest()";

		logger.info(LOG_START_JUNIT, methodName);


		final String response = this.callGETmethodWithStatusResponseAsString("/projects/1", this.success);

		ProjectDetailResponse resp = objectMapper.readValue(response, ProjectDetailResponse.class);


		assertNotNull(resp.getServiceDetail());
		assertEquals("Progetto Artigiani", resp.getServiceDetail().getName());

		logger.info(LOG_END_JUNIT, methodName, response);
	}

	@Test
	void patchServiceDetail() throws Exception {

		final String methodName = "ProjectsControllerTest.patchServiceDetail()";

		logger.info(LOG_START_JUNIT, methodName);
		final String bodyContent = readStringFromFile("mocks/request/bodyProjectPatchFilterMock.json");

		MultiValueMap<String, String> values = new LinkedMultiValueMap<>();
		values.add("accept", "application/json");
		HttpHeaders headers = new HttpHeaders(values);

		final String response = this.callPATCHmethodWithStatusResponseAsString("/projects/1",MediaType.APPLICATION_JSON,
				headers,bodyContent, this.success);

		ProjectDetailResponse resp = objectMapper.readValue(response, ProjectDetailResponse.class);


		assertNotNull(resp.getServiceDetail());
		assertEquals("Portale Servizi Cittadino", resp.getServiceDetail().getName());

		logger.info(LOG_END_JUNIT, methodName, response);
	}

	@Test
	void deleteServiceDetailTest() throws Exception {

		final String methodName = "ProjectsControllerTest.deleteServiceDetailTest()";

		logger.info(LOG_START_JUNIT, methodName);


		final String response = this.callDELETEmethodWithStatusResponseAsString("/projects/2",MediaType.APPLICATION_JSON,this.noContent);

		assertEquals(true,true);

		logger.info(LOG_END_JUNIT, methodName, response);
	}

	@Test
	void existsProjectTest() throws Exception {

		final String methodName = "ProjectsControllerTest.existsProjectTest()";

		logger.info(LOG_START_JUNIT, methodName);


		final String response = this.callGETmethodWithStatusResponseAsString("/projects/Progetto Artigiani/ArtigianiAbruzzo.it",this.success);

		Boolean resp = objectMapper.readValue(response, Boolean.class);

		assertEquals(Boolean.TRUE, resp);


		logger.info(LOG_END_JUNIT, methodName, resp);
	}


}
