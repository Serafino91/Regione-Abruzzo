<<<<<<<< HEAD:BE-Regione-Abruzzo/src/main/java/com/accenture/ra/request/ServicePatchRequest.java
package com.accenture.ra.request;
========
package com.accenture.ra.dto.request;
>>>>>>>> develop:BE-Regione-Abruzzo/src/main/java/com/accenture/ra/dto/request/ServicePatchRequest.java

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServicePatchRequest {
    private String id;
    private String tipologia;
    private String elemento;
    private Boolean base;
    private Boolean opz;
    private Integer vcpu;
    private Integer vramGb;
    private Integer storageGb;
    private String caratteristicheTecnicheMinime;
    private Integer quantita;
    private Integer durataMesi;
}
