# Wireframe — RAP 90s STORE

Wireframe de baixa fidelidade que apresenta a organização das telas principais antes da implementação visual.

## Tela inicial

```text
+------------------------------------------------------+
| RAP 90s STORE                                        |
| Início | Produtos | Clientes | Funcionários | Pedidos|
+------------------------------------------------------+
|                                                      |
|          ESTILO • CULTURA • ATITUDE                  |
|       O estilo do rap nunca sai de moda.             |
|             [ EXPLORAR PRODUTOS ]                    |
|                                                      |
+------------------------------------------------------+
| GERENCIAMENTO DA LOJA                                |
| +-------------+ +-------------+ +----------------+  |
| | Produtos    | | Clientes    | | Funcionários    |  |
| +-------------+ +-------------+ +----------------+  |
| | Pedidos     | | Itens pedido|                    |
| +-------------+ +-------------+                    |
+------------------------------------------------------+
| Consulta de CEP (ViaCEP)                             |
| [ Digite o CEP                    ] [Consultar CEP]  |
+------------------------------------------------------+
| Status da conexão com a API                          |
+------------------------------------------------------+
| Rodapé                                               |
+------------------------------------------------------+
```

## Telas de cadastro

Todas as telas administrativas seguem o mesmo padrão: cabeçalho com navegação, título, formulário de cadastro, botão de envio e tabela com os registros existentes.

- **Produtos:** nome, descrição, preço e estoque.
- **Clientes:** nome, e-mail e telefone.
- **Funcionários:** nome, cargo e senha.
- **Pedidos:** cliente, funcionário, status e total.
- **Itens do pedido:** pedido, produto, quantidade e preço unitário.

## Fluxo principal

1. O usuário abre a página inicial.
2. Escolhe uma área pelo menu ou pelos cartões.
3. Preenche o formulário de cadastro.
4. O JavaScript envia os dados em JSON para a API Flask.
5. A rota valida os dados e chama o DAO.
6. O DAO grava no MySQL e a tela atualiza a tabela.
