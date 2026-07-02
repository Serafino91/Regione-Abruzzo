package com.accenture.ra.controller;

import com.accenture.ra.model.RequestDetail;
import com.accenture.ra.request.RequestCreationRequest;
import com.accenture.ra.response.RequestDetailResponse;
import com.accenture.ra.response.RequestListResponse;
import com.accenture.ra.service.impl.RequestServiceImpl;

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

@RestController
@RequestMapping(value="/request")
@Tag(name="request", description = "Gruppo relativo alla creazione e gestione richieste")
public class RequestController {
	
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
                                              "requestsList": [
                      {
                        "": "",
                        "": "",
                        "": ,
                        "": ,
                        "": ,
                        "": ,
                        "": ,
                        "": "",
                        "": ,
                        "": 
                      }},
                      {
                        "": "",
                        "": "",
                        "": ,
                        "": ,
                        "": ,
                        "": ,
                        "": ,
                        "": "",
                        "": ,
                        "": 
                      }]
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

        return ResponseEntity.ok(new RequestListResponse(requestService.getAllRequests()));
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
							                        "": "",
							                        "": "",
							                        "": ,
							                        "": ,
							                        "": ,
							                        "": ,
							                        "": ,
							                        "": "",
							                        "": ,
							                        "": 
							                      }
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
		
		RequestDetailResponse result = requestService.createRequest(req);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
	
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
							              "": "",
							              "": "",
							              "": ,
							              "": ,
							              "": ,
							              "": ,
							              "": ,
							              "": "",
							              "": ,
							              "": 
							            }},
							            {
							              "": "",
							              "": "",
							              "": ,
							              "": ,
							              "": ,
							              "": ,
							              "": ,
							              "": "",
							              "": ,
							              "": 
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
    public ResponseEntity<RequestListResponse> getFilteredRequests() {
        return new ResponseEntity<>(HttpStatus.OK);
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
                                                "": "",
                                                "": "",
                                                "": "",
                                                "": "",
                                                "": "",
                                                "": "",
                                                "": "",
                                                "": ""
                                              }
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
            @PathVariable("request-id") String requestId
    ) {
        RequestDetail requestDetail = requestService.getRequestById(requestId);

        return ResponseEntity.ok(
                new RequestDetailResponse(requestDetail)
        );
    }
}
