package com.recode.portal.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;


@Entity
@Table(name = "empresas")
public class Empresa {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_fantasia", nullable = false)
    private String nomeFantasia;

    @Column(name = "razao_social", nullable = false, unique = true)
    private String razaoSocial;

    @Column(nullable = false, unique = true)
    private String cnpj;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Porte porte;

    private String segmento;

    @Column(nullable = false, unique = true)
    private String email;

    private String telefone;
    private String site;

    @Column(name = "endereco_rua")
    private String enderecoRua;

    @Column(name = "endereco_numero")
    private String enderecoNumero;

    @Column(name = "endereco_complemento")
    private String enderecoComplemento;

    @Column(name = "endereco_bairro")
    private String enderecoBairro;

    @Column(name = "endereco_cidade")
    private String enderecoCidade;

    @Column(name = "endereco_estado")
    private String enderecoEstado;

    @Column(name = "endereco_cep")
    private String enderecoCep;

    @Column(name = "descricao_empresa", columnDefinition = "TEXT")
    private String descricaoEmpresa;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private Status status = Status.Ativa;

    
    //metodos porte e status
    public enum Porte {
        Micro, Pequena, Media, Grande
    }

    public enum Status {
        Ativa, Inativa, Pendente
    }

    //construtor completo
	public Empresa(Long id, String nomeFantasia, String razaoSocial, String cnpj, Porte porte, String segmento,
			String email, String telefone, String site, String enderecoRua, String enderecoNumero,
			String enderecoComplemento, String enderecoBairro, String enderecoCidade, String enderecoEstado,
			String enderecoCep, String descricaoEmpresa, String logoUrl, LocalDateTime dataCadastro, Status status) {
		this.id = id;
		this.nomeFantasia = nomeFantasia;
		this.razaoSocial = razaoSocial;
		this.cnpj = cnpj;
		this.porte = porte;
		this.segmento = segmento;
		this.email = email;
		this.telefone = telefone;
		this.site = site;
		this.enderecoRua = enderecoRua;
		this.enderecoNumero = enderecoNumero;
		this.enderecoComplemento = enderecoComplemento;
		this.enderecoBairro = enderecoBairro;
		this.enderecoCidade = enderecoCidade;
		this.enderecoEstado = enderecoEstado;
		this.enderecoCep = enderecoCep;
		this.descricaoEmpresa = descricaoEmpresa;
		this.logoUrl = logoUrl;
		this.dataCadastro = dataCadastro;
		this.status = status;
	}

	//construtor sem id
	public Empresa(String nomeFantasia, String razaoSocial, String cnpj, Porte porte, String segmento, String email,
			String telefone, String site, String enderecoRua, String enderecoNumero, String enderecoComplemento,
			String enderecoBairro, String enderecoCidade, String enderecoEstado, String enderecoCep,
			String descricaoEmpresa, String logoUrl, LocalDateTime dataCadastro, Status status) {
		this.nomeFantasia = nomeFantasia;
		this.razaoSocial = razaoSocial;
		this.cnpj = cnpj;
		this.porte = porte;
		this.segmento = segmento;
		this.email = email;
		this.telefone = telefone;
		this.site = site;
		this.enderecoRua = enderecoRua;
		this.enderecoNumero = enderecoNumero;
		this.enderecoComplemento = enderecoComplemento;
		this.enderecoBairro = enderecoBairro;
		this.enderecoCidade = enderecoCidade;
		this.enderecoEstado = enderecoEstado;
		this.enderecoCep = enderecoCep;
		this.descricaoEmpresa = descricaoEmpresa;
		this.logoUrl = logoUrl;
		this.dataCadastro = dataCadastro;
		this.status = status;
	}

	//construtor vazio
	public Empresa() {
	}

	//gets e sets
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomeFantasia() {
		return nomeFantasia;
	}

	public void setNomeFantasia(String nomeFantasia) {
		this.nomeFantasia = nomeFantasia;
	}

	public String getRazaoSocial() {
		return razaoSocial;
	}

	public void setRazaoSocial(String razaoSocial) {
		this.razaoSocial = razaoSocial;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public Porte getPorte() {
		return porte;
	}

	public void setPorte(Porte porte) {
		this.porte = porte;
	}

	public String getSegmento() {
		return segmento;
	}

	public void setSegmento(String segmento) {
		this.segmento = segmento;
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

	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	public String getEnderecoRua() {
		return enderecoRua;
	}

	public void setEnderecoRua(String enderecoRua) {
		this.enderecoRua = enderecoRua;
	}

	public String getEnderecoNumero() {
		return enderecoNumero;
	}

	public void setEnderecoNumero(String enderecoNumero) {
		this.enderecoNumero = enderecoNumero;
	}

	public String getEnderecoComplemento() {
		return enderecoComplemento;
	}

	public void setEnderecoComplemento(String enderecoComplemento) {
		this.enderecoComplemento = enderecoComplemento;
	}

	public String getEnderecoBairro() {
		return enderecoBairro;
	}

	public void setEnderecoBairro(String enderecoBairro) {
		this.enderecoBairro = enderecoBairro;
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

	public String getEnderecoCep() {
		return enderecoCep;
	}

	public void setEnderecoCep(String enderecoCep) {
		this.enderecoCep = enderecoCep;
	}

	public String getDescricaoEmpresa() {
		return descricaoEmpresa;
	}

	public void setDescricaoEmpresa(String descricaoEmpresa) {
		this.descricaoEmpresa = descricaoEmpresa;
	}

	public String getLogoUrl() {
		return logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}

	public LocalDateTime getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(LocalDateTime dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
      
    
}
