package com.recode.portal.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "vagas")
public class Vaga {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "empresa_id")
	private Empresa empresa;

	@Column(nullable = false)
	private String titulo;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String descricao;

	@Column(columnDefinition = "TEXT")
	private String requisitos;

	@Column(columnDefinition = "TEXT")
	private String responsabilidades;

	@Column(name = "salario_min")
	private BigDecimal salarioMin;

	@Column(name = "salario_max")
	private BigDecimal salarioMax;

	@Enumerated(EnumType.STRING)
	@Column(name = "tipo_salario")
	private TipoSalario tipoSalario = TipoSalario.Por_Mes;

	@Column(name = "localizacao_cidade", nullable = false)
	private String localizacaoCidade;

	@Column(name = "localizacao_estado", nullable = false)
	private String localizacaoEstado;

	@Enumerated(EnumType.STRING)
	@Column(name = "tipo_contrato", nullable = false)
	private TipoContrato tipoContrato;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Modalidade modalidade;

	private String setor;
	private String areaProfissional;

	@Enumerated(EnumType.STRING)
	@Column(name = "nivel_experiencia", nullable = false)
	private NivelExperiencia nivelExperiencia;

	@Column(columnDefinition = "TEXT")
	private String beneficios;

	@Column(name = "data_publicacao")
	private LocalDateTime dataPublicacao = LocalDateTime.now();

	@Column(name = "data_expiracao")
	private LocalDate dataExpiracao;

	@Enumerated(EnumType.STRING)
	private Status status = Status.Aberta;

	// enums
	public enum TipoSalario {
		Por_Hora, Por_Mes, Por_Ano, Negociável
	}

	public enum TipoContrato {
		CLT, PJ, Estágio, Temporário, Freelancer, Trainee
	}

	public enum Modalidade {
		Presencial, Remoto, Híbrido
	}

	public enum NivelExperiencia {
		Estágio, Júnior, Pleno, Sênior, Especialista
	}

	public enum Status {
		Aberta, Fechada, Pausada
	}

	// construtor completo
	public Vaga(Long id, Empresa empresa, String titulo, String descricao, String requisitos, String responsabilidades,
			BigDecimal salarioMin, BigDecimal salarioMax, TipoSalario tipoSalario, String localizacaoCidade,
			String localizacaoEstado, TipoContrato tipoContrato, Modalidade modalidade, String setor,
			String areaProfissional, NivelExperiencia nivelExperiencia, String beneficios, LocalDateTime dataPublicacao,
			LocalDate dataExpiracao, Status status) {
		this.id = id;
		this.empresa = empresa;
		this.titulo = titulo;
		this.descricao = descricao;
		this.requisitos = requisitos;
		this.responsabilidades = responsabilidades;
		this.salarioMin = salarioMin;
		this.salarioMax = salarioMax;
		this.tipoSalario = tipoSalario;
		this.localizacaoCidade = localizacaoCidade;
		this.localizacaoEstado = localizacaoEstado;
		this.tipoContrato = tipoContrato;
		this.modalidade = modalidade;
		this.setor = setor;
		this.areaProfissional = areaProfissional;
		this.nivelExperiencia = nivelExperiencia;
		this.beneficios = beneficios;
		this.dataPublicacao = dataPublicacao;
		this.dataExpiracao = dataExpiracao;
		this.status = status;
	}

	// cosntrutor sem id
	public Vaga(Empresa empresa, String titulo, String descricao, String requisitos, String responsabilidades,
			BigDecimal salarioMin, BigDecimal salarioMax, TipoSalario tipoSalario, String localizacaoCidade,
			String localizacaoEstado, TipoContrato tipoContrato, Modalidade modalidade, String setor,
			String areaProfissional, NivelExperiencia nivelExperiencia, String beneficios, LocalDateTime dataPublicacao,
			LocalDate dataExpiracao, Status status) {
		this.empresa = empresa;
		this.titulo = titulo;
		this.descricao = descricao;
		this.requisitos = requisitos;
		this.responsabilidades = responsabilidades;
		this.salarioMin = salarioMin;
		this.salarioMax = salarioMax;
		this.tipoSalario = tipoSalario;
		this.localizacaoCidade = localizacaoCidade;
		this.localizacaoEstado = localizacaoEstado;
		this.tipoContrato = tipoContrato;
		this.modalidade = modalidade;
		this.setor = setor;
		this.areaProfissional = areaProfissional;
		this.nivelExperiencia = nivelExperiencia;
		this.beneficios = beneficios;
		this.dataPublicacao = dataPublicacao;
		this.dataExpiracao = dataExpiracao;
		this.status = status;
	}

	// construtor vazio
	public Vaga() {
	}

	// gets e sets
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getRequisitos() {
		return requisitos;
	}

	public void setRequisitos(String requisitos) {
		this.requisitos = requisitos;
	}

	public String getResponsabilidades() {
		return responsabilidades;
	}

	public void setResponsabilidades(String responsabilidades) {
		this.responsabilidades = responsabilidades;
	}

	public BigDecimal getSalarioMin() {
		return salarioMin;
	}

	public void setSalarioMin(BigDecimal salarioMin) {
		this.salarioMin = salarioMin;
	}

	public BigDecimal getSalarioMax() {
		return salarioMax;
	}

	public void setSalarioMax(BigDecimal salarioMax) {
		this.salarioMax = salarioMax;
	}

	public TipoSalario getTipoSalario() {
		return tipoSalario;
	}

	public void setTipoSalario(TipoSalario tipoSalario) {
		this.tipoSalario = tipoSalario;
	}

	public String getLocalizacaoCidade() {
		return localizacaoCidade;
	}

	public void setLocalizacaoCidade(String localizacaoCidade) {
		this.localizacaoCidade = localizacaoCidade;
	}

	public String getLocalizacaoEstado() {
		return localizacaoEstado;
	}

	public void setLocalizacaoEstado(String localizacaoEstado) {
		this.localizacaoEstado = localizacaoEstado;
	}

	public TipoContrato getTipoContrato() {
		return tipoContrato;
	}

	public void setTipoContrato(TipoContrato tipoContrato) {
		this.tipoContrato = tipoContrato;
	}

	public Modalidade getModalidade() {
		return modalidade;
	}

	public void setModalidade(Modalidade modalidade) {
		this.modalidade = modalidade;
	}

	public String getSetor() {
		return setor;
	}

	public void setSetor(String setor) {
		this.setor = setor;
	}

	public String getAreaProfissional() {
		return areaProfissional;
	}

	public void setAreaProfissional(String areaProfissional) {
		this.areaProfissional = areaProfissional;
	}

	public NivelExperiencia getNivelExperiencia() {
		return nivelExperiencia;
	}

	public void setNivelExperiencia(NivelExperiencia nivelExperiencia) {
		this.nivelExperiencia = nivelExperiencia;
	}

	public String getBeneficios() {
		return beneficios;
	}

	public void setBeneficios(String beneficios) {
		this.beneficios = beneficios;
	}

	public LocalDateTime getDataPublicacao() {
		return dataPublicacao;
	}

	public void setDataPublicacao(LocalDateTime dataPublicacao) {
		this.dataPublicacao = dataPublicacao;
	}

	public LocalDate getDataExpiracao() {
		return dataExpiracao;
	}

	public void setDataExpiracao(LocalDate dataExpiracao) {
		this.dataExpiracao = dataExpiracao;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

}