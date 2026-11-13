from dao.base_dao import BaseDAO

class ClienteDAO(BaseDAO):
    tabela = "clientes"
    chave = "id_cliente"
    campos = ("nome", "telefone", "email")
