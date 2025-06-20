package com.recode.portal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(name = "senha_hash", nullable = false)
	private String senhaHash;

	@Enumerated(EnumType.STRING)
	@Column(name = "tipo_conta", nullable = false)
	private TipoConta tipoConta;

	@Column(name = "referencia_id")
	private Long referenciaId;

	@Column(name = "data_cadastro")
	private LocalDateTime dataCadastro = LocalDateTime.now();

	@Column(name = "ultimo_login")
	private LocalDateTime ultimoLogin;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Status status = Status.Ativo;
	
	
    public enum TipoConta {
        Candidato, Empresa, Administrador
    }

    public enum Status {
        Ativo, Inativo, Bloqueado
    }

    //Contrutor completo
	public Usuario(Long id, String email, String senhaHash, TipoConta tipoConta, Long referenciaId,
			LocalDateTime dataCadastro, LocalDateTime ultimoLogin, Status status) {
		this.id = id;
		this.email = email;
		this.senhaHash = senhaHash;
		this.tipoConta = tipoConta;
		this.referenciaId = referenciaId;
		this.dataCadastro = dataCadastro;
		this.ultimoLogin = ultimoLogin;
		this.status = status;
	}
	
	
	//Construtor sem id
	public Usuario(String email, String senhaHash, TipoConta tipoConta, Long referenciaId, LocalDateTime dataCadastro,
			LocalDateTime ultimoLogin, Status status) {
		this.email = email;
		this.senhaHash = senhaHash;
		this.tipoConta = tipoConta;
		this.referenciaId = referenciaId;
		this.dataCadastro = dataCadastro;
		this.ultimoLogin = ultimoLogin;
		this.status = status;
	}


	//Construtor vazio
	public Usuario() {
	}

	
	//gets e sets
	
	
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getSenhaHash() {
		return senhaHash;
	}


	public void setSenhaHash(String senhaHash) {
		this.senhaHash = senhaHash;
	}


	public TipoConta getTipoConta() {
		return tipoConta;
	}


	public void setTipoConta(TipoConta tipoConta) {
		this.tipoConta = tipoConta;
	}


	public Long getReferenciaId() {
		return referenciaId;
	}


	public void setReferenciaId(Long referenciaId) {
		this.referenciaId = referenciaId;
	}


	public LocalDateTime getDataCadastro() {
		return dataCadastro;
	}


	public void setDataCadastro(LocalDateTime dataCadastro) {
		this.dataCadastro = dataCadastro;
	}


	public LocalDateTime getUltimoLogin() {
		return ultimoLogin;
	}


	public void setUltimoLogin(LocalDateTime ultimoLogin) {
		this.ultimoLogin = ultimoLogin;
	}


	public Status getStatus() {
		return status;
	}


	public void setStatus(Status status) {
		this.status = status;
	}
    
    
    

}
