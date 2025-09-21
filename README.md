# Fábrica de Software/2025
- Nome: João Victor Corrêa Palhano
- Matéria: Fabrica de Software 

# 📌 Especificação de Requisitos de Software 
## Projeto: **Esporte na Mão**

---

## 1. Objetivo
Sistema para gerenciamento completo de comércios esportivos, incluindo controle de reservas, gerenciamento de recebimentos e relatórios financeiros.

---

## 2. Escopo
O sistema deverá permitir que administradores, funcionários e clientes realizem operações relacionadas a reservas de modalidades esportivas, controle de pagamentos, relatórios financeiros e gestão de usuários, garantindo segurança, praticidade e escalabilidade.

---

## 3. Requisitos Funcionais

### RF01 - Gerenciar Usuários
- **User Story:** Como administrador, desejo gerenciar usuários (clientes e funcionários) para manter os acessos organizados.  
- **Funcionalidades:** Cadastro, edição, exclusão, ativação/desativação de usuários; definição de perfis (Cliente, Funcionário, Administrador).  

### RF02 - Gerenciar Relatórios Financeiros
- **User Story:** Como usuário, desejo acessar relatórios financeiros para acompanhar o desempenho do meu comércio.  
- **Funcionalidades:** Visualização de fluxo financeiro por período; relatórios de receitas, despesas, lucros e inadimplência; exportação em PDF e Excel.  

### RF03 - Gerenciar Reservas
- **User Story:** Como usuário, desejo cadastrar e gerenciar modalidades esportivas e suas reservas.  
- **Funcionalidades:** Cadastro de modalidades (nome, tipo, capacidade, valor hora, horários disponíveis); gerenciamento de reservas; bloqueio de horários indisponíveis.  

### RF04 - Gerenciar Cancelamentos e Multas
- **User Story:** Como administrador, desejo configurar taxas de cancelamento e multas para controlar inadimplência.  
- **Funcionalidades:** Cadastro, edição e exclusão de taxas de cancelamento e multas por reservas não pagas.  

### RF05 - Autenticação de Usuários
- **User Story:** Como cliente ou funcionário, desejo acessar o sistema de forma segura utilizando login e senha.  
- **Funcionalidades:** Login com CPF e senha definida pelo administrador; bloqueio após X tentativas incorretas; autenticação em dois fatores (opcional).  

### RF06 - Recuperação e Edição de Senha
- **User Story:** Como usuário, desejo redefinir minha senha caso esqueça.  
- **Funcionalidades:** Botão "Esqueci minha senha" na tela de login; redefinição via e-mail/SMS; possibilidade de trocar senha dentro do sistema.  

### RF07 - Efetuar Reserva
- **User Story:** Como cliente, desejo visualizar esportes e horários disponíveis para efetivar reservas.  
- **Funcionalidades:** Pesquisa por modalidade; exibição de agenda disponível; efetivação de reserva com confirmação imediata.  

### RF08 - Pagamentos Online
- **User Story:** Como cliente, desejo pagar minhas reservas diretamente no sistema.  
- **Funcionalidades:** Integração com meios de pagamento (Pix, cartão, boleto); confirmação automática de pagamento; geração de recibo.  

### RF09 - Notificações e Lembretes
- **User Story:** Como cliente, desejo receber lembretes sobre minhas reservas e pagamentos.  
- **Funcionalidades:** Envio de notificações via e-mail/app sobre confirmação, cancelamento, pendência e proximidade de reservas.  

### RF10 - Dashboard Gerencial
- **User Story:** Como administrador, desejo visualizar em um painel as principais informações do negócio.  
- **Funcionalidades:** Indicadores de reservas ativas, cancelamentos, receitas, inadimplência e taxa de ocupação.  

### RF11 - Histórico de Reservas e Pagamentos
- **User Story:** Como cliente, desejo acessar meu histórico de reservas e pagamentos para acompanhar meu consumo.  
- **Funcionalidades:** Listagem de reservas anteriores, status de pagamento e recibos.  

---

## 4. Requisitos Não Funcionais

### RNF01 - Responsividade  
O sistema deve ser responsivo, funcionando em web e mobile.  

