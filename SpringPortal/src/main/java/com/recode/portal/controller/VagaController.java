package com.recode.portal.controller;

import org.springframework.web.bind.annotation.*;

import com.recode.portal.model.Vaga;
import com.recode.portal.service.VagaService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/vagas")
public class VagaController {

    @Autowired
    private VagaService vagaService;

    @PostMapping
    public ResponseEntity<Vaga> criar(@RequestBody Vaga vaga, @RequestParam Long empresaId) {
        return ResponseEntity.ok(vagaService.salvar(vaga, empresaId));
    }

    @GetMapping
    public ResponseEntity<List<Vaga>> listar() {
        return ResponseEntity.ok(vagaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vaga> buscarPorId(@PathVariable Long id) {
        return vagaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        vagaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}