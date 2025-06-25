package com.recode.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.recode.portal.model.CandidatoHabilidade;
import com.recode.portal.service.CandidatoHabilidadeService;

import java.util.List;

@RestController
@RequestMapping("/api/candidato-habilidades")
public class CandidatoHabilidadeController {

	@Autowired
	private CandidatoHabilidadeService service;

	@PostMapping
	public CandidatoHabilidade adicionarHabilidade(@RequestParam Long candidatoId, @RequestParam Long habilidadeId,
			@RequestBody CandidatoHabilidade habilidade) {
		return service.salvar(candidatoId, habilidadeId, habilidade);
	}

	@GetMapping
	public List<CandidatoHabilidade> listarTodas() {
		return service.listarTodos();
	}

	@DeleteMapping
	public void remover(@RequestParam Long candidatoId, @RequestParam Long habilidadeId) {
		service.deletar(candidatoId, habilidadeId);
	}
}
