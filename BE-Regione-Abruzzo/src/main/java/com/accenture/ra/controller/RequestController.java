package com.accenture.ra.controller;

import com.accenture.ra.dto.request.RequestDetail;
import com.accenture.ra.dto.response.RequestDetailResponse;
import com.accenture.ra.dto.response.RequestListResponse;
import com.accenture.ra.request.RequestCreationRequest;
import com.accenture.ra.request.RequestFilterCriteria;
import com.accenture.ra.service.impl.RequestServiceImpl;

import com.accenture.ra.utils.Constants;
import com.accenture.ra.utils.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping(value="/request")
@Tag(name="request", description = "Gruppo relativo alla creazione e gestione richieste")
public class RequestController {
	Logger logger = LoggerFactory.getLogger(CatalogServicesController.class);

	@Autowired
	RequestServiceImpl requestService;

	@Operation(
			summary = "Lista delle richieste a catalogo",
			description = "Recupera l'elenco di tutte le richieste presenti a catalogo."
			)
	@ApiResponses(value = {
			@ApiResponse(
					responseCode = "200",
					description = "Richieste recuperate correttamente",
					content = @Content(
							mediaType = "application/json",
							schema = @Schema(implementation = RequestListResponse.class),
							examples = @ExampleObject(
									name = "Esempio risposta richieste",
									value = """
											                                        {
											                                          "requestsList": [{
											  "requestId": "req_1234005670089",
											  "project": {
											    "id": 1,
											    "name": "Progetto1",
											    "destinationLink": "link1.com",
											    "description": "progetti di vari1 ",
											    "createAt": "2026-06-17T11:06:18",
											    "updateAt": "2026-06-17T11:06:18"
											  },
											  "state": {
											    "id": 1,
											    "stateName": "In elaborazione"
											  },
											  "services": [
											    {
											      "id": 1,
											      "name": null,
											      "type": "IaaS standard",
											      "item": "VM Small",
											      "base": true,
											      "optional": false,
											      "quantity": null,
											      "durationMonths": null,
											      "params": [
											        {
											          "id": "1",
											          "name": "vcpu",
											          "paramType": "integer",
											          "minValue": "1",
											          "maxValue": "1",
											          "serviceId": null,
											          "required": true
											        }
											      ],
											      "paramsList": []
											    }

											  ],
											  "category": {
											    "id": 1,
											    "name": "IaaS standard",
											    "description": "Servizi IaaS standard"
											  },
											  "sendFrom": "2026-06-17T11:16:31",
											  "sendTo": "2026-06-17T11:16:31",
											  "createdAt": "2026-06-17T11:16:31",
											  "updatedAt": "2026-06-17T11:16:31"
											},
											{
											  "requestId": "req_4321005670089",
											  "project": {
											    "id": 1,
											    "name": "Progetto2",
											    "destinationLink": "link2.com",
											    "description": "progetti di vari2 ",
											    "createAt": "2026-06-17T11:06:18",
											    "updateAt": "2026-06-17T11:06:18"
											  },
											  "state": {
											    "id": 1,
											    "stateName": "In elaborazione"
											  },
											  "services": [
											    {
											      "id": 1,
											      "name": null,
											      "type": "IaaS standard",
											      "item": "VM Small",
											      "base": true,
											      "optional": false,
											      "quantity": null,
											      "durationMonths": null,
											      "params": [
											        {
											          "id": "1",
											          "name": "vcpu",
											          "paramType": "integer",
											          "minValue": "1",
											          "maxValue": "1",
											          "serviceId": null,
											          "required": true
											        }
											      ],
											      "paramsList": []
											    }

											  ],
											  "category": {
											    "id": 1,
											    "name": "IaaS standard",
											    "description": "Servizi IaaS standard"
											  },
											  "sendFrom": "2026-06-17T11:16:31",
											  "sendTo": "2026-06-17T11:16:31",
											  "createdAt": "2026-06-17T11:16:31",
											  "updatedAt": "2026-06-17T11:16:31"
											}
											]
											                                        }
											                                        """
									)
							)
					),
			@ApiResponse(
					responseCode = "404",
					description = "Richieste non trovate",
					content = @Content(
							mediaType = "application/json",
							examples = @ExampleObject(
									name = "Richieste non trovate",
									value = """
											{
											  "error": "Richieste non trovate"
											}
											"""
									)
							)
					),
			@ApiResponse(
					responseCode = "500",
					description = "Errore interno del server",
					content = @Content
					)
	})
	@GetMapping
	public ResponseEntity<RequestListResponse> getCatalogRequestsList() {

		long start = System.currentTimeMillis();
		String methodName = "getCatalogRequestsList";
		logger.info(Constants.LOG_START_CONTROLLER, methodName);

		RequestListResponse requestListResponse = new RequestListResponse(requestService.getAllRequests());

		long timeElapsed = System.currentTimeMillis() - start;
		logger.info(Constants.LOG_END_CONTROLLER,methodName, JsonUtils.toJson(requestListResponse),timeElapsed);

		return ResponseEntity.ok(requestListResponse);
	}

