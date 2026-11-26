class Pedido:
    def __init__(self, id_cliente, id_funcionario, status="Pendente",
                 total=0, id_pedido=None):
        self.id_pedido = id_pedido
        self.id_cliente = id_cliente
        self.id_funcionario = id_funcionario
        self.status = status
        self.total = total

    def para_dict(self):
        return {
            "id_pedido": self.id_pedido,
            "id_cliente": self.id_cliente,
            "id_funcionario": self.id_funcionario,
            "status": self.status,
            "total": self.total
        }
