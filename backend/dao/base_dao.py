from database import obter_conexao
from serializacao import preparar_dados


class BaseDAO:
    tabela = ""
    campos = ()
    chave = "id"

    def inserir(self, valores):
        if not self.tabela or not self.campos:
            raise ValueError("DAO sem tabela ou campos configurados.")

        ausentes = [campo for campo in self.campos if campo not in valores]
        if ausentes:
            raise ValueError(f"Campos não informados: {', '.join(ausentes)}")

        conexao = obter_conexao()
        cursor = conexao.cursor()
        try:
            colunas = ", ".join(self.campos)
            marcadores = ", ".join(["%s"] * len(self.campos))
            sql = f"INSERT INTO {self.tabela} ({colunas}) VALUES ({marcadores})"
            parametros = tuple(valores[campo] for campo in self.campos)
            cursor.execute(sql, parametros)
            conexao.commit()
            return cursor.lastrowid
        except Exception:
            conexao.rollback()
            raise
        finally:
            cursor.close()
            conexao.close()

    def listar(self):
        conexao = obter_conexao()
        cursor = conexao.cursor(dictionary=True)
        try:
            cursor.execute(
                f"SELECT * FROM {self.tabela} ORDER BY {self.chave} DESC"
            )
            return [preparar_dados(linha) for linha in cursor.fetchall()]
        finally:
            cursor.close()
            conexao.close()