	@Operation(
			summary = "Creazione di una richiesta",
			description = ""
			)
	@ApiResponses(value = {
			@ApiResponse(
					responseCode = "200",
					description = "Richiesta creata correttamente",
					content = @Content(
							mediaType = "application/json",
							schema = @Schema(implementation = RequestDetailResponse.class),
							examples = @ExampleObject(
									name = "Esempio body create",
									value = """
											               {
											               	"requestDetail": {
											  "requestId": "req_1234005670089",
											  "project": {
											    "id": 1,
											    "name": "Progetto1",
											    "destinationLink": "link1.com",
											    "description": "progetti di vari1 ",
											    "createAt": "2026-06-17T11:06:18",
											    "updateAt": "2026-06-17T11:06:18"
											  },
											  "state": {
											    "id": 1,
											    "stateName": "In elaborazione"
											  },
											  "services": [
											    {
											      "id": 1,
											      "name": null,
											      "type": "IaaS standard",
											      "item": "VM Small",
											      "base": true,
											      "optional": false,
											      "quantity": null,
											      "durationMonths": null,
											      "params": [
											        {
											          "id": "1",
											          "name": "vcpu",
											          "paramType": "integer",
											          "minValue": "1",
											          "maxValue": "1",
											          "serviceId": null,
											          "required": true
											        }
											      ],
											      "paramsList": []
											    }

											  ],
											  "category": {
											    "id": 1,
											    "name": "IaaS standard",
											    "description": "Servizi IaaS standard"
											  },
											  "sendFrom": "2026-06-17T11:16:31",
											  "sendTo": "2026-06-17T11:16:31",
											  "createdAt": "2026-06-17T11:16:31",
											  "updatedAt": "2026-06-17T11:16:31"
											}
											               """
									)
							)
					),
			@ApiResponse(
					responseCode = "400",
					description = "Request non valida",
					content = @Content(
							mediaType = "application/json",
							examples = @ExampleObject(
									name = "Request non valida",
									value = """
											{
											  "error": "Payload non valido"
											}
											"""
									)
							)
					),
			@ApiResponse(
					responseCode = "500",
					description = "Errore interno del server",
					content = @Content
					)
	})
	@PutMapping
	public ResponseEntity<RequestDetailResponse> createRequest(@RequestBody @Valid RequestCreationRequest req) {

		long start = System.currentTimeMillis();
		String methodName = "createRequest";
		logger.info(Constants.LOG_START_CONTROLLER, methodName);

		RequestDetailResponse result = requestService.createRequest(req);

		long timeElapsed = System.currentTimeMillis() - start;
		logger.info(Constants.LOG_END_CONTROLLER,methodName, JsonUtils.toJson(result),timeElapsed);

		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}

	//START
	@Operation(
			summary = "Richieste filtrate",
			description = "Recupera un elenco di richieste in funzione ai filtri impostati."
			)
	@ApiResponses(value = {
			@ApiResponse(
					responseCode = "200",
					description = "Richiesta recuperata correttamente",
					content = @Content(
							mediaType = "application/json",
							schema = @Schema(implementation = RequestListResponse.class),
							examples = @ExampleObject(
									name = "Esempio risposta servizio",
									value = """
											                 {
											                 "requestsList": [
											{
											  "requestId": "req_1234005670089",
											  "project": {
											    "id": 1,
											    "name": "Progetto1",
											    "destinationLink": "link1.com",
											    "description": "progetti di vari1 ",
											    "createAt": "2026-06-17T11:06:18",
											    "updateAt": "2026-06-17T11:06:18"
											  },
											  "state": {
											    "id": 1,
											    "stateName": "In elaborazione"
											  },
											  "services": [
											    {
											      "id": 1,
											      "name": null,
											      "type": "IaaS standard",
											      "item": "VM Small",
											      "base": true,
											      "optional": false,
											      "quantity": null,
											      "durationMonths": null,
											      "params": [
											        {
											          "id": "1",
											          "name": "vcpu",
											          "paramType": "integer",
											          "minValue": "1",
											          "maxValue": "1",
											          "serviceId": null,
											          "required": true
											        }
											      ],
											      "paramsList": []
											    }

											  ],
											  "category": {
											    "id": 1,
											    "name": "IaaS standard",
											    "description": "Servizi IaaS standard"
											  },
											  "sendFrom": "2026-06-17T11:16:31",
											  "sendTo": "2026-06-17T11:16:31",
											  "createdAt": "2026-06-17T11:16:31",
											  "updatedAt": "2026-06-17T11:16:31"
											}]
											               }
											               """
									)
							)
					),
			@ApiResponse(
					responseCode = "404",
					description = "Richiesta non trovata",
					content = @Content(
							mediaType = "application/json",
							examples = @ExampleObject(
									name = "Richiesta non trovata",
									value = """
											{
											  "error": "Richiesta non trovata"
											}
											"""
									)
							)
					),
			@ApiResponse(
					responseCode = "500",
					description = "Errore interno del server",
					content = @Content
					)
	})
	@PostMapping(value = "/filter")
	public ResponseEntity<RequestListResponse> getFilteredRequests(@RequestBody RequestFilterCriteria criteria) {
		
		long start = System.currentTimeMillis();
		String methodName = "getFilteredRequests";
		logger.info(Constants.LOG_START_CONTROLLER, methodName);

		List<RequestDetail> results = requestService.filterRequest(criteria);

		long timeElapsed = System.currentTimeMillis() - start;
		logger.info(Constants.LOG_END_CONTROLLER,methodName, JsonUtils.toJson(results),timeElapsed);

		return ResponseEntity.status(HttpStatus.OK).body(new RequestListResponse(results));
	}


