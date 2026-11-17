# 🎤 RAP 90s STORE

## Sobre o projeto

A **RAP 90s STORE** é uma loja virtual inspirada na cultura hip-hop e no rap dos anos 1990. O projeto foi desenvolvido como atividade escolar, com o objetivo de aplicar conhecimentos de programação, Programação Orientada a Objetos (POO), banco de dados e desenvolvimento back-end.

O sistema permite realizar operações de cadastro e consulta de clientes, funcionários, produtos, pedidos e itens dos pedidos.

## 🎯 Objetivos

- Desenvolver um sistema utilizando Python.
- Aplicar os conceitos de Programação Orientada a Objetos (POO).
- Implementar classes e DAOs.
- Criar uma API utilizando Flask.
- Conectar o sistema a um banco de dados MySQL.
- Realizar operações de cadastro e consulta de informações.

## 🛠️ Tecnologias utilizadas

- **Python:** desenvolvimento do back-end.
- **Flask:** criação das rotas da API.
- **Flask-CORS:** comunicação entre front-end e back-end.
- **MySQL:** armazenamento dos dados.
- **XAMPP:** gerenciamento do servidor MySQL local.
- **phpMyAdmin:** administração do banco de dados.
- **Git e GitHub:** versionamento e armazenamento do projeto.

## 📁 Estrutura do projeto

```text
RAP-90s-STORE/
│
├── beckend/
│   ├── app.py
│   ├── database.py
│   ├── serializacao.py
│   ├── requirements.txt
│   ├── rap90s_store.sql
│   │
│   ├── models/
│   │   ├── cliente.py
│   │   ├── funcionario.py
│   │   ├── produto.py
│   │   ├── pedido.py
│   │   └── item_pedido.py
│   │
│   ├── dao/
│   │   ├── base_dao.py
│   │   ├── cliente_dao.py
│   │   ├── funcionario_dao.py
│   │   ├── produto_dao.py
│   │   ├── pedido_dao.py
│   │   └── item_pedido_dao.py
│   │
│   └── routes/
│       ├── clientes.py
│       ├── funcionarios.py
│       ├── produtos.py
│       ├── pedidos.py
│       ├── itens_pedido.py
│       └── auxiliar.py
│
├── diagrama/
│   ├── modelo_conceitual.png
│   ├── modelo_logico.png
│   ├── modelo_fisico.png
│   └── arquivos .dot
│
├── data base/
│   └── rap 90.SQL
│
└── README.md
```

## 🗄️ Banco de dados

O projeto utiliza o banco de dados **rap90s_store**, desenvolvido em MySQL.

O banco possui cinco tabelas principais:

| Tabela | Descrição |
|---|---|
| clientes | Armazena os dados dos clientes. |
| funcionarios | Armazena os dados dos funcionários. |
| produtos | Armazena os produtos da loja. |
| pedidos | Registra os pedidos realizados. |
| itens_pedido | Armazena os produtos pertencentes a cada pedido. |

O arquivo SQL para criação do banco está disponível na pasta `data base`.

## ⚙️ Como executar o projeto

### 1. Instalar os programas necessários

- Python
- XAMPP
- MySQL
- phpMyAdmin

### 2. Configurar o banco de dados

1. Abra o XAMPP.
2. Inicie o serviço MySQL.
3. Acesse o phpMyAdmin pelo navegador.
4. Importe o arquivo `data base/rap 90.SQL`.
5. Verifique se o banco `rap90s_store` foi criado.

### 3. Instalar as dependências

Abra o terminal dentro da pasta `beckend` e execute:

```bash
pip install -r requirements.txt
```

### 4. Executar o servidor

No terminal, dentro da pasta `beckend`, execute:

```bash
python app.py
```

O servidor Flask será iniciado no endereço local configurado no arquivo `app.py`.

## 🔌 Rotas da API

A API disponibiliza operações GET para consultas e POST para cadastros.

| Recurso | GET | POST |
|---|---|---|
| Clientes | Consultar clientes | Cadastrar cliente |
| Funcionários | Consultar funcionários | Cadastrar funcionário |
| Produtos | Consultar produtos | Cadastrar produto |
| Pedidos | Consultar pedidos | Cadastrar pedido |
| Itens do pedido | Consultar itens | Cadastrar item |

As rotas e seus endereços completos podem ser consultados nos arquivos da pasta `routes`.

## 📊 Modelagem do sistema

A pasta `diagrama` contém três modelos utilizados no desenvolvimento:

- **Modelo conceitual:** representa as entidades e seus relacionamentos.
- **Modelo lógico:** apresenta a organização das tabelas e seus relacionamentos.
- **Modelo físico:** representa a estrutura do banco de dados implementada em MySQL.

## 💻 Programação Orientada a Objetos

O back-end foi organizado utilizando os princípios de POO:

- **Classes:** representam as entidades do sistema.
- **DAOs:** responsáveis pelas operações de comunicação com o banco de dados.
- **Rotas Flask:** recebem as requisições da API e executam as operações solicitadas.
- **Separação de responsabilidades:** organização do código em diferentes arquivos e pastas.

## 👨‍🎓 Projeto escolar

Projeto desenvolvido com finalidade educacional, aplicando os conhecimentos estudados durante as aulas de programação, banco de dados e desenvolvimento de sistemas.

**Projeto:** RAP 90s STORE  
**Tema:** Loja virtual inspirada no rap dos anos 1990  
**Linguagem principal:** Python  
**Banco de dados:** MySQL
