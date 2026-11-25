class ItemPedido:
    def __init__(self, id_pedido, id_produto, quantidade, preco_unitario,
                 id_item=None):
        self.id_item = id_item
        self.id_pedido = id_pedido
        self.id_produto = id_produto
        self.quantidade = quantidade
        self.preco_unitario = preco_unitario

    def para_dict(self):
        return {
            "id_item": self.id_item,
            "id_pedido": self.id_pedido,
            "id_produto": self.id_produto,
            "quantidade": self.quantidade,
            "preco_unitario": self.preco_unitario
        }
