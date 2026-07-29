package com.accenture.ra.controller;

import com.accenture.ra.dto.response.ServiceTypeListResponse;
import com.accenture.ra.dto.response.TicketModel;
import com.accenture.ra.service.impl.IncidentServiceImp;
import com.accenture.ra.service.impl.TypeServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/incident")
@Tag(name="incident", description = "Gruppo relativo agli incident")
public class IncidentController {

    @Autowired
    IncidentServiceImp incidentServiceImp;
	
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
                            schema = @Schema(implementation = ServiceTypeListResponse.class),
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
	@GetMapping
	public ResponseEntity<List<TicketModel>> getCatalogServiceTypeList() {
		
        return ResponseEntity.ok(incidentServiceImp.getAllIncident());

	}
}
