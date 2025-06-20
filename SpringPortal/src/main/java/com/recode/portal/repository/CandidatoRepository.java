package com.recode.portal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recode.portal.model.Candidato;

public interface CandidatoRepository extends JpaRepository<Candidato, Long>{
	Optional<Candidato> findByEmail(String email);

}
