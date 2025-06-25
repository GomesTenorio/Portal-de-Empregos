package com.recode.portal.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.recode.portal.model.Candidato;
import com.recode.portal.model.FormacaoAcademica;
import com.recode.portal.repository.CandidatoRepository;
import com.recode.portal.repository.FormacaoAcademicaRepository;

@Service
public class FormacaoAcademicaService {

    private final FormacaoAcademicaRepository formacaoRepository;
    private final CandidatoRepository candidatoRepository;

    public FormacaoAcademicaService(FormacaoAcademicaRepository formacaoRepository,
                                    CandidatoRepository candidatoRepository) {
        this.formacaoRepository = formacaoRepository;
        this.candidatoRepository = candidatoRepository;
    }

    public FormacaoAcademica salvar(Long candidatoId, FormacaoAcademica formacao) {
        Candidato candidato = candidatoRepository.findById(candidatoId)
                .orElseThrow(() -> new RuntimeException("Candidato não encontrado"));

        formacao.setCandidato(candidato);
        return formacaoRepository.save(formacao);
    }

    public List<FormacaoAcademica> listarTodas() {
        return formacaoRepository.findAll();
    }
}