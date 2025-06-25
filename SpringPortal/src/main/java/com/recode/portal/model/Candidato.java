package com.recode.portal.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "candidatos")
public class Candidato {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nome_completo", nullable = false)
	private String nomeCompleto;

	@Column(nullable = false, unique = true)
	private String email;

	private String telefone;

	@Column(name = "data_nascimento")
	private LocalDate dataNascimento;

	@Enumerated(EnumType.STRING)
	private Genero genero;

	private String nacionalidade;

	@Column(name = "endereco_cidade")
	private String enderecoCidade;

	@Column(name = "endereco_estado")
	private String enderecoEstado;

	@Column(name = "linkedin_url")
	private String linkedinUrl;

	@Column(name = "portfolio_url")
	private String portfolioUrl;

	@Column(name = "resumo_profissional", columnDefinition = "TEXT")
	private String resumoProfissional;

	@Column(name = "pretensao_salario_min")
	private Double pretensaoSalarioMin;

	@Column(name = "pretensao_salario_max")
	private Double pretensaoSalarioMax;

	@Column(name = "disponibilidade_para_viagem")
	private Boolean disponibilidadeParaViagem;

	@Column(name = "disponibilidade_para_mudanca")
	private Boolean disponibilidadeParaMudanca;

	@Column(name = "data_cadastro")
	private LocalDateTime dataCadastro = LocalDateTime.now();

	@Column(name = "ultimo_acesso")
	private LocalDateTime ultimoAcesso = LocalDateTime.now();

	public enum Genero {
		Masculino, Feminino, Outro, Prefiro_Nao_Informar
	}

	// Construtor com todos os atributos
	public Candidato(Long id, String nomeCompleto, String email, String telefone, LocalDate dataNascimento,
			Genero genero, String nacionalidade, String enderecoCidade, String enderecoEstado, String linkedinUrl,
			String portfolioUrl, String resumoProfissional, Double pretensaoSalarioMin, Double pretensaoSalarioMax,
			Boolean disponibilidadeParaViagem, Boolean disponibilidadeParaMudanca, LocalDateTime dataCadastro,
			LocalDateTime ultimoAcesso) {
		this.id = id;
		this.nomeCompleto = nomeCompleto;
		this.email = email;
		this.telefone = telefone;
		this.dataNascimento = dataNascimento;
		this.genero = genero;
		this.nacionalidade = nacionalidade;
		this.enderecoCidade = enderecoCidade;
		this.enderecoEstado = enderecoEstado;
		this.linkedinUrl = linkedinUrl;
		this.portfolioUrl = portfolioUrl;
		this.resumoProfissional = resumoProfissional;
		this.pretensaoSalarioMin = pretensaoSalarioMin;
		this.pretensaoSalarioMax = pretensaoSalarioMax;
		this.disponibilidadeParaViagem = disponibilidadeParaViagem;
		this.disponibilidadeParaMudanca = disponibilidadeParaMudanca;
		this.dataCadastro = dataCadastro;
		this.ultimoAcesso = ultimoAcesso;
	}

	// Construtor sem o id
	public Candidato(String nomeCompleto, String email, String telefone, LocalDate dataNascimento, Genero genero,
			String nacionalidade, String enderecoCidade, String enderecoEstado, String linkedinUrl, String portfolioUrl,
			String resumoProfissional, Double pretensaoSalarioMin, Double pretensaoSalarioMax,
			Boolean disponibilidadeParaViagem, Boolean disponibilidadeParaMudanca, LocalDateTime dataCadastro,
			LocalDateTime ultimoAcesso) {
		this.nomeCompleto = nomeCompleto;
		this.email = email;
		this.telefone = telefone;
		this.dataNascimento = dataNascimento;
		this.genero = genero;
		this.nacionalidade = nacionalidade;
		this.enderecoCidade = enderecoCidade;
		this.enderecoEstado = enderecoEstado;
		this.linkedinUrl = linkedinUrl;
		this.portfolioUrl = portfolioUrl;
		this.resumoProfissional = resumoProfissional;
		this.pretensaoSalarioMin = pretensaoSalarioMin;
		this.pretensaoSalarioMax = pretensaoSalarioMax;
		this.disponibilidadeParaViagem = disponibilidadeParaViagem;
		this.disponibilidadeParaMudanca = disponibilidadeParaMudanca;
		this.dataCadastro = dataCadastro;
		this.ultimoAcesso = ultimoAcesso;
	}

	// contrutor vazio
	public Candidato() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomeCompleto() {
		return nomeCompleto;
	}

	public void setNomeCompleto(String nomeCompleto) {
		this.nomeCompleto = nomeCompleto;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public Genero getGenero() {
		return genero;
	}

	public void setGenero(Genero genero) {
		this.genero = genero;
	}

	public String getNacionalidade() {
		return nacionalidade;
	}

	public void setNacionalidade(String nacionalidade) {
		this.nacionalidade = nacionalidade;
	}

	public String getEnderecoCidade() {
		return enderecoCidade;
	}

	public void setEnderecoCidade(String enderecoCidade) {
		this.enderecoCidade = enderecoCidade;
	}

	public String getEnderecoEstado() {
		return enderecoEstado;
	}

	public void setEnderecoEstado(String enderecoEstado) {
		this.enderecoEstado = enderecoEstado;
	}

	public String getLinkedinUrl() {
		return linkedinUrl;
	}

	public void setLinkedinUrl(String linkedinUrl) {
		this.linkedinUrl = linkedinUrl;
	}

	public String getPortfolioUrl() {
		return portfolioUrl;
	}

	public void setPortfolioUrl(String portfolioUrl) {
		this.portfolioUrl = portfolioUrl;
	}

	public String getResumoProfissional() {
		return resumoProfissional;
	}

	public void setResumoProfissional(String resumoProfissional) {
		this.resumoProfissional = resumoProfissional;
	}

	public Double getPretensaoSalarioMin() {
		return pretensaoSalarioMin;
	}

	public void setPretensaoSalarioMin(Double pretensaoSalarioMin) {
		this.pretensaoSalarioMin = pretensaoSalarioMin;
	}

	public Double getPretensaoSalarioMax() {
		return pretensaoSalarioMax;
	}

	public void setPretensaoSalarioMax(Double pretensaoSalarioMax) {
		this.pretensaoSalarioMax = pretensaoSalarioMax;
	}

	public Boolean getDisponibilidadeParaViagem() {
		return disponibilidadeParaViagem;
	}

	public void setDisponibilidadeParaViagem(Boolean disponibilidadeParaViagem) {
		this.disponibilidadeParaViagem = disponibilidadeParaViagem;
	}

	public Boolean getDisponibilidadeParaMudanca() {
		return disponibilidadeParaMudanca;
	}

	public void setDisponibilidadeParaMudanca(Boolean disponibilidadeParaMudanca) {
		this.disponibilidadeParaMudanca = disponibilidadeParaMudanca;
	}

	public LocalDateTime getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(LocalDateTime dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	public LocalDateTime getUltimoAcesso() {
		return ultimoAcesso;
	}

	public void setUltimoAcesso(LocalDateTime ultimoAcesso) {
		this.ultimoAcesso = ultimoAcesso;
	}

}
    
    
    
    