	@Operation(
			summary = "Dettaglio di una singola richiesta",
			description = """
					Recupera il dettaglio completo di una richiesta presente nel catalogo.

					L'identificativo della richiesta deve essere passato come path parameter.
					"""
			)
	@ApiResponses(value = {
			@ApiResponse(
					responseCode = "200",
					description = "Dettaglio richiesta recuperato correttamente",
					content = @Content(
							mediaType = "application/json",
							schema = @Schema(implementation = RequestDetailResponse.class),
							examples = @ExampleObject(
									name = "Esempio risposta richiesta",
									value = """
											{
											  "requestDetail": {
											  "requestId": "req_1234005670089",
											  "project": {
											    "id": 1,
											    "name": "Progetto1",
											    "destinationLink": "link1.com",
											    "description": "progetti di vari1 ",
											    "createAt": "2026-06-17T11:06:18",
											    "updateAt": "2026-06-17T11:06:18"
											  },
											  "state": {
											    "id": 1,
											    "stateName": "In elaborazione"
											  },
											  "services": [
											    {
											      "id": 1,
											      "name": null,
											      "type": "IaaS standard",
											      "item": "VM Small",
											      "base": true,
											      "optional": false,
											      "quantity": null,
											      "durationMonths": null,
											      "params": [
											        {
											          "id": "1",
											          "name": "vcpu",
											          "paramType": "integer",
											          "minValue": "1",
											          "maxValue": "1",
											          "serviceId": null,
											          "required": true
											        }
											      ],
											      "paramsList": []
											    }

											  ],
											  "category": {
											    "id": 1,
											    "name": "IaaS standard",
											    "description": "Servizi IaaS standard"
											  },
											  "sendFrom": "2026-06-17T11:16:31",
											  "sendTo": "2026-06-17T11:16:31",
											  "createdAt": "2026-06-17T11:16:31",
											  "updatedAt": "2026-06-17T11:16:31"
											}
											"""
									)
							)
					),
			@ApiResponse(
					responseCode = "404",
					description = "Richiesta non trovata",
					content = @Content(
							mediaType = "application/json",
							examples = @ExampleObject(
									name = "Richiesta non trovata",
									value = """
											{
											  "error": "Richiesta non trovata"
											}
											"""
									)
							)
					),
			@ApiResponse(
					responseCode = "500",
					description = "Errore interno del server",
					content = @Content
					)
	})
	@GetMapping("/{request-id}")
	public ResponseEntity<RequestDetailResponse> getRequestDetail(
			@Parameter(
					description = "Identificativo univoco della richiesta",
					required = true,
					example = "req_1234876523"
					)
			@PathVariable("request-id") String requestId) {

		long start = System.currentTimeMillis();
		String methodName = "getRequestDetail";
		logger.info(Constants.LOG_START_CONTROLLER, methodName);

		RequestDetail requestDetail = requestService.getRequestById(requestId);

		long timeElapsed = System.currentTimeMillis() - start;
		logger.info(Constants.LOG_END_CONTROLLER,methodName, JsonUtils.toJson(requestDetail),timeElapsed);

		return ResponseEntity.ok(new RequestDetailResponse(requestDetail));
	}
}
