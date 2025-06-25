package com.recode.portal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recode.portal.model.Candidato;
import com.recode.portal.model.CandidatoHabilidade;
import com.recode.portal.model.CandidatoHabilidadeId;
import com.recode.portal.model.Habilidade;
import com.recode.portal.repository.CandidatoHabilidadeRepository;
import com.recode.portal.repository.CandidatoRepository;
import com.recode.portal.repository.HabilidadeRepository;

import java.util.List;

@Service
public class CandidatoHabilidadeService {

	@Autowired
	private CandidatoHabilidadeRepository repository;

	@Autowired
	private CandidatoRepository candidatoRepository;

	@Autowired
	private HabilidadeRepository habilidadeRepository;

	public CandidatoHabilidade salvar(Long candidatoId, Long habilidadeId, CandidatoHabilidade habilidade) {
		Candidato candidato = candidatoRepository.findById(candidatoId)
				.orElseThrow(() -> new RuntimeException("Candidato não encontrado"));

		Habilidade hab = habilidadeRepository.findById(habilidadeId)
				.orElseThrow(() -> new RuntimeException("Habilidade não encontrada"));

		habilidade.setCandidato(candidato);
		habilidade.setHabilidade(hab);

		return repository.save(habilidade);
	}

	public List<CandidatoHabilidade> listarTodos() {
		return repository.findAll();
	}

	public void deletar(Long candidatoId, Long habilidadeId) {
		CandidatoHabilidadeId id = new CandidatoHabilidadeId(candidatoId, habilidadeId);
		repository.deleteById(id);
	}
}
