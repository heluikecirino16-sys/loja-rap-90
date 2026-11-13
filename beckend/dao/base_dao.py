from database import obter_conexao
from serializacao import preparar_dados

class BaseDAO:
    tabela = ""
    campos = ()
    chave = "id"

    def inserir(self, valores):
        conexao = obter_conexao()
        cursor = conexao.cursor()
        try:
            colunas = ", ".join(self.campos)
            marcadores = ", ".join(["%s"] * len(self.campos))
            sql = f"INSERT INTO {self.tabela} ({colunas}) VALUES ({marcadores})"
            cursor.execute(sql, tuple(valores[c] for c in self.campos))
            conexao.commit()
            return cursor.lastrowid
        finally:
            cursor.close()
            conexao.close()

    def listar(self):
        conexao = obter_conexao()
        cursor = conexao.cursor(dictionary=True)
        try:
            cursor.execute(f"SELECT * FROM {self.tabela} ORDER BY {self.chave} DESC")
            return [preparar_dados(linha) for linha in cursor.fetchall()]
        finally:
            cursor.close()
            conexao.close()
