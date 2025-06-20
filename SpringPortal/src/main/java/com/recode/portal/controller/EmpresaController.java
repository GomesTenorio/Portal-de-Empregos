package com.recode.portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.recode.portal.model.Empresa;
import com.recode.portal.service.EmpresaService;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {
	
	@Autowired
    private EmpresaService empresaService;

    @PostMapping
    public ResponseEntity<Empresa> criar(@RequestBody Empresa empresa) {
        return ResponseEntity.ok(empresaService.salvar(empresa));
    }

    @GetMapping
    public ResponseEntity<List<Empresa>> listar() {
        return ResponseEntity.ok(empresaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empresa> buscarPorId(@PathVariable Long id) {
        return empresaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        empresaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
	
}
