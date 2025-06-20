package com.recode.portal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recode.portal.model.Candidato;
import com.recode.portal.repository.CandidatoRepository;

@Service
public class CandidatoService {

    @Autowired
    private CandidatoRepository candidatoRepository;

    public Candidato salvar(Candidato candidato) {
        Optional<Candidato> existente = candidatoRepository.findByEmail(candidato.getEmail());
        if (existente.isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado para outro candidato");
        }
        return candidatoRepository.save(candidato);
    }

    public List<Candidato> listarTodos() {
        return candidatoRepository.findAll();
    }

    public Optional<Candidato> buscarPorId(Long id) {
        return candidatoRepository.findById(id);
    }

    public void deletar(Long id) {
        candidatoRepository.deleteById(id);
    }
}