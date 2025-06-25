package com.recode.portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.recode.portal.model.ExperienciaProfissional;
import com.recode.portal.service.ExperienciaProfissionalService;

@RestController
@RequestMapping("/api/experiencias")
public class ExperienciaProfissionalController {

    @Autowired
    private ExperienciaProfissionalService service;

    @PostMapping
    public ExperienciaProfissional criar(
        @RequestBody ExperienciaProfissional experiencia,
        @RequestParam Long candidatoId
    ) {
        return service.salvar(experiencia, candidatoId);
    }

    @GetMapping
    public List<ExperienciaProfissional> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ExperienciaProfissional buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}