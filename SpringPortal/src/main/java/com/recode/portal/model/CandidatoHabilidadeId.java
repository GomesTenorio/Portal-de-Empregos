package com.recode.portal.model;

import java.io.Serializable;
import java.util.Objects;

//classe auxiliar para chave composta

public class CandidatoHabilidadeId implements Serializable {

	private Long candidato;
	private Long habilidade;
	
	private static final long serialVersionUID = 1L;

	//construtor, equals e hashCode

	public CandidatoHabilidadeId() {
	}

	public CandidatoHabilidadeId(Long candidato, Long habilidade) {
		this.candidato = candidato;
		this.habilidade = habilidade;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof CandidatoHabilidadeId))
			return false;
		CandidatoHabilidadeId that = (CandidatoHabilidadeId) o;
		return Objects.equals(candidato, that.candidato) && Objects.equals(habilidade, that.habilidade);
	}

	@Override
	public int hashCode() {
		return Objects.hash(candidato, habilidade);
	}
}