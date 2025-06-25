package com.recode.portal.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import jakarta.persistence.*;

@Entity
@Table(name = "candidato_habilidades")
@IdClass(CandidatoHabilidadeId.class)
public class CandidatoHabilidade {

	@Id
	@ManyToOne
	@JoinColumn(name = "candidato_id")
	private Candidato candidato;

	@Id
	@ManyToOne
	@JoinColumn(name = "habilidade_id")
	private Habilidade habilidade;

	@Enumerated(EnumType.STRING)
	private NivelProficiencia nivelProficiencia;

	// enum
	public enum NivelProficiencia {
		BASICO("Básico"), INTERMEDIARIO("Intermediário"), AVANCADO("Avançado"), FLUENTE("Fluente");

		private final String label;

		NivelProficiencia(String label) {
			this.label = label;
		}

		@JsonValue
		public String getLabel() {
			return label;
		}

		@JsonCreator
		public static NivelProficiencia fromLabel(String label) {
			for (NivelProficiencia n : NivelProficiencia.values()) {
				if (n.label.equalsIgnoreCase(label) || n.name().equalsIgnoreCase(label)) {
					return n;
				}
			}
			throw new IllegalArgumentException("Nível inválido: " + label);
		}
	}

	// gets e sets

	public Candidato getCandidato() {
		return candidato;
	}

	public void setCandidato(Candidato candidato) {
		this.candidato = candidato;
	}

	public Habilidade getHabilidade() {
		return habilidade;
	}

	public void setHabilidade(Habilidade habilidade) {
		this.habilidade = habilidade;
	}

	public NivelProficiencia getNivelProficiencia() {
		return nivelProficiencia;
	}

	public void setNivelProficiencia(NivelProficiencia nivelProficiencia) {
		this.nivelProficiencia = nivelProficiencia;
	}
}
