package com.recode.portal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recode.portal.model.Empresa;
import com.recode.portal.repository.EmpresaRepository;

@Service
public class EmpresaService {
	
    @Autowired
    private EmpresaRepository empresaRepository;

    public Empresa salvar(Empresa empresa) {
        if (empresaRepository.findByEmail(empresa.getEmail()).isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado.");
        }

        if (empresaRepository.findByCnpj(empresa.getCnpj()).isPresent()) {
            throw new IllegalArgumentException("CNPJ já cadastrado.");
        }

        return empresaRepository.save(empresa);
    }

    public List<Empresa> listarTodas() {
        return empresaRepository.findAll();
    }

    public Optional<Empresa> buscarPorId(Long id) {
        return empresaRepository.findById(id);
    }

    public void deletar(Long id) {
        empresaRepository.deleteById(id);
    }
	
}
