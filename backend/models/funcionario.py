class Funcionario:
    def __init__(self, nome, cargo, senha, id_funcionario=None):
        self.id_funcionario = id_funcionario
        self.nome = nome
        self.cargo = cargo
        self.senha = senha

    def para_dict(self):
        return {
            "id_funcionario": self.id_funcionario,
            "nome": self.nome,
            "cargo": self.cargo
        }
