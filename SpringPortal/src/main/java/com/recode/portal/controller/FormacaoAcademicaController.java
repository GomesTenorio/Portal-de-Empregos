package com.recode.portal.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.recode.portal.model.FormacaoAcademica;
import com.recode.portal.service.FormacaoAcademicaService;


@RestController
@RequestMapping("/api/formacoes")
@CrossOrigin(origins = "http://localhost:4200")
public class FormacaoAcademicaController {

    private final FormacaoAcademicaService formacaoService;

    public FormacaoAcademicaController(FormacaoAcademicaService formacaoService) {
        this.formacaoService = formacaoService;
    }

    @PostMapping
    public FormacaoAcademica salvar(@RequestParam Long candidatoId,
                                    @RequestBody FormacaoAcademica formacao) {
        return formacaoService.salvar(candidatoId, formacao);
    }

    @GetMapping
    public List<FormacaoAcademica> listar() {
        return formacaoService.listarTodas();
    }
}
