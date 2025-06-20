package com.recode.portal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recode.portal.model.Empresa;

public interface EmpresaRepository extends JpaRepository<Empresa, Long>{
	Optional<Empresa> findByEmail(String email);
	Optional<Empresa> findByCnpj(String cnpj);

}
