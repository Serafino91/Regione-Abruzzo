package com.accenture.ra.controller;

import com.accenture.ra.response.CatalogServiceResponse;
import com.accenture.ra.model.ServiceDetail;
import com.accenture.ra.model.ServiceDetailResponse;
import com.accenture.ra.model.ServicePatchRequest;
import com.accenture.ra.response.CatalogServicesListResponse;
import com.accenture.ra.service.impl.CatalogServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value="/catalog/services")
@Tag(name="Catalog", description = "Gruppo relativo agli elementi a catalogo")
public class CatalogServicesController {

    @Autowired
    CatalogServiceImpl catalogService;

    @Operation(
            summary = "Lista dei servizi a catalogo",
            description = "Recupera l'elenco di tutti i servizi presenti a catalogo."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Servizi recuperati correttamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ServiceDetailResponse.class),
                            examples = @ExampleObject(
                                    name = "Esempio risposta servizio",
                                    value = """
                                            {
                                              "servicesList": [
                      {
                        "tipologia": "IaaS standard",
                        "elemento": "VM Small",
                        "base": true,
                        "opz": false,
                        "vcpu": 1,
                        "vramGb": 4,
                        "storageGb": 100,
                        "caratteristicheTecnicheMinime": "Include servizio di Backup delle VM, la protezione antivirus e il servizio di monitoraggio",
                        "quantita": null,
                        "durataMesi": null
                      },
                      {
                        "tipologia": "IaaS standard",
                        "elemento": "VM Medium",
                        "base": true,
                        "opz": false,
                        "vcpu": 4,
                        "vramGb": 8,
                        "storageGb": 200,
                        "caratteristicheTecnicheMinime": "Include servizio di Backup delle VM, la protezione antivirus e il servizio di monitoraggio",
                        "quantita": null,
                        "durataMesi": null
                      }]
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Servizi non trovati",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Servizi non trovati",
                                    value = """
                                            {
                                              "error": "Servizi non trovati"
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
    public ResponseEntity<CatalogServicesListResponse> getCatalogServicesList() {

        return ResponseEntity.ok(new CatalogServicesListResponse(catalogService.getServiceAll()));
    }

    @Operation(
            summary = "Creazione di un servizio", // Creeremo uno solo o più di uno alla volta?
            description = ""
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Servizio creato correttamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ServiceDetailResponse.class),
                            examples = @ExampleObject(
                                    name = "Esempio body create",
                                    value = """
                                            {
                                            	"serviceDetail": {
							                      "tipologia": "IaaS standard",
							                      "elemento": "VM Small",
							                      "base": true,
							                      "opz": false,
							                      "vcpu": 1,
							                      "vramGb": 4,
							                      "storageGb": 100,
							                      "caratteristicheTecnicheMinime": "NUOVE CARATTERISTICHE",
							                      "quantita": 1,
							                      "durataMesi": 3
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
    @PostMapping
    public ResponseEntity<CatalogServiceResponse> createCatalogService() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(
            summary = "Servizi filtrati",
            description = "Recupera un elenco di servizi in funzione ai filtri impostati."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Servizio recuperato correttamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ServiceDetailResponse.class),
                            examples = @ExampleObject(
                                    name = "Esempio risposta servizio",
                                    value = """
                                            {
                                              "serviceDetail": {
                                                "id": "b1407cd4-2faba-4c8b-ba7b-19cfdb463962",
                                                "tipologia": "IaaS standard",
                                                "elemento": "VM Small",
                                                "base": true,
                                                "opz": false,
                                                "vcpu": 1,
                                                "vramGb": 4,
                                                "storageGb": 100,
                                                "caratteristicheTecnicheMinime": "Include servizio di Backup delle VM, la protezione antivirus e il servizio di monitoraggio",
                                                "quantita": null,
                                                "durataMesi": null
                                              }
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Servizio non trovato",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Servizio non trovato",
                                    value = """
                                            {
                                              "error": "Servizio non trovato"
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
    public ResponseEntity<CatalogServicesListResponse> getFilteredServices() {
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @Operation(
            summary = "Dettaglio di un singolo servizio",
            description = """
                    Recupera il dettaglio completo di un servizio presente nel catalogo.
                    
                    L'identificativo del servizio deve essere passato come path parameter.
                    """
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Dettaglio servizio recuperato correttamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ServiceDetailResponse.class),
                            examples = @ExampleObject(
                                    name = "Esempio risposta servizio",
                                    value = """
                                            {
                                              "serviceDetail": {
                                                "id": "b1407cd4-2faba-4c8b-ba7b-19cfdb463962",
                                                "tipologia": "IaaS standard",
                                                "elemento": "VM Small",
                                                "base": true,
                                                "opz": false,
                                                "vcpu": 1,
                                                "vramGb": 4,
                                                "storageGb": 100,
                                                "caratteristicheTecnicheMinime": "Include servizio di Backup delle VM, la protezione antivirus e il servizio di monitoraggio",
                                                "quantita": null,
                                                "durataMesi": null
                                              }
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Servizio non trovato",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Servizio non trovato",
                                    value = """
                                            {
                                              "error": "Servizio non trovato"
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
    @GetMapping("/{service-id}")
    public ResponseEntity<ServiceDetailResponse> getServiceDetail(
            @Parameter(
                    description = "Identificativo univoco del servizio",
                    required = true,
                    example = "b1407cd4-2faba-4c8b-ba7b-19cfdb463962"
            )
            @PathVariable("service-id") String serviceId
    ) {
        ServiceDetail serviceDetail = catalogService.getServiceById(serviceId);

        return ResponseEntity.ok(
                new ServiceDetailResponse(serviceDetail)
        );
    }

    @Operation(
            summary = "Modifica parziale di un singolo servizio",
            description = """
                    Modifica parzialmente i dati configurabili di un servizio.
                    
                    Il servizio viene identificato tramite il parametro `service-id`.
                    La PATCH aggiorna solo i campi valorizzati nel body della request.
                    
                    Campi modificabili:
                    - caratteristicheTecnicheMinime
                    - quantita
                    - durataMesi
                    """
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Servizio modificato correttamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ServiceDetailResponse.class),
                            examples = @ExampleObject(
                                    name = "Esempio risposta PATCH",
                                    value = """
                                            {
                                              "serviceDetail": {
                                                "id": "b1407cd4-2faba-4c8b-ba7b-19cfdb463962",
                                                "tipologia": "IaaS standard",
                                                "elemento": "VM Small",
                                                "base": true,
                                                "opz": false,
                                                "vcpu": 1,
                                                "vramGb": 4,
                                                "storageGb": 100,
                                                "caratteristicheTecnicheMinime": "NUOVE CARATTERISTICHE",
                                                "quantita": 1,
                                                "durataMesi": 3
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
                    responseCode = "404",
                    description = "Servizio non trovato",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Servizio non trovato",
                                    value = """
                                            {
                                              "error": "Servizio non trovato"
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
    @PatchMapping("/{service-id}")
    public ResponseEntity<ServiceDetailResponse> patchServiceDetail(
            @Parameter(
                    description = "Identificativo univoco del servizio da modificare",
                    required = true,
                    example = "b1407cd4-2faba-4c8b-ba7b-19cfdb463962"
            )
            @PathVariable("service-id") String serviceId,

            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    description = "Dati parziali del servizio da modificare",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ServicePatchRequest.class),
                            examples = @ExampleObject(
                                    name = "Esempio request PATCH",
                                    value = """
                                            {
                                              "serviceDetail": {
                                                "caratteristicheTecnicheMinime": "NUOVE CARATTERISTICHE",
                                                "quantita": 1,
                                                "durataMesi": 3
                                              }
                                            }
                                            """
                            )
                    )
            )
            @RequestBody ServicePatchRequest request
    ) {
        ServiceDetail updatedService = catalogService.patchService(serviceId, request);

        return ResponseEntity.ok(
                new ServiceDetailResponse(updatedService)
        );
    }


    @Operation(
            summary = "Eliminazione di un singolo servizio",
            description = """
                    Elimina un servizio dal catalogo tramite il suo identificativo.
                    
                    Se il servizio esiste, viene eliminato e viene restituito HTTP 204.
                    Se il servizio non esiste, viene restituito HTTP 404.
                    """
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204",
                    description = "Servizio eliminato correttamente",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Servizio non trovato",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Errore interno del server",
                    content = @Content
            )
    })
    @DeleteMapping("/{service-id}")
    public ResponseEntity<Void> deleteServiceDetail(
            @Parameter(
                    description = "Identificativo univoco del servizio da eliminare",
                    required = true,
                    example = "b1407cd4-2faba-4c8b-ba7b-19cfdb463962"
            )
            @PathVariable("service-id") String serviceId
    ) {
        boolean deleted = catalogService.deleteService(serviceId);

        if (deleted) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    @Operation(
            summary = "Lista di servizi associati ad una categoria",
            description = """
                    Dato un id-categoria recupera la lista dei servizi associati a quella categoria.
                    
                    L'identificativo della categoria deve essere passato come path parameter.
                    """
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Elenco dei servizi associati alla categoria",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ServiceDetailResponse.class),
                            examples = @ExampleObject(
                                    name = "Esempio risposta servizio",
                                    value = """
                                            {
                                              "serviceDetail": {
                                                "id": "b1407cd4-2faba-4c8b-ba7b-19cfdb463962",
                                                "tipologia": "IaaS standard",
                                                "elemento": "VM Small",
                                                "base": true,
                                                "opz": false,
                                                "vcpu": 1,
                                                "vramGb": 4,
                                                "storageGb": 100,
                                                "caratteristicheTecnicheMinime": "Include servizio di Backup delle VM, la protezione antivirus e il servizio di monitoraggio",
                                                "quantita": null,
                                                "durataMesi": null
                                              }
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Servizi non trovato",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Nessun servizio associato alla categoria",
                                    value = """
                                            {
                                              "error": "Servizio non trovato"
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
    @GetMapping("getServices/{category-id}")
    public ResponseEntity<CatalogServicesListResponse>getServiceDetail(
            @Parameter(
                    description = "Identificativo univoco del servizio",
                    required = true,
                    example = "1"
            )
            @PathVariable("category-id") Long categoryId
    ) {
        List<ServiceDetail> serviceDetail = catalogService.getServiceByCategoryId(categoryId);

        return ResponseEntity.ok(new CatalogServicesListResponse(serviceDetail));
    }

}