package com.accenture.ra.controller;

import com.accenture.ra.BaseCoreTest;
import com.accenture.ra.dto.response.TicketModel;
import com.fasterxml.jackson.core.type.TypeReference;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.jdbc.Sql;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@Sql(scripts = { "classpath:cleanup.sql", "classpath:data.sql" }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
class IncidentControllerTest extends BaseCoreTest {

	@Test
	void getIncidentListTest() throws Exception {

		final String methodName = "IncidentControllerTest.getIncidentListTest()";
		logger.info(LOG_START_JUNIT, methodName);

		final String response = this.callGETmethodWithStatusResponseAsString("/incident/list", this.success);

		List<TicketModel> resp = objectMapper.readValue(response, new TypeReference<List<TicketModel>>() {});

		assertNotNull(resp);
		assertFalse(resp.isEmpty());

		logger.info(LOG_END_JUNIT, methodName, response);
	}

	@Test
	void getIncidentDetailTest() throws Exception {

		final String methodName = "IncidentControllerTest.getIncidentDetailTest()";
		logger.info(LOG_START_JUNIT, methodName);

		final String response = this.callGETmethodWithStatusResponseAsString("/incident/T1781595972077168", this.success);

		TicketModel resp = objectMapper.readValue(response, TicketModel.class);

		assertNotNull(resp);
		assertNotNull(resp.getCode());

		logger.info(LOG_END_JUNIT, methodName, response);
	}
}
