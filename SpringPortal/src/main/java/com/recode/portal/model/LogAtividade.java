package com.recode.portal.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "log_atividades")
public class LogAtividade {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	private TipoUsuario tipoUsuario;

	// enum
	public enum TipoUsuario {
		EMPRESA("Empresa"), CANDIDATO("Candidato"), ADMIN("Admin");

		private final String label;

		TipoUsuario(String label) {
			this.label = label;
		}

		@JsonValue
		public String getLabel() {
			return label;
		}

		@JsonCreator
		public static TipoUsuario fromLabel(String label) {
			for (TipoUsuario tipo : values()) {
				if (tipo.label.equalsIgnoreCase(label) || tipo.name().equalsIgnoreCase(label)) {
					return tipo;
				}
			}
			throw new IllegalArgumentException("Tipo de usuário inválido: " + label);
		}
	}

	private Long usuarioId;

	private String acao;

	private String descricao;

	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime dataHora = LocalDateTime.now();

	private String ipEndereco;

	// gts e sets

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public TipoUsuario getTipoUsuario() {
		return tipoUsuario;
	}

	public void setTipoUsuario(TipoUsuario tipoUsuario) {
		this.tipoUsuario = tipoUsuario;
	}

	public Long getUsuarioId() {
		return usuarioId;
	}

	public void setUsuarioId(Long usuarioId) {
		this.usuarioId = usuarioId;
	}

	public String getAcao() {
		return acao;
	}

	public void setAcao(String acao) {
		this.acao = acao;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public LocalDateTime getDataHora() {
		return dataHora;
	}

	public void setDataHora(LocalDateTime dataHora) {
		this.dataHora = dataHora;
	}

	public String getIpEndereco() {
		return ipEndereco;
	}

	public void setIpEndereco(String ipEndereco) {
		this.ipEndereco = ipEndereco;
	}
}