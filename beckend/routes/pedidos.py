from flask import Blueprint, jsonify
from dao.pedido_dao import PedidoDAO
from routes.auxiliar import validar_json

pedidos_bp = Blueprint("pedidos", __name__)
dao = PedidoDAO()

@pedidos_bp.get("")
def listar():
    return jsonify(dao.listar())

@pedidos_bp.post("")
def cadastrar():
    dados, erro = validar_json(["id_cliente", "id_funcionario"])
    if erro:
        return erro
    try:
        novo_id = dao.inserir({
            "status": dados.get("status", "Pendente"),
            "total": float(dados.get("total", 0)),
            "id_cliente": int(dados["id_cliente"]),
            "id_funcionario": int(dados["id_funcionario"])
        })
        return jsonify({"mensagem": "Pedido cadastrado", "id_pedido": novo_id}), 201
    except (ValueError, TypeError):
        return jsonify({"erro": "Valores do pedido inválidos"}), 400
    except Exception as e:
        return jsonify({"erro": str(e)}), 400
