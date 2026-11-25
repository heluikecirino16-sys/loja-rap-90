class Cliente:
    def __init__(self, nome, email, telefone=None, id_cliente=None):
        self.id_cliente = id_cliente
        self.nome = nome
        self.telefone = telefone
        self.email = email

    def para_dict(self):
        return {
            "id_cliente": self.id_cliente,
            "nome": self.nome,
            "telefone": self.telefone,
            "email": self.email
        }
