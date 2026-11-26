from flask import Blueprint, jsonify
from dao.item_pedido_dao import ItemPedidoDAO
from routes.auxiliar import validar_json

itens_bp = Blueprint("itens_pedido", __name__)
dao = ItemPedidoDAO()

@itens_bp.get("")
def listar():
    return jsonify(dao.listar())

@itens_bp.post("")
def cadastrar():
    dados, erro = validar_json(["quantidade", "preco_unitario", "id_pedido", "id_produto"])
    if erro:
        return erro
    try:
        quantidade = int(dados["quantidade"])
        preco = float(dados["preco_unitario"])
        if quantidade <= 0 or preco < 0:
            return jsonify({"erro": "Quantidade deve ser positiva e preço não negativo"}), 400
        novo_id = dao.inserir({
            "quantidade": quantidade,
            "preco_unitario": preco,
            "id_pedido": int(dados["id_pedido"]),
            "id_produto": int(dados["id_produto"])
        })
        return jsonify({"mensagem": "Item do pedido cadastrado", "id_item": novo_id}), 201
    except (ValueError, TypeError):
        return jsonify({"erro": "Dados do item inválidos"}), 400
    except Exception as e:
        return jsonify({"erro": str(e)}), 400
