package com.recode.portal.model;
import jakarta.persistence.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

@Entity
public class FormacaoAcademica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "candidato_id", nullable = false)
    private Candidato candidato;

    private String instituicao;
    private String curso;

    @Enumerated(EnumType.STRING)
    private Nivel nivel;

    private LocalDate dataInicio;
    private LocalDate dataConclusao;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Nivel {
        ENSINO_MEDIO("Ensino Médio"),
        TECNICO("Técnico"),
        GRADUACAO("Graduação"),
        POS_GRADUACAO("Pós-Graduação"),
        MESTRADO("Mestrado"),
        DOUTORADO("Doutorado");

        private final String label;

        Nivel(String label) {
            this.label = label;
        }

        @JsonValue
        public String getLabel() {
            return label;
        }

        @JsonCreator
        public static Nivel fromLabel(String label) {
            for (Nivel n : Nivel.values()) {
                if (n.label.equalsIgnoreCase(label) || n.name().equalsIgnoreCase(label)) {
                    return n;
                }
            }
            throw new IllegalArgumentException("Nível inválido: " + label);
        }
    }

    public enum Status {
        CONCLUIDO("Concluído"),
        EM_ANDAMENTO("Em Andamento"),
        INTERROMPIDO("Interrompido");

        private final String label;

        Status(String label) {
            this.label = label;
        }

        @JsonValue
        public String getLabel() {
            return label;
        }

        @JsonCreator
        public static Status fromLabel(String label) {
            for (Status s : Status.values()) {
                if (s.label.equalsIgnoreCase(label) || s.name().equalsIgnoreCase(label)) {
                    return s;
                }
            }
            throw new IllegalArgumentException("Status inválido: " + label);
        }
    }
    
    public FormacaoAcademica() {}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Candidato getCandidato() {
        return candidato;
    }

    public void setCandidato(Candidato candidato) {
        this.candidato = candidato;
    }

    public String getInstituicao() {
        return instituicao;
    }

    public void setInstituicao(String instituicao) {
        this.instituicao = instituicao;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public Nivel getNivel() {
        return nivel;
    }

    public void setNivel(Nivel nivel) {
        this.nivel = nivel;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataConclusao() {
        return dataConclusao;
    }

    public void setDataConclusao(LocalDate dataConclusao) {
        this.dataConclusao = dataConclusao;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}