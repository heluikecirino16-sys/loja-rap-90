from dao.base_dao import BaseDAO
from database import obter_conexao


class FuncionarioDAO(BaseDAO):
    tabela = "funcionarios"
    chave = "id_funcionario"
    campos = ("nome", "cargo", "senha")

    def listar(self):
        conexao = obter_conexao()
        cursor = conexao.cursor(dictionary=True)
        try:
            cursor.execute(
                "SELECT id_funcionario, nome, cargo "
                "FROM funcionarios ORDER BY id_funcionario DESC"
            )
            return cursor.fetchall()
        finally:
            cursor.close()
            conexao.close()
