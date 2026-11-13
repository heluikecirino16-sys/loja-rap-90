from dao.base_dao import BaseDAO

class ItemPedidoDAO(BaseDAO):
    tabela = "itens_pedido"
    chave = "id_item"
    campos = ("quantidade", "preco_unitario", "id_pedido", "id_produto")
