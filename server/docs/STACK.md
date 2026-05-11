# 🚀 Backend — CourseSphere

Abaixo está a listagem detalhada das tecnologias utilizadas no desenvolvimento da plataforma (backend), organizadas por camada técnica.

---

# Backend (Server)

A arquitetura do backend segue o padrão **RESTful API**, priorizando escalabilidade, separação de responsabilidades e organização da lógica de negócio.

---

## Estrutura do Servidor

| Tecnologia | Descrição |
| :--- | :--- |
| **Ruby on Rails (API Mode)** | Framework backend para gerenciamento de recursos e regras de negócio |
| **PostgreSQL** | Banco de dados relacional robusto e escalável |

---

## Serialização

| Tecnologia | Descrição |
| :--- | :--- |
| **Representers** | Controle fino da estrutura JSON enviada ao frontend |

---

## Autenticação

| Tecnologia | Descrição |
| :--- | :--- |
| **BCrypt** | Hashing seguro de senhas utilizando `password_digest` |

---

# Infraestrutura & Ferramentas

---

## Containerização

| Tecnologia | Descrição |
| :--- | :--- |
| **Docker** | Containerização da aplicação |
| **Docker Compose** | Orquestração dos serviços do ambiente |

---

## Qualidade de Código

| Tecnologia | Descrição |
| :--- | :--- |
| **ESLint** | Padronização e análise estática de código JavaScript/TypeScript |
| **RuboCop** | Linter e formatter para aplicações Ruby |

---