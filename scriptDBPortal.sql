CREATE DATABASE site_empregos;
USE site_empregos;

-- Empresas
CREATE TABLE empresas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome_fantasia VARCHAR(255) NOT NULL,
    razao_social VARCHAR(255) UNIQUE NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    porte ENUM('Micro', 'Pequena', 'Media', 'Grande') NOT NULL,
    segmento VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    site VARCHAR(255),
    endereco_rua VARCHAR(255),
    endereco_numero VARCHAR(10),
    endereco_complemento VARCHAR(100),
    endereco_bairro VARCHAR(100),
    endereco_cidade VARCHAR(100),
    endereco_estado VARCHAR(2),
    endereco_cep VARCHAR(10),
    descricao_empresa TEXT,
    logo_url VARCHAR(255),
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Ativa', 'Inativa', 'Pendente') DEFAULT 'Ativa'
);

-- Vagas
CREATE TABLE vagas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empresa_id BIGINT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    requisitos TEXT,
    responsabilidades TEXT,
    salario_min DECIMAL(10, 2),
    salario_max DECIMAL(10, 2),
    tipo_salario ENUM('Por_Hora', 'Por_Mes', 'Por_Ano', 'Negociavel') DEFAULT 'Por_Mes',
    localizacao_cidade VARCHAR(100) NOT NULL,
    localizacao_estado VARCHAR(2) NOT NULL,
    tipo_contrato ENUM('CLT', 'PJ', 'Estágio', 'Temporário', 'Freelancer', 'Trainee') NOT NULL,
    modalidade ENUM('Presencial', 'Remoto', 'Híbrido') NOT NULL,
    setor VARCHAR(100),
    area_profissional VARCHAR(100),
    nivel_experiencia ENUM('Estágio', 'Júnior', 'Pleno', 'Sênior', 'Especialista') NOT NULL,
    beneficios TEXT,
    data_publicacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_expiracao DATE,
    status ENUM('Aberta', 'Fechada', 'Pausada') DEFAULT 'Aberta',
    FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
);

-- Candidatos
CREATE TABLE candidatos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE,
    genero ENUM('Masculino', 'Feminino', 'Outro', 'Prefiro Não Informar'),
    nacionalidade VARCHAR(50),
    endereco_cidade VARCHAR(100),
    endereco_estado VARCHAR(2),
    linkedin_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    resumo_profissional TEXT,
    pretensao_salario_min DECIMAL(10, 2),
    pretensao_salario_max DECIMAL(10, 2),
    disponibilidade_para_viagem BOOLEAN DEFAULT FALSE,
    disponibilidade_para_mudanca BOOLEAN DEFAULT FALSE,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Formação Acadêmica
CREATE TABLE formacao_academica (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    candidato_id BIGINT NOT NULL,
    instituicao VARCHAR(255) NOT NULL,
    curso VARCHAR(255) NOT NULL,
    nivel ENUM('Ensino Médio', 'Técnico', 'Graduação', 'Pós-Graduação', 'Mestrado', 'Doutorado') NOT NULL,
    data_inicio DATE NOT NULL,
    data_conclusao DATE,
    status ENUM('Concluído', 'Em Andamento', 'Interrompido') NOT NULL,
    FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
);

-- Experiência Profissional
CREATE TABLE experiencia_profissional (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    candidato_id BIGINT NOT NULL,
    empresa VARCHAR(255) NOT NULL,
    cargo VARCHAR(255) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    atual_emprego BOOLEAN DEFAULT FALSE,
    descricao_atividades TEXT,
    FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
);

-- Habilidades
CREATE TABLE habilidades (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    habilidade VARCHAR(100) UNIQUE NOT NULL
);

-- Relacionamento Candidato/Habilidade (Muitos-para-Muitos)
CREATE TABLE candidato_habilidades (
    candidato_id BIGINT NOT NULL,
    habilidade_id BIGINT NOT NULL,
    nivel_proficiencia ENUM('Básico', 'Intermediário', 'Avançado', 'Fluente') DEFAULT 'Intermediário',
    PRIMARY KEY (candidato_id, habilidade_id),
    FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE,
    FOREIGN KEY (habilidade_id) REFERENCES habilidades(id) ON DELETE CASCADE
);

-- Candidaturas
CREATE TABLE candidaturas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    candidato_id BIGINT NOT NULL,
    vaga_id BIGINT NOT NULL,
    data_candidatura DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_candidatura ENUM(
        'Candidatura Enviada', 'Em Análise', 'Entrevista Agendada', 'Entrevista Realizada',
        'Teste Aplicado', 'Oferecido', 'Contratado', 'Rejeitado', 'Retirado'
    ) DEFAULT 'Candidatura Enviada',
    observacoes TEXT,
    FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE,
    FOREIGN KEY (vaga_id) REFERENCES vagas(id) ON DELETE CASCADE,
    UNIQUE (candidato_id, vaga_id)
);

-- Log de Atividades
CREATE TABLE log_atividades (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo_usuario ENUM('Empresa', 'Candidato', 'Admin') NOT NULL,
    usuario_id BIGINT NOT NULL,
    acao VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_endereco VARCHAR(45)
);

-- Usuários do Sistema (para autenticação)
CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    tipo_conta ENUM('Candidato', 'Empresa', 'Administrador') NOT NULL,
    referencia_id BIGINT,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultimo_login DATETIME,
    status ENUM('Ativo', 'Inativo', 'Bloqueado') DEFAULT 'Ativo'
);