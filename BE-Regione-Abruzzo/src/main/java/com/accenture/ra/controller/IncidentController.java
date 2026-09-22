package com.accenture.ra.controller;

import java.util.List;

import com.accenture.ra.utils.Constants;
import com.accenture.ra.utils.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accenture.ra.dto.response.TicketModel;
import com.accenture.ra.service.impl.IncidentServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value="/incident")
@Tag(name="incident", description = "Gruppo relativo agli incident")
public class IncidentController {

    Logger logger = LoggerFactory.getLogger(CatalogServicesController.class);

    @Autowired
    IncidentServiceImpl incidentServiceImpl;
	
    @Operation(
            summary = "Storico degli incident",
            description = "Recupera l'elenco di tutti gli incident"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "incident recuperati correttamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = TicketModel.class),
                            examples = @ExampleObject(
                                    name = "Esempio risposta servizio",
                                    value = """
                                            {
                                              "incidentList": [
                                                               {
                                                                "id": 1,
                                                                "code": "T1781595972077168",
                                                                "state": {
                                                                  "id": 1,
                                                                  "name": "Aperto"
                                                                },
                                                                "category": "Lorem ipsum dolor sit amet",
                                                                "subcategory": "Lorem ipsum dolor sit amet",
                                                                "openingDate": "2026-01-22",
                                                                "applicant": "Lorem ipsum"
                                                              },
                                                              {
                                                                "id": 2,
                                                                "code": "T1781595972077167",
                                                                "state": {
                                                                  "id": 1,
                                                                  "name": "Aperto"
                                                                },
                                                                "category": "Lorem ipsum dolor sit amet",
                                                                "subcategory": "Lorem ipsum dolor sit amet",
                                                                "openingDate": "2026-01-22",
                                                                "applicant": "Lorem ipsum"
                                                              }]
                                                }"""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Incident non trovati",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Incident non trovati",
                                    value = """
                                            {
                                              "error": "Incident non trovati"
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
	@GetMapping("/list")
	public ResponseEntity<List<TicketModel>> getIncidentList() {
        long start = System.currentTimeMillis();
        String methodName = "getIncidentList";
        logger.info(Constants.LOG_START_CONTROLLER, methodName);


        List<TicketModel> allIncident = incidentServiceImpl.getAllIncident();

        long timeElapsed = System.currentTimeMillis() - start;
        logger.info(Constants.LOG_END_CONTROLLER,methodName, JsonUtils.toJson(allIncident),timeElapsed);

        return ResponseEntity.ok(allIncident);
	}
	
    @Operation(
            summary = "Dettaglio di un incident",
            description = "Recupera il dettaglio di un singolo incident"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Incident recuperato correttamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = TicketModel.class),
                            examples = @ExampleObject(
                                    name = "Esempio risposta servizio",
                                    value = """
                                            {
                                              "incidentList": [
                                                               {
                                                                "id": 1,
                                                                "code": "T1781595972077168",
                                                                "state": {
                                                                  "id": 1,
                                                                  "name": "Aperto"
                                                                },
                                                                "category": "Lorem ipsum dolor sit amet",
                                                                "subcategory": "Lorem ipsum dolor sit amet",
                                                                "openingDate": "2026-01-22",
                                                                "applicant": "Lorem ipsum"
                                                              },
                                                              {
                                                                "id": 2,
                                                                "code": "T1781595972077167",
                                                                "state": {
                                                                  "id": 1,
                                                                  "name": "Aperto"
                                                                },
                                                                "category": "Lorem ipsum dolor sit amet",
                                                                "subcategory": "Lorem ipsum dolor sit amet",
                                                                "openingDate": "2026-01-22",
                                                                "applicant": "Lorem ipsum"
                                                              }]
                                                }"""
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Incident non trovati",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Incident non trovati",
                                    value = """
                                            {
                                              "error": "Incident non trovati"
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
	@GetMapping("/{code}")
	public ResponseEntity<TicketModel> getCatalogServiceTypeList(        
			@Parameter(
	            description = "Codice univoco del ticket",
	            required = true,
	            example = "T1781595972077167")
			@PathVariable("code") String code) {
        long start = System.currentTimeMillis();
        String methodName = "getCatalogServiceTypeList";
        logger.info(Constants.LOG_START_CONTROLLER, methodName,code);

        TicketModel incidentDetail = incidentServiceImpl.getIncidentDetail(code);
        long timeElapsed = System.currentTimeMillis() - start;
        logger.info(Constants.LOG_END_CONTROLLER,methodName, JsonUtils.toJson(incidentDetail),timeElapsed);

        return ResponseEntity.ok(incidentDetail);

	}
}
