package com.recode.portal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recode.portal.model.LogAtividade;
import com.recode.portal.repository.LogAtividadeRepository;

import java.util.List;

@Service
public class LogAtividadeService {

	@Autowired
	private LogAtividadeRepository repository;

	public LogAtividade salvar(LogAtividade log) {
		return repository.save(log);
	}

	public List<LogAtividade> listarTodos() {
		return repository.findAll();
	}
}
