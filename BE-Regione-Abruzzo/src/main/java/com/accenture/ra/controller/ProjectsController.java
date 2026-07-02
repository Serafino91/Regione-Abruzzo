package com.accenture.ra.controller;

import com.accenture.ra.model.*;
import com.accenture.ra.request.ProjectPatchRequest;
import com.accenture.ra.response.CatalogServiceResponse;
import com.accenture.ra.response.CatalogServicesListResponse;
import com.accenture.ra.response.ProjectDetailResponse;
import com.accenture.ra.response.ProjectListResponse;
import com.accenture.ra.response.ServiceDetailResponse;
import com.accenture.ra.service.impl.CatalogServiceImpl;
import com.accenture.ra.service.impl.ProjectServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value="/projects")
@Tag(name="project", description = "Gruppo relativo alla creazione e gestione progetti")
public class ProjectsController {

    @Autowired
    ProjectServiceImpl projectService;

    @Operation(
            summary = "Lista dei progetti già creati",
            description = "Recupera l'elenco di tutti i progetti esistenti."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Progetti recuperati correttamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProjectListResponse.class),
                            examples = @ExampleObject(
                                    name = "Esempio risposta servizio",
                                    value = """
                                         {
                                          "projectList": 
                                            [
                                                {
                                                  "id": 1,
                                                  "name": "Progetto1",
                                                  "destinationLink": "https://example.com/progetti/regione-abruzzo",
                                                  "description": "Progetto per la configurazione dei servizi infrastrutturali della Regione Abruzzo",
                                                  "createAt": "2026-06-18T10:30:00",
                                                  "updateAt": "2026-06-18T10:30:00"
                                                },
                                                {
                                                  "id": 2,
                                                  "name": "Progetto Catalogo Servizi",
                                                  "destinationLink": "https://example.com/progetti/catalogo-servizi",
                                                  "description": "Progetto per la gestione del catalogo servizi IaaS",
                                                  "createAt": "2026-06-18T11:15:00",
                                                  "updateAt": "2026-06-18T12:30:00"
                                                },
                                                {
                                                  "id": 3,
                                                  "name": "Progetto Migrazione Cloud",
                                                  "destinationLink": "https://example.com/progetti/migrazione-cloud",
                                                  "description": "Progetto dedicato alla migrazione dei servizi applicativi verso infrastruttura cloud",
                                                  "createAt": "2026-06-18T12:00:00",
                                                  "updateAt": "2026-06-18T12:01:00"
                                                }
                                              ]
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Progetti non trovati",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Progetti non trovati",
                                    value = """
                                            {
                                              "error": "Progetti non trovati"
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
    public ResponseEntity<ProjectListResponse> getProjectList() {

        return ResponseEntity.ok(new ProjectListResponse(projectService.getProjectAll()));
    }

    @Operation(
            summary = "Creazione di un nuovo progetto",
            description = ""
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Progetto creato correttamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProjectDetailResponse.class),
                            examples = @ExampleObject(
                                    name = "Esempio body create",
                                    value = """
                                           	"projectDetail":{
                                                  "id": 1,
                                                  "name": "Progetto1",
                                                  "destinationLink": "https://example.com/progetti/regione-abruzzo",
                                                  "description": "Progetto per la configurazione dei servizi infrastrutturali della Regione Abruzzo",
                                                  "createAt": "2026-06-18T10:30:00",
                                                  "updateAt": "2026-06-18T10:30:00"
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
    public ResponseEntity<CatalogServiceResponse> createProject() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(
            summary = "Progetti filtrati",
            description = "Recupera un elenco di progetti in funzione ai filtri impostati."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Progetti recuperati correttamente",
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
    public ResponseEntity<CatalogServicesListResponse> getFilteredProject() {
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @Operation(
            summary = "Dettaglio di un singolo progetto",
            description = """
                    Recupera il dettaglio completo di un progetto salvato precedentemente.
                    
                    L'identificativo del progetto deve essere passato come path parameter.
                    """
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Dettaglio progetto recuperato correttamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProjectDetailResponse.class),
                            examples = @ExampleObject(
                                    name = "Esempio risposta progetto",
                                    value = """
                                            {
                                            "projectDetail":{
                                                      "id": 1,
                                                      "name": "Progetto1",
                                                      "destinationLink": "https://example.com/progetti/regione-abruzzo",
                                                      "description": "Progetto per la configurazione dei servizi infrastrutturali della Regione Abruzzo",
                                                      "createAt": "2026-06-18T10:30:00",
                                                      "updateAt": "2026-06-18T10:30:00"
                                                    }
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "progetto non trovato",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "progetto non trovato",
                                    value = """
                                            {
                                              "error": "Progetto non trovato"
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
    @GetMapping("/{project-id}")
    public ResponseEntity<ProjectDetailResponse> getProjectDetail(
            @Parameter(
                    description = "Identificativo univoco del servizio",
                    required = true,
                    example = "b1407cd4-2faba-4c8b-ba7b-19cfdb463962"
            )
            @PathVariable("project-id") Long projectId
    ) {
        ProjectDetail projectDetail = projectService.getProjectById(projectId);

        return ResponseEntity.ok(
                new ProjectDetailResponse(projectDetail)
        );
    }

    @Operation(
            summary = "Modifica parziale di un singolo progetto",
            description = """
                    Modifica parzialmente i dati configurabili di un progetto.
                    
                    Il progetto viene identificato tramite il parametro `project-id`.
                    La PATCH aggiorna solo i campi valorizzati nel body della request.
                   
                    """
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Progetto modificato correttamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProjectDetailResponse.class),
                            examples = @ExampleObject(
                                    name = "Esempio risposta PATCH",
                                    value = """
                                            {
                                            "projectDetail":{
                                                  "id": 1,
                                                  "name": "Progetto1",
                                                  "destinationLink": "https://example.com/progetti/regione-abruzzo",
                                                  "description": "Progetto per la configurazione dei servizi infrastrutturali della Regione Abruzzo",
                                                  "createAt": "2026-06-18T10:30:00",
                                                  "updateAt": "2026-06-18T10:30:00"
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
                    description = "Progetto non trovato",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Servizio non trovato",
                                    value = """
                                            {
                                              "error": "Progetto non trovato"
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
    @PatchMapping("/{project-id}")
    public ResponseEntity<ProjectDetailResponse> patchServiceDetail(
            @Parameter(
                    description = "Identificativo univoco del servizio da modificare",
                    required = true,
                    example = "b1407cd4-2faba-4c8b-ba7b-19cfdb463962"
            )
            @PathVariable("project-id") Long projectId,

            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    description = "Dati parziali del progetto da modificare",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProjectPatchRequest.class),
                            examples = @ExampleObject(
                                    name = "Esempio request PATCH",
                                    value = """
                                            {
                                            "projectDetail":{
                                                      "description": "Progetto per la configurazione dei servizi infrastrutturali della Regione Abruzzo2"
                                                    }
                                            }
                                            """
                            )
                    )
            )
            @RequestBody ProjectPatchRequest request
    ) {
        ProjectDetail updatedProject = projectService.patchProject(projectId, request);

        return ResponseEntity.ok(
                new ProjectDetailResponse(updatedProject)
        );
    }


    @Operation(
            summary = "Eliminazione di un singolo progetto",
            description = """
                    Elimina un progetto tramite il suo identificativo.
                    
                    Se il progetto esiste, viene eliminato e viene restituito HTTP 204.
                    Se il progetto non esiste, viene restituito HTTP 404.
                    """
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204",
                    description = "progetto eliminato correttamente",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "progetto non trovato",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Errore interno del server",
                    content = @Content
            )
    })
    @DeleteMapping("/{project-id}")
    public ResponseEntity<Void> deleteServiceDetail(
            @Parameter(
                    description = "Identificativo univoco del progetto da eliminare",
                    required = true,
                    example = "b1407cd4-2faba-4c8b-ba7b-19cfdb463962"
            )
            @PathVariable("project-id") Long projectId
    ) {
        boolean deleted = projectService.deleteProject(projectId);

        if (deleted) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}