### RNF02 - Performance  
O tempo de resposta deve ser inferior a **2 segundos** para consultas comuns.  

### RNF03 - Segurança  
Os dados financeiros e pessoais devem ser armazenados de forma criptografada.  

### RNF04 - Disponibilidade  
O sistema deve estar disponível **99,5%** do tempo.  

### RNF05 - Auditoria  
Todas as ações críticas (cadastro, exclusão, cancelamento, movimentações financeiras) devem ser registradas em log.  

---

## 5. Requisitos de Negócio

### RN01 - Maximizar Eficiência Administrativa  
Reduzir o tempo gasto em tarefas manuais de gestão de reservas, cadastros e finanças.  

### RN02 - Reduzir Inadimplência  
Oferecer mecanismos de cobrança, aplicação de multas e integração com meios de pagamento.  

### RN03 - Aumentar Taxa de Ocupação  
Disponibilizar ferramentas que incentivem clientes a realizar reservas (ex.: lembretes, agenda online, facilidade de pagamento).  

### RN04 - Garantir Segurança de Dados  
Assegurar confidencialidade de informações de clientes, funcionários e transações financeiras.  

### RN05 - Melhorar Experiência do Cliente  
Fornecer acesso simples, intuitivo e rápido às reservas, pagamentos e históricos, tanto via web quanto mobile.  

### RN06 - Disponibilizar Informações Estratégicas  
Gerar relatórios e dashboards que apoiem a tomada de decisão do administrador.  

### RN07 - Escalabilidade do Negócio  
Permitir que novos esportes, filiais ou unidades sejam cadastrados sem necessidade de reformulação estrutural.  

### RN08 - Conformidade Legal  
Seguir legislações aplicáveis (LGPD, normas contábeis e fiscais).  

---

## Aula 05/08

- JRE - Java Run Time Enviroment
    - Ambiente mínimo para executar um programa Java
    - JVM - Java Virtual Machine
- JDK - Java Develoment Kit
 - Ambiente de desenvolvimento (javac.exe) compilador

 - COMPILAÇÃO
  1) Escreve um programa em Java (arquivo.java)
  2) Compilação aquivo.java -> javac.exe -> bytecode
  arquivo.class
 - EXECUÇÃO
 3) Passar .class -> java.exe (JVM) -> Ling Máquina

---
## Aula 12/08

User Stories criadas junto dos requisitos;

## Diagrama de Classes

```mermaid 
---
title: Diagrama de Entidades
---
classDiagram
    Reserva "*" --> "1" Cliente
    Reserva "*" --> "1" ModalidadeEsportiva
    Reserva "*" --> "1" Quadra

    namespace entity {
      class Cliente{
        -id : long
        -nome : String
        -cpf : String
        -telefone : String
        -email : String
        -dataNascimento: Date

        +getId() long
        +setId(id:long) void
        +getNome() String
        +setNome(nome:String) void
        +getCpf()  String
        +setCpf(cpf:String) void
        +getTelefone() String
        +setTelefone(telefone:String) void
        +getEmail() String
        +setEmail(email:String) void
        +getDataNascimento() Date
        +setDataNascimento(dataNascimento:Date) void
      }
      class Reserva{
        -id : long
        -dataHoraInicio : DateTime
        -dataHoraFim : DateTime
        -valorTotal : Double
        -status : StatusReserva

        +getId() long
        +setId(id:long) void
        +getDataHoraInicio() DateTime
        +setDataHoraInicio(dataHoraInicio:DateTime) void
        +getDataHoraFim() DateTime
        +setDataHoraFim(dataHoraFim:DateTime) void
        +getValorTotal() Double
        +setValorTotal(valorTotal:Double) void
        +getStatus() StatusReserva
        +setStatus(status:StatusReserva) void
      }
      class ModalidadeEsportiva {
        -id : long
        -nome : String

        +getId() long
        +setId(id:long) void
        +getNome() String
        +setNome(nome:String) void
      }
      class Quadra {
        -id : long
        -nome : String

        +getId() long
        +setId(id:long) void
        +getNome() String
        +setNome(nome:String) void
      }
    }
