package com.accenture.ra.dto.response;

import lombok.Data;

@Data
public class RuoloInfo {

    private Integer cod;
    private String desc;
    private String label;
    private Boolean isChecked;

}