
# Avaliação – Sistema de Gestão de Produção e Estoque

## 📌 Sobre a atividade

Esta atividade tem como objetivo desenvolver um **sistema Web Full Stack** para gerenciar a produção e o estoque de produtos fabricados em MDF.

O sistema deverá permitir o cadastro e gerenciamento de produtos, controle de estoque, registro de pedidos e registro de produtos fabricados. A proposta utiliza o conceito de **Just in Time**, trabalhando com um estoque mínimo para evitar desperdícios e produzir de acordo com a demanda.

Além do desenvolvimento do sistema, a atividade contempla as etapas de **análise de requisitos, modelagem do banco de dados, implementação, testes e documentação**.

---

## 🎯 Objetivo

Desenvolver um sistema informatizado capaz de auxiliar um fabricante de produtos em MDF no controle de sua produção e estoque.

O sistema deverá possibilitar:

- Cadastro de produtos;
- Consulta, edição e exclusão de produtos;
- Controle da quantidade em estoque;
- Definição de estoque mínimo;
- Registro de produtos fabricados;
- Registro de pedidos e saídas de estoque;
- Identificação do usuário responsável por cada ação;
- Alertas quando o estoque estiver abaixo do mínimo;
- Acompanhamento das movimentações de produção e pedidos.

---

# 1. Lista de Requisitos Funcionais

## [RF01] Interface de Autenticação
- **[RF01.1]** Solicitar e-mail e senha do usuário.
- **[RF01.2]** Validar credenciais do usuário no banco de dados.
- **[RF01.3]** Redirecionar para a interface principal em caso de sucesso.
- **[RF01.4]** Informar o motivo da falha em caso de erro de autenticação.

---

## [RF02] Interface Principal do Sistema
- **[RF02.1]** Exibir nome do usuário logado.
- **[RF02.2]** Disponibilizar opção de logout, redirecionando para login.
- **[RF02.3]** Acessar interface de cadastro de produto.
- **[RF02.4]** Acessar interface de gestão de produção (*Just in Time*).

---

## [RF03] Cadastro de Produto
- **[RF03.1]** Listar produtos cadastrados em tabela ao carregar a interface.
- **[RF03.2]** Implementar campo de busca com atualização dinâmica da listagem.
- **[RF03.3]** Inserir novo produto no banco de dados.
- **[RF03.4]** Editar produto existente no banco de dados.
- **[RF03.5]** Excluir produto existente no banco de dados.
- **[RF03.6]** Validar dados inseridos (criação/edição) e exibir alertas em caso de erro.
- **[RF03.7]** Retornar para a interface principal.

---

## [RF04] Gestão de Produção (Just in Time)
- **[RF04.1]** Listar produtos cadastrados em ordem alfabética.
- **[RF04.2]** Selecionar produto para movimentação de estoque (pedido ou fabricado).
- **[RF04.3]** Inserir dados da movimentação (entrada ou saída).
- **[RF04.4]** Atualizar automaticamente a quantidade em estoque.
- **[RF04.5]** Emitir alerta em caso de estoque abaixo do mínimo configurado.

---

## [RF05] Registro de Ações do Usuário
- **[RF05.1]** Registrar qual usuário realizou cada ação (cadastro, edição, exclusão, movimentação de estoque).
- **[RF05.2]** Permitir consulta ao histórico de ações realizadas.
---

# 2. Diagrama Entidade-Relacionamento (DER)

O Diagrama Entidade-Relacionamento (DER) representa a estrutura do banco de dados do sistema, apresentando suas entidades, atributos, chaves primárias, chaves estrangeiras e relacionamentos.

### DER do sistema

![Diagrama Entidade-Relacionamento](docs/Mdf.drawio.png)
---

# 3. Banco de Dados

O banco de dados utilizado no projeto foi desenvolvido com **MariaDB** e possui o nome:

`mdf`

Para realizar a comunicação entre o sistema e o banco de dados, foi utilizado o **Prisma ORM**.

O arquivo utilizado é:

- `schema.prisma` — responsável pela definição das tabelas, campos e relacionamentos do banco de dados.

Os dados utilizados no sistema foram inseridos diretamente no banco de dados MariaDB.
---

# 4. Interface de Autenticação

O sistema deverá possuir uma interface de login para autenticação dos usuários.

### Funcionalidades:

- Campo para informar o e-mail;
- Campo para informar a senha;
- Validação das credenciais;
- Mensagem informando o motivo da falha de autenticação;
- Redirecionamento para a tela principal após o login realizado com sucesso;
- Retorno à tela de login quando a autenticação falhar.

Não é necessário implementar o cadastro de novos usuários.

---

# 5. Interface Principal

A interface principal será responsável por centralizar o acesso às funcionalidades do sistema.

Ela deverá:

- Exibir o nome do usuário autenticado;
- Possuir uma opção de logout;
- Permitir acesso ao cadastro de produtos;
- Permitir acesso à gestão de produção;
- Possuir um layout organizado e adequado ao sistema.

---

# 6. Interface de Cadastro de Produto

