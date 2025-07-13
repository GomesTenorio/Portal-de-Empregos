# DiversaWork - Frontend Simplificado

Plataforma de empregos inclusiva para a comunidade LGBTQIA+.

## Estrutura do Projeto

```
src/
├── app/
│   ├── components/          # Todos os componentes da aplicação
│   │   ├── home/           # Página inicial
│   │   ├── jobs/           # Componentes relacionados a vagas
│   │   │   ├── job-list/   # Listagem de vagas
│   │   │   └── job-detail/ # Detalhes da vaga
│   │   ├── auth/           # Componentes de autenticação
│   │   │   ├── login/      # Login
│   │   │   ├── register-candidate/ # Registro de candidato
│   │   │   └── register-company/   # Registro de empresa
│   │   ├── candidate/      # Componentes do candidato
│   │   └── company/        # Componentes da empresa
│   ├── models/             # Modelos de dados
│   ├── services/           # Serviços da aplicação
│   └── layout/             # Componentes de layout (header, footer)
├── environments/           # Configurações de ambiente
└── styles.scss            # Estilos globais
```

## Funcionalidades Implementadas

### Para Visitantes (sem login)
- ✅ Visualizar página inicial
- ✅ Listar vagas disponíveis
- ✅ Buscar vagas com filtros (título, localização, salário, tipo de contrato)
- ✅ Ver detalhes de uma vaga específica

### Para Candidatos
- ✅ Cadastro com informações de diversidade (opcional)
- ✅ Login
- ✅ Candidatar-se a vagas (requer login)
- 🔄 Dashboard do candidato (em desenvolvimento)

### Para Empresas
- ✅ Cadastro de empresa
- ✅ Login
- 🔄 Dashboard da empresa (em desenvolvimento)
- 🔄 Cadastro de vagas (em desenvolvimento)

## Como executar

1. Instalar dependências:
```bash
npm install
```

2. Executar em modo de desenvolvimento:
```bash
npm start
```

3. Acessar: http://localhost:4200

## Tecnologias Utilizadas

- Angular 20
- TypeScript
- SCSS
- Standalone Components
- Reactive Forms
- HTTP Client

## Observações

- O projeto foi estruturado de forma simples e organizada
- Todos os componentes estão na pasta `components`
- Os serviços estão na pasta `services`
- Os modelos estão na pasta `models`
- Layout responsivo para desktop e mobile
- Integração com backend via API REST

