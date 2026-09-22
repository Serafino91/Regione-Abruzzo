package com.accenture.ra.controller;

import com.accenture.ra.dto.request.ProjectDetail;
import com.accenture.ra.dto.request.ProjectPatchRequest;
import com.accenture.ra.dto.request.RequestDetail;
import com.accenture.ra.dto.response.*;
import com.accenture.ra.request.ProjectFilterCriteria;
import com.accenture.ra.service.impl.ProjectServiceImpl;
import com.accenture.ra.utils.Constants;
import com.accenture.ra.utils.JsonUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value="/projects")
@Tag(name="project", description = "Gruppo relativo alla creazione e gestione progetti")
public class ProjectsController {
    Logger logger = LoggerFactory.getLogger(CatalogServicesController.class);

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
    @PreAuthorize("hasAnyRole('DELEGATE_MASTER', 'DELEGATE_VIEWER', 'DELEGATE_CREATOR', 'ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<ProjectListResponse> getProjectList() {
        long start = System.currentTimeMillis();
        String methodName = "getProjectList";
        logger.info(Constants.LOG_START_CONTROLLER, methodName);

        ProjectListResponse projectListResponse = new ProjectListResponse(projectService.getProjectAll());

        long timeElapsed = System.currentTimeMillis() - start;
        logger.info(Constants.LOG_END_CONTROLLER,methodName, JsonUtils.toJson(projectListResponse),timeElapsed);

        return ResponseEntity.ok(projectListResponse);
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
    @PreAuthorize("hasAnyRole('DELEGATE_MASTER', 'DELEGATE_CREATOR', 'ROLE_USER', 'ROLE_ADMIN')")
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
    @PreAuthorize("hasAnyRole('DELEGATE_MASTER', 'DELEGATE_VIEWER', 'DELEGATE_CREATOR', 'ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<ProjectListResponse> getFilteredProject(@RequestBody @Valid ProjectFilterCriteria criteria) {
        long start = System.currentTimeMillis();
        String methodName = "getFilteredProject";
        logger.info(Constants.LOG_START_CONTROLLER, methodName);

        List<ProjectDetail> results = projectService.filterProjects(criteria);
        long timeElapsed = System.currentTimeMillis() - start;
        logger.info(Constants.LOG_END_CONTROLLER,methodName, JsonUtils.toJson(results),timeElapsed);
        return ResponseEntity.status(HttpStatus.OK).body(new ProjectListResponse(results));
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
    @PreAuthorize("hasAnyRole('DELEGATE_MASTER', 'DELEGATE_VIEWER', 'DELEGATE_CREATOR', 'ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<ProjectDetailResponse> getProjectDetail(
            @Parameter(
                    description = "Identificativo univoco del servizio",
                    required = true,
                    example = "b1407cd4-2faba-4c8b-ba7b-19cfdb463962"
            )
            @PathVariable("project-id") Long projectId
    ) {
        long start = System.currentTimeMillis();
        String methodName = "getProjectDetail";
        logger.info(Constants.LOG_START_CONTROLLER, methodName);

        ProjectDetail projectDetail = projectService.getProjectById(projectId);

        long timeElapsed = System.currentTimeMillis() - start;
        logger.info(Constants.LOG_END_CONTROLLER,methodName, JsonUtils.toJson(projectDetail),timeElapsed);
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
        long start = System.currentTimeMillis();
        String methodName = "patchServiceDetail";
        logger.info(Constants.LOG_START_CONTROLLER, methodName);

        ProjectDetail updatedProject = projectService.patchProject(projectId, request);

        long timeElapsed = System.currentTimeMillis() - start;
        logger.info(Constants.LOG_END_CONTROLLER,methodName, JsonUtils.toJson(updatedProject),timeElapsed);

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
    @PreAuthorize("hasAnyRole('DELEGATE_MASTER', 'DELEGATE_CREATOR', 'ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<Void> deleteProjectsDetail(
            @Parameter(
                    description = "Identificativo univoco del progetto da eliminare",
                    required = true,
                    example = "b1407cd4-2faba-4c8b-ba7b-19cfdb463962"
            )
            @PathVariable("project-id") Long projectId
    ) {
        long start = System.currentTimeMillis();
        String methodName = "deleteProjectsDetail";
        logger.info(Constants.LOG_START_CONTROLLER, methodName);

        boolean deleted = projectService.deleteProject(projectId);

        if (deleted) {
            return ResponseEntity.noContent().build();
        }

        long timeElapsed = System.currentTimeMillis() - start;
        logger.info(Constants.LOG_END_CONTROLLER,methodName, deleted ,timeElapsed);

        return ResponseEntity.notFound().build();
    }

    @Operation(
            summary = "Controlla se esiste un progetto con nome e destinationLink",
            description = "Restituisce true se esiste un progetto che ha contemporaneamente il nome e il destinationLink forniti"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Risposta con il risultato booleano"),
            @ApiResponse(responseCode = "400", description = "Parametri non validi")
    })
    @GetMapping("/{name}/{destination-link}")
    @PreAuthorize("hasAnyRole('DELEGATE_MASTER', 'DELEGATE_VIEWER', 'DELEGATE_CREATOR', 'ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<Boolean> existsProject(
    		@PathVariable("name") String name,
    		@PathVariable("destination-link") String destinationLink) {
        long start = System.currentTimeMillis();
        String methodName = "patchServiceDetail";
        logger.info(Constants.LOG_START_CONTROLLER, methodName);

        if (name == null || name.isBlank() || destinationLink == null || destinationLink.isBlank()) {
            return ResponseEntity.badRequest().body(false);
        }

        Boolean exists = projectService.existsProject(name, destinationLink);

        long timeElapsed = System.currentTimeMillis() - start;
        logger.info(Constants.LOG_END_CONTROLLER,methodName, JsonUtils.toJson(exists),timeElapsed);
        return ResponseEntity.ok(exists);
    }
}