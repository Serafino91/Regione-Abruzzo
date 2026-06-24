package com.accenture.ra.controller;

import com.accenture.ra.response.ServiceTypeListResponse;
import com.accenture.ra.service.impl.TypeServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value="/serviceType")
@Tag(name="serviceType", description = "Gruppo relativo alle tipologie di servizi")
public class ServiceTypeController {

	@Autowired
    TypeServiceImpl typeService;
	
    @Operation(
            summary = "Lista delle tipologie di servizi a catalogo",
            description = "Recupera l'elenco di tutte le tipologie di servizi presenti a catalogo."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Tipologie servizi recuperate correttamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ServiceTypeListResponse.class),
                            examples = @ExampleObject(
                                    name = "Esempio risposta servizio",
                                    value = """
                                            {
                                              "serviceTypeList": [
                      {
                        "nome": "IaaS standard",
                        "descrizione": "VM Small"
                      },
                      {
                        "nome": "Sistemi operativi",
                        "descrizione": "Licenze sistemi operativi"
                      }]
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Tipologie servizi non trovati",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Tipologie servizi non trovati",
                                    value = """
                                            {
                                              "error": "Tipologie servizi non trovati"
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
	public ResponseEntity<ServiceTypeListResponse> getCatalogServiceTypeList() {
		
        return ResponseEntity.ok(new ServiceTypeListResponse(typeService.getAllServiceTypes()));

	}
}
