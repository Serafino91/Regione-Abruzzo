package com.accenture.ra.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RAAuthResponseDto {

   private String aud;
   private String iss;
   private BigDecimal iat;
   private BigDecimal nbf;
   private BigDecimal exp;
   private String givenName;
   private String spidCode;
   private String fiscalNumber;
   private String idCard;
   private String mobilePhone;
   private String email;
   private String address;
   private String familyName;
   private char gender;
   private LocalDate dateOfBirth;
   private String placeOfBirth;
   private List<String> roles;
   private String authmethod;
   private String idpIssuer;
   private String apptype;
   private String appid;
   private LocalDateTime authTime;
   private String ver;
}
