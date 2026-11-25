from flask import Blueprint, jsonify
from dao.cliente_dao import ClienteDAO
from routes.auxiliar import validar_json

clientes_bp = Blueprint("clientes", __name__)
dao = ClienteDAO()

@clientes_bp.get("")
def listar():
    return jsonify(dao.listar())

@clientes_bp.post("")
def cadastrar():
    dados, erro = validar_json(["nome", "email"])
    if erro:
        return erro
    try:
        novo_id = dao.inserir({
            "nome": dados["nome"],
            "telefone": dados.get("telefone"),
            "email": dados["email"]
        })
        return jsonify({"mensagem": "Cliente cadastrado", "id_cliente": novo_id}), 201
    except Exception as e:
        return jsonify({"erro": str(e)}), 400
