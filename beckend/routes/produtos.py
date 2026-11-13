from flask import Blueprint, jsonify
from dao.produto_dao import ProdutoDAO
from routes.auxiliar import validar_json

produtos_bp = Blueprint("produtos", __name__)
dao = ProdutoDAO()

@produtos_bp.get("")
def listar():
    return jsonify(dao.listar())

@produtos_bp.post("")
def cadastrar():
    dados, erro = validar_json(["nome", "preco"])
    if erro:
        return erro
    try:
        preco = float(dados["preco"])
        estoque = int(dados.get("estoque", 0))
        if preco < 0 or estoque < 0:
            return jsonify({"erro": "Preço e estoque não podem ser negativos"}), 400
        novo_id = dao.inserir({
            "nome": dados["nome"],
            "descricao": dados.get("descricao"),
            "preco": preco,
            "estoque": estoque
        })
        return jsonify({"mensagem": "Produto cadastrado", "id_produto": novo_id}), 201
    except (ValueError, TypeError):
        return jsonify({"erro": "Preço ou estoque inválido"}), 400
    except Exception as e:
        return jsonify({"erro": str(e)}), 400
