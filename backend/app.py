from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
import json
import re

from flask import Flask, jsonify
from flask_cors import CORS

from routes.clientes import clientes_bp
from routes.funcionarios import funcionarios_bp
from routes.produtos import produtos_bp
from routes.pedidos import pedidos_bp
from routes.itens_pedido import itens_bp

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False
CORS(app)

app.register_blueprint(clientes_bp, url_prefix="/api/clientes")
app.register_blueprint(funcionarios_bp, url_prefix="/api/funcionarios")
app.register_blueprint(produtos_bp, url_prefix="/api/produtos")
app.register_blueprint(pedidos_bp, url_prefix="/api/pedidos")
app.register_blueprint(itens_bp, url_prefix="/api/itens-pedido")


@app.get("/")
def inicio():
    return jsonify({
        "projeto": "RAP 90s STORE",
        "mensagem": "API Flask funcionando",
        "rotas": ["/api/clientes", "/api/funcionarios",
                  "/api/produtos", "/api/pedidos",
                  "/api/itens-pedido", "/api/cep/<cep>"]
    })


@app.get("/api/cep/<cep>")
def consultar_cep(cep):
    cep = re.sub(r"\D", "", cep)
    if len(cep) != 8:
        return jsonify({"erro": "O CEP deve conter 8 números."}), 400

    try:
        requisicao = Request(
            f"https://viacep.com.br/ws/{cep}/json/",
            headers={"User-Agent": "Rap90Store/1.0"}
        )
        with urlopen(requisicao, timeout=5) as resposta:
            dados = json.loads(resposta.read().decode("utf-8"))

        if dados.get("erro"):
            return jsonify({"erro": "CEP não encontrado."}), 404

        return jsonify(dados)
    except (HTTPError, URLError, TimeoutError, ValueError) as erro:
        app.logger.warning("Falha na consulta ViaCEP: %s", erro)
        return jsonify({"erro": "Não foi possível consultar o CEP agora."}), 502


@app.errorhandler(404)
def nao_encontrado(_):
    return jsonify({"erro": "Rota não encontrada."}), 404


@app.errorhandler(500)
def erro_interno(_):
    return jsonify({"erro": "Ocorreu um erro interno no servidor."}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
