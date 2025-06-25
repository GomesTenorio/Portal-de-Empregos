package com.recode.portal.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "candidaturas")
public class Candidatura {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "candidato_id", nullable = false)
	private Candidato candidato;

	@ManyToOne
	@JoinColumn(name = "vaga_id", nullable = false)
	private Vaga vaga;

	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime dataCandidatura = LocalDateTime.now();

	@Enumerated(EnumType.STRING)
	private StatusCandidatura statusCandidatura = StatusCandidatura.CANDIDATURA_ENVIADA;

	// enum
	public enum StatusCandidatura {
		CANDIDATURA_ENVIADA("Candidatura Enviada"), 
		EM_ANALISE("Em Análise"),
		ENTREVISTA_AGENDADA("Entrevista Agendada"), 
		ENTREVISTA_REALIZADA("Entrevista Realizada"),
		TESTE_APLICADO("Teste Aplicado"), 
		OFERECIDO("Oferecido"), 
		CONTRATADO("Contratado"), 
		REJEITADO("Rejeitado"),
		RETIRADO("Retirado");

		private final String label;

		StatusCandidatura(String label) {
			this.label = label;
		}

		@JsonValue
		public String getLabel() {
			return label;
		}

		@JsonCreator
		public static StatusCandidatura fromLabel(String label) {
			for (StatusCandidatura status : values()) {
				if (status.label.equalsIgnoreCase(label) || status.name().equalsIgnoreCase(label)) {
					return status;
				}
			}
			throw new IllegalArgumentException("Status de candidatura inválido: " + label);
		}
	}

	@Column(columnDefinition = "TEXT")
	private String observacoes;

	
	// gets e setes

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

	public Vaga getVaga() {
		return vaga;
	}

	public void setVaga(Vaga vaga) {
		this.vaga = vaga;
	}

	public LocalDateTime getDataCandidatura() {
		return dataCandidatura;
	}

	public void setDataCandidatura(LocalDateTime dataCandidatura) {
		this.dataCandidatura = dataCandidatura;
	}

	public StatusCandidatura getStatusCandidatura() {
		return statusCandidatura;
	}

	public void setStatusCandidatura(StatusCandidatura statusCandidatura) {
		this.statusCandidatura = statusCandidatura;
	}

	public String getObservacoes() {
		return observacoes;
	}

	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}
}