from dao.base_dao import BaseDAO

class PedidoDAO(BaseDAO):
    tabela = "pedidos"
    chave = "id_pedido"
    campos = ("status", "total", "id_cliente", "id_funcionario")
