package com.recode.portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.recode.portal.model.Candidato;
import com.recode.portal.service.CandidatoService;

@RestController
@RequestMapping("/api/candidatos")
public class CandidatoController {
	
	@Autowired
	private CandidatoService candidatoService;

	@PostMapping
	public ResponseEntity<Candidato> criar(@RequestBody Candidato candidato) {
		return ResponseEntity.ok(candidatoService.salvar(candidato));
	}

	@GetMapping
	public ResponseEntity<List<Candidato>> listar() {
		return ResponseEntity.ok(candidatoService.listarTodos());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Candidato> buscarPorId(@PathVariable Long id) {
		return candidatoService.buscarPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletar(@PathVariable Long id) {
		candidatoService.deletar(id);
		return ResponseEntity.noContent().build();
	}
}
