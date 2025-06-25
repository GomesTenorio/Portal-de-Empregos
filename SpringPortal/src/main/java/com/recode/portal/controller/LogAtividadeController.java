package com.recode.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.recode.portal.model.LogAtividade;
import com.recode.portal.service.LogAtividadeService;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class LogAtividadeController {

	@Autowired
	private LogAtividadeService service;

	@PostMapping
	public LogAtividade registrar(@RequestBody LogAtividade log) {
		return service.salvar(log);
	}

	@GetMapping
	public List<LogAtividade> listar() {
		return service.listarTodos();
	}
}