package com.recode.portal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recode.portal.model.Candidato;
import com.recode.portal.model.Candidatura;
import com.recode.portal.model.Vaga;
import com.recode.portal.repository.CandidatoRepository;
import com.recode.portal.repository.CandidaturaRepository;
import com.recode.portal.repository.VagaRepository;

import java.util.List;

@Service
public class CandidaturaService {

	@Autowired
	private CandidaturaRepository candidaturaRepository;

	@Autowired
	private CandidatoRepository candidatoRepository;

	@Autowired
	private VagaRepository vagaRepository;

	public Candidatura salvar(Candidatura candidatura, Long candidatoId, Long vagaId) {
		Candidato candidato = candidatoRepository.findById(candidatoId)
				.orElseThrow(() -> new RuntimeException("Candidato não encontrado"));

		Vaga vaga = vagaRepository.findById(vagaId).orElseThrow(() -> new RuntimeException("Vaga não encontrada"));

		candidatura.setCandidato(candidato);
		candidatura.setVaga(vaga);
		return candidaturaRepository.save(candidatura);
	}

	public List<Candidatura> listarTodas() {
		return candidaturaRepository.findAll();
	}

	public void deletar(Long id) {
		candidaturaRepository.deleteById(id);
	}
}
