package com.recode.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recode.portal.model.CandidatoHabilidade;
import com.recode.portal.model.CandidatoHabilidadeId;

public interface CandidatoHabilidadeRepository extends JpaRepository<CandidatoHabilidade, CandidatoHabilidadeId> {
}
