package com.recode.portal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recode.portal.model.Empresa;
import com.recode.portal.model.Vaga;
import com.recode.portal.repository.EmpresaRepository;
import com.recode.portal.repository.VagaRepository;

@Service
public class VagaService {
	
	@Autowired
    private VagaRepository vagaRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    public Vaga salvar(Vaga vaga, Long empresaId) {
        Empresa empresa = empresaRepository.findById(empresaId)
            .orElseThrow(() -> new IllegalArgumentException("Empresa não encontrada com ID: " + empresaId));

        vaga.setEmpresa(empresa);
        return vagaRepository.save(vaga);
    }

    public List<Vaga> listarTodas() {
        return vagaRepository.findAll();
    }

    public Optional<Vaga> buscarPorId(Long id) {
        return vagaRepository.findById(id);
    }

    public void deletar(Long id) {
        vagaRepository.deleteById(id);
    }
}
