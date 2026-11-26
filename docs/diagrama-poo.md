# Diagrama de Programação Orientada a Objetos — RAP 90s STORE

O diagrama abaixo representa as classes utilizadas no back-end. As classes de entidade guardam os dados; as classes DAO fazem a comunicação com o MySQL.

```mermaid
classDiagram
    class Cliente {
        +int id_cliente
        +str nome
        +str email
        +str telefone
        +para_dict()
    }
    class Funcionario {
        +int id_funcionario
        +str nome
        +str cargo
        +str senha
        +para_dict()
    }
    class Produto {
        +int id_produto
        +str nome
        +str descricao
        +float preco
        +int estoque
        +para_dict()
    }
    class Pedido {
        +int id_pedido
        +int id_cliente
        +int id_funcionario
        +str status
        +float total
        +para_dict()
    }
    class ItemPedido {
        +int id_item
        +int id_pedido
        +int id_produto
        +int quantidade
        +float preco_unitario
        +para_dict()
    }
    class BaseDAO {
        +inserir(valores)
        +listar()
    }
    class ClienteDAO
    class FuncionarioDAO
    class ProdutoDAO
    class PedidoDAO
    class ItemPedidoDAO

    BaseDAO <|-- ClienteDAO
    BaseDAO <|-- FuncionarioDAO
    BaseDAO <|-- ProdutoDAO
    BaseDAO <|-- PedidoDAO
    BaseDAO <|-- ItemPedidoDAO
    ClienteDAO ..> Cliente
    FuncionarioDAO ..> Funcionario
    ProdutoDAO ..> Produto
    PedidoDAO ..> Pedido
    ItemPedidoDAO ..> ItemPedido
    Pedido --> Cliente
    Pedido --> Funcionario
    ItemPedido --> Pedido
    ItemPedido --> Produto
```

## Conceitos de POO usados

- **Classes e objetos:** cada entidade tem uma classe própria.
- **Encapsulamento:** os dados e os métodos relacionados ficam organizados dentro das classes.
- **Herança:** os DAOs específicos herdam métodos comuns de `BaseDAO`.
- **Abstração:** a classe `BaseDAO` esconde detalhes repetidos de INSERT e SELECT.
- **Associação:** pedidos relacionam clientes e funcionários; itens relacionam pedidos e produtos.
