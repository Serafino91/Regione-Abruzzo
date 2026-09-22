package com.accenture.ra;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import org.junit.jupiter.api.BeforeEach;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@ActiveProfiles("unittest")
@ContextConfiguration(classes = { TestConfig.class })
public abstract class BaseCoreTest {

	protected static final Logger logger = LoggerUtils.getLogger(BaseCoreTest.class);

	@Autowired
	private WebApplicationContext wac;

	@Autowired
	protected ObjectMapper objectMapper;

	protected MockMvc mockMvc;

	@BeforeEach
	void setUp() {
		mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}

	protected final ResultMatcher success = status().isOk();
	protected final ResultMatcher unauthorized = status().isUnauthorized();
	protected final ResultMatcher forbidden = status().isForbidden();
	protected final ResultMatcher badRequest = status().isBadRequest();
	protected final ResultMatcher notFound = status().isNotFound();
	protected final ResultMatcher internalServerError = status().isInternalServerError();
	protected final ResultMatcher created = status().isCreated();
	protected final ResultMatcher noContent = status().isNoContent();
	protected final ResultMatcher conflict = status().isConflict();
	protected final ResultMatcher notAllowed = status().isMethodNotAllowed();

	protected final static String LOG_START_JUNIT = "STARTING {}";
	protected final static String LOG_END_JUNIT = "{} eseguito con successo: {}";

	protected String callPOSTmethodWithStatusResponseAsString(final String servicePath, final MediaType contentType,
	                                                          HttpHeaders headers, final String content, final ResultMatcher status) throws Exception {
		return this.mockMvc.perform(post(servicePath).accept(MediaType.APPLICATION_JSON).contentType(contentType)
				.content(content).headers(headers)).andExpect(status).andReturn().getResponse().getContentAsString();
	}

	protected String callPUTmethodWithStatusResponseAsString(final String servicePath, final MediaType contentType,
	                                                         HttpHeaders headers, final String content, final ResultMatcher status) throws Exception {
		return this.mockMvc.perform(put(servicePath).accept(MediaType.APPLICATION_JSON).contentType(contentType)
				.content(content).headers(headers)).andExpect(status).andReturn().getResponse().getContentAsString();
	}

	protected String callPOST_MULTIPARTmethodWithStatusResponseAsString(final String servicePath,
	                                                                    final MediaType contentType, HttpHeaders headers, final MockMultipartFile file, String content,
	                                                                    final ResultMatcher status) throws Exception {
		return this.mockMvc
				.perform(multipart(servicePath).file(file).accept(MediaType.APPLICATION_JSON).content(content)
						.contentType(contentType).headers(headers))
				.andExpect(status).andReturn().getResponse().getContentAsString();
	}

	protected String callGETmethodWithStatusResponseAsString(final String servicePath, final MediaType contentType,
	                                                         HttpHeaders headers, final String content, final MediaType accept, final ResultMatcher status)
			throws Exception {
		return this.mockMvc
				.perform(get(servicePath).accept(accept).contentType(contentType).content(content).headers(headers))
				.andExpect(status).andReturn().getResponse().getContentAsString();
	}

	protected String callGETmethodWithStatusResponseAsString(final String servicePath, final ResultMatcher status)
			throws Exception {
		return this.mockMvc
				.perform(get(servicePath).accept(MediaType.APPLICATION_JSON, MediaType.APPLICATION_OCTET_STREAM))
				.andExpect(status).andReturn().getResponse().getContentAsString();
	}

	protected String callPATCHmethodWithStatusResponseAsString(final String servicePath, final MediaType contentType,
	                                                          HttpHeaders headers, final String content, final ResultMatcher status) throws Exception {
		return this.mockMvc.perform(patch(servicePath).accept(MediaType.APPLICATION_JSON).contentType(contentType)
				.content(content).headers(headers)).andExpect(status).andReturn().getResponse().getContentAsString();
	}

	protected String callDELETEmethodWithStatusResponseAsString(final String servicePath, final MediaType contentType,
	                                                            HttpHeaders headers, final String content, final ResultMatcher status) throws Exception {
		return this.mockMvc
				.perform(delete(servicePath).accept(MediaType.APPLICATION_JSON).contentType(contentType)
						.content(content).headers(headers))
				.andExpect(status).andReturn().getResponse().getContentAsString();
	}

	protected String callDELETEmethodWithStatusResponseAsString(final String servicePath, final MediaType contentType,
	                                                            final ResultMatcher status) throws Exception {
		return this.mockMvc.perform(delete(servicePath).accept(MediaType.APPLICATION_JSON).contentType(contentType))
				.andExpect(status).andReturn().getResponse().getContentAsString();
	}

	protected String readStringFromFile(final String filePath) throws IOException {
		final ClassLoader classLoader = this.getClass().getClassLoader();
		final InputStream inputStream = classLoader.getResourceAsStream(filePath);
		return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
	}

}
