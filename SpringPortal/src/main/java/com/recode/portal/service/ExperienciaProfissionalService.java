package com.recode.portal.service;

import com.recode.portal.model.Candidato;
import com.recode.portal.model.ExperienciaProfissional;
import com.recode.portal.repository.CandidatoRepository;
import com.recode.portal.repository.ExperienciaProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienciaProfissionalService {

    @Autowired
    private ExperienciaProfissionalRepository repository;

    @Autowired
    private CandidatoRepository candidatoRepository;

    public ExperienciaProfissional salvar(ExperienciaProfissional experiencia, Long candidatoId) {
        Candidato candidato = candidatoRepository.findById(candidatoId)
            .orElseThrow(() -> new RuntimeException("Candidato não encontrado"));
        experiencia.setCandidato(candidato);
        return repository.save(experiencia);
    }

    public List<ExperienciaProfissional> listarTodos() {
        return repository.findAll();
    }

    public ExperienciaProfissional buscarPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Experiência não encontrada"));
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
