# 📌 Projeto: Sistema de Gerenciamento de Chamados (Help-Desk)

## 🎯 Objetivo do Projeto

Desenvolver uma aplicação de ponta a ponta (front-end e back-end), simulando um sistema de gerenciamento de chamados. O projeto contempla três perfis de usuário:

-   **Administrador:** gerencia usuários, técnicos e chamados.
-   **Técnico:** acompanha, atualiza e resolve chamados.
-   **Cliente:** abre chamados e acompanha seu status.

---

## 🛠️ Tecnologias Utilizadas

| Categoria              | Tecnologias                                     |
| ---------------------- | ----------------------------------------------- |
| **Front-End** | `React.js`, `TailwindCSS`                       |
| **Back-End** | `Node.js` com `Express`                         |
| **Banco de Dados** | `MySQL` / `PostgreSQL`                          |
| **ORM** | `Prisma`                         |
| **Controle de Versão** | `Git` e `GitHub`                                |
| **Containerização** | `Docker`                                        |
| **Outros Recursos** | `Axios`, `JWT (autenticação)`, `bcrypt` (hash) |

---

## 🏗️ Arquitetura da Aplicação

### Camada de Apresentação (Front-End)

-   Interfaces amigáveis para Administrador, Técnico e Cliente.
-   Dashboard com visualização de chamados.
-   Formulário para abertura e atualização de chamados.
-   Sistema de login e autenticação de perfis.

### Camada de Negócio (Back-End)

-   API RESTful construída em Node.js/Express.
-   Rotas separadas por responsabilidades (`auth`, `users`, `tickets`).
-   Regras de negócio para cada tipo de usuário.

### Camada de Dados (Banco de Dados)

-   Modelagem de tabelas para usuários, chamados e interações.
-   Relacionamentos entre Cliente, Técnico e Administrador.
-   Persistência dos chamados com status atualizado em tempo real.

---

## 📊 Funcionalidades Implementadas

### Administrador

-   [x] Cadastrar, editar e remover usuários (clientes e técnicos).
-   [x] Acompanhar todos os chamados.

### Técnico

-   [x] Visualizar chamados atribuídos.
-   [x] Alterar status (em andamento, concluído, cancelado).
-   [x] Inserir observações técnicas.

### Cliente

-   [x] Abrir chamados com descrição e prioridade.
-   [x] Consultar status dos seus chamados.
-   [x] Receber atualizações em tempo real.

---

## 🚀 Demonstração

-   **Fluxo completo:** Login → Abertura de chamado → Atribuição a técnico → Resolução.
-   Interface responsiva e intuitiva.
-   Deploy em ambiente Dockerizado para simular uso real.

---

## 💡 Desafios e Aprendizados

-   Construção da autenticação com diferentes perfis de usuário.
-   Modelagem do banco de dados relacional.
-   Integração entre front-end e back-end via API REST.
-   Aplicação de boas práticas: **SOLID**, **DRY**, **Clean Code**.
