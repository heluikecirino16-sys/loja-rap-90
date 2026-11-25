# RAP 90s STORE — Back-end Python

Back-end de uma loja temática de rap dos anos 90, desenvolvido com Python, Programação Orientada a Objetos (POO), Flask e MySQL. A API permite cadastrar e consultar clientes, funcionários, produtos, pedidos e itens de pedido. Não depende de um front-end pronto.

## Estrutura

- `app.py`: inicializa a API Flask e registra as rotas.
- `models/`: classes de domínio (Cliente, Funcionario, Produto, Pedido e ItemPedido).
- `dao/`: classes DAO que executam INSERT e SELECT no MySQL.
- `routes/`: endpoints GET e POST da API.
- `database.py`: conexão com o MySQL.
- `serializacao.py`: conversão de datas e valores Decimal para JSON.
- `rap90s_store.sql`: criação do banco e das tabelas.
- `requirements.txt`: dependências.

## Como executar no XAMPP

1. Inicie o MySQL pelo XAMPP.
2. Abra `http://localhost/phpmyadmin`.
3. Importe o arquivo `rap 90.SQL` que está na pasta `data base` do pacote (ou `rap90s_store.sql`, nesta pasta).
4. Abra um terminal dentro da pasta `beckend`.
5. (Recomendado) Crie e ative um ambiente virtual:
   - Windows: `py -m venv .venv`
   - PowerShell: `.venv\Scripts\Activate.ps1`
6. Instale as bibliotecas: `pip install -r requirements.txt`.
7. Execute: `python app.py`.
8. A API ficará em `http://127.0.0.1:5000`.

## Configuração do banco

O padrão para XAMPP é host `localhost`, usuário `root`, senha vazia e banco `rap90s_store`. Se necessário, configure as variáveis de ambiente `DB_HOST`, `DB_USER`, `DB_PASSWORD` e `DB_NAME`.

## Rotas disponíveis

| Método | Rota | Ação |
|---|---|---|
| GET | `/` | Verifica se a API está ativa |
| GET / POST | `/api/clientes` | Lista / cadastra clientes |
| GET / POST | `/api/funcionarios` | Lista / cadastra funcionários |
| GET / POST | `/api/produtos` | Lista / cadastra produtos |
| GET / POST | `/api/pedidos` | Lista / cadastra pedidos |
| GET / POST | `/api/itens-pedido` | Lista / cadastra itens de pedido |

## Exemplo de cadastro (POST)

Use um cliente HTTP, como Thunder Client ou Postman, com `Content-Type: application/json`.

Cadastro de produto em `POST /api/produtos`:

```json
{
  "nome": "Camiseta Rap 90s",
  "descricao": "Camiseta temática",
  "preco": 79.90,
  "estoque": 15
}
```

Consulta: abra `GET http://127.0.0.1:5000/api/produtos`.

## Observações

- Os pedidos precisam de IDs de cliente e funcionário já cadastrados.
- Os itens de pedido precisam de IDs de pedido e produto existentes.
- As senhas de funcionários são armazenadas com hash e não são retornadas na listagem.
- O escopo atual contempla cadastro e consulta (POST e GET), conforme a etapa do projeto.
