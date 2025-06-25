package com.recode.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.recode.portal.model.Candidatura;
import com.recode.portal.service.CandidaturaService;

import java.util.List;

@RestController
@RequestMapping("/api/candidaturas")
public class CandidaturaController {

    @Autowired
    private CandidaturaService service;

    @PostMapping
    public Candidatura criar(@RequestBody Candidatura candidatura,
                              @RequestParam Long candidatoId,
                              @RequestParam Long vagaId) {
        return service.salvar(candidatura, candidatoId, vagaId);
    }

    @GetMapping
    public List<Candidatura> listar() {
        return service.listarTodas();
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}