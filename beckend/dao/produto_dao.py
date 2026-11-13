from dao.base_dao import BaseDAO

class ProdutoDAO(BaseDAO):
    tabela = "produtos"
    chave = "id_produto"
    campos = ("nome", "descricao", "preco", "estoque")
