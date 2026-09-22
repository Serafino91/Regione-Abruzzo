package com.accenture.ra.controller;


import com.accenture.ra.BaseCoreTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.dao.InvalidDataAccessResourceUsageException;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.jdbc.Sql;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@Sql(scripts = { "classpath:schema.sql", "classpath:data.sql" }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
class ControllerExceptionTest extends BaseCoreTest {

//	@MockitoBean
//	private AbiRepository abiRepository;
//
//	@Test
//	void findAllAbiExceptionTest() throws Exception {
//
//		// test utilizzato per coprire l'exception del controller
//
//		final String methodName = "CanaleControllerTest.findAllCanaliExceptionTest()";
//
//		logger.info(LOG_START_JUNIT, methodName);
//
//		String expectedMessage = "Errore forzato nel test findAllCanaliExceptionTest";
//
//		when(abiRepository.findAll()).thenThrow(new InvalidDataAccessResourceUsageException(expectedMessage));
//
//		final String response = this.callGETmethodWithStatusResponseAsString("/api/v1/NDCE/abi",
//				this.internalServerError);
//
//		Assertions.assertTrue(true);// assert inside previous call
//
//		logger.info(LOG_END_JUNIT, methodName, response);
//
//	}

}
