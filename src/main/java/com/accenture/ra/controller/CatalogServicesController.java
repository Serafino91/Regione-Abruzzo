package com.accenture.ra.controller;

import com.accenture.ra.response.CatalogServiceResponse;
import com.accenture.ra.response.CatalogServicesListResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value="/catalog/services")
@Tag(name="Catalog", description = "Gruppo relativo agli elementi a catalogo")
public class CatalogServicesController {

	@GetMapping(value = "")
	public ResponseEntity<CatalogServicesListResponse> getCatalogServicesList() {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping(value = "")
	public ResponseEntity<CatalogServiceResponse> createCatalogService() {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping(value = "/filter")
	public ResponseEntity<CatalogServicesListResponse> getFilteredServices() {
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
