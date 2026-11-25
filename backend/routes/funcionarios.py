from flask import Blueprint, jsonify
from werkzeug.security import generate_password_hash
from dao.funcionario_dao import FuncionarioDAO
from models.funcionario import Funcionario
from routes.auxiliar import validar_json

funcionarios_bp = Blueprint("funcionarios", __name__)
dao = FuncionarioDAO()


@funcionarios_bp.get("")
def listar():
    return jsonify(dao.listar())


@funcionarios_bp.post("")
def cadastrar():
    dados, erro = validar_json(["nome", "cargo", "senha"])
    if erro:
        return erro
    try:
        funcionario = Funcionario(
            nome=dados["nome"],
            cargo=dados["cargo"],
            senha=generate_password_hash(dados["senha"])
        )
        novo_id = dao.inserir({
            "nome": funcionario.nome,
            "cargo": funcionario.cargo,
            "senha": funcionario.senha
        })
        return jsonify({"mensagem": "Funcionário cadastrado", "id_funcionario": novo_id}), 201
    except Exception as e:
        return jsonify({"erro": str(e)}), 400