A interface de cadastro de produtos deverá permitir o gerenciamento dos produtos armazenados no banco de dados.

Cada produto deverá possuir informações relacionadas ao seu gerenciamento, como:

- Nome;
- Descrição;
- Custo;
- Quantidade em estoque;
- Estoque mínimo.

### Funcionalidades:

- Listagem automática dos produtos;
- Exibição dos dados em uma tabela;
- Busca de produtos;
- Cadastro de novos produtos;
- Edição de produtos;
- Exclusão de produtos;
- Validação dos campos;
- Alertas para informações inválidas ou não preenchidas;
- Retorno à interface principal.

---

# 7. Interface de Gestão de Produção

A interface de gestão de produção será utilizada para controlar as movimentações do estoque.

Os produtos deverão ser apresentados em **ordem alfabética**, utilizando um algoritmo de ordenação.

O usuário deverá selecionar um produto e informar o tipo de movimentação:

### Fabricado

Representa uma entrada de produtos no estoque.

**Quantidade em estoque = quantidade atual + quantidade fabricada**

### Pedido

Representa uma saída de produtos do estoque.

**Quantidade em estoque = quantidade atual - quantidade solicitada**

Após cada movimentação, o sistema deverá verificar automaticamente se o estoque ficou abaixo do estoque mínimo configurado.

Caso isso aconteça, deverá ser exibido um **alerta ao usuário**.

Também deverá ser registrado qual usuário realizou a movimentação.

---

# 8. Testes de Software

Deverão ser elaborados casos de teste para verificar o funcionamento dos requisitos do sistema.

Cada caso de teste deverá conter:

- **ID do Caso de Teste**
- **Requisito Funcional**
- **Descrição**
- **Pré-condições**
- **Passos para execução**
- **Resultado Esperado**

### Exemplo

**ID do Caso de Teste:** CT01  
**Requisito Funcional:** RF01.1  
**Descrição:** Verificar se a interface de autenticação solicita e-mail e senha.  
**Pré-condições:** O sistema deve estar acessível.

**Passos:**

1. Acessar a tela de login.
2. Verificar os campos disponíveis.
3. Conferir se existem os campos de e-mail e senha.

**Resultado Esperado:**  
Os campos de e-mail e senha devem estar visíveis e disponíveis para preenchimento.

### Ferramentas de teste

**Testes manuais:**

- Insomnia;
- Google Chrome;
---

# 9. Requisitos de Infraestrutura

A documentação deverá apresentar as tecnologias utilizadas durante o desenvolvimento do sistema.

### 9.1 Sistema Gerenciador de Banco de Dados

Informar:

- MariaDB 10.6 (utilizado em conjunto com Prisma ORM para gerenciamento do banco de dados) 

### 9.2 Linguagem de programação

Informar:

- Node.js (JavaScript) versão 18.x 

### 9.3 Sistema operacional

Informar:

- Windows 10 Pro – versão 22H2 

---

# 📋 Contextualização

Um fabricante local de produtos em MDF enfrenta dificuldades para controlar sua produção devido à ausência de um sistema informatizado.

Atualmente, os pedidos são realizados manualmente, podendo causar atrasos, erros na produção e dificuldades para acompanhar as demandas dos clientes e revendedores.

Para solucionar esses problemas, será desenvolvido um sistema de gerenciamento baseado no conceito de **Just in Time**, permitindo trabalhar com um estoque mínimo e produzir os produtos de acordo com a demanda.

O sistema permitirá centralizar as informações de produtos, pedidos, produção e estoque, tornando o processo mais organizado e facilitando o acompanhamento das movimentações realizadas.

---

# ✅ Entregas

Ao final da atividade, deverão ser entregues:

- [ ] Lista de requisitos funcionais;
- [ ] Diagrama Entidade-Relacionamento (DER);
- [ ] Script de criação e população do banco de dados;
- [ ] Interface de autenticação;
- [ ] Interface principal;
- [ ] Interface de cadastro de produtos;
- [ ] Interface de gestão de produção;
- [ ] Documentação dos casos de teste;
- [ ] Lista de ferramentas e ambientes de teste;
- [ ] Lista de requisitos de infraestrutura.

---

# 💻 Tecnologias

As tecnologias utilizadas no desenvolvimento deverão ser documentadas conforme o ambiente escolhido para o projeto.

Exemplo:

- **Frontend:** HTML, CSS e JavaScript;
- **Backend:** Node.js e Express;
- **Banco de dados:** MySQL;
- **ORM:** Prisma;
- **Testes de API:** Insomnia;
- **Navegador:** Google Chrome;
- **Editor de código:** Visual Studio Code.

---

# 🎯 Objetivo da avaliação

A avaliação tem como objetivo verificar a capacidade técnica de **planejar, desenvolver, testar e documentar** um sistema de informação simples, aplicando boas práticas de desenvolvimento de software.

O projeto contempla as principais etapas do desenvolvimento de um sistema:

**Análise de requisitos → Modelagem → Desenvolvimento → Testes → Documentação**

