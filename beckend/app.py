from flask import Flask, jsonify
from flask_cors import CORS
from routes.clientes import clientes_bp
from routes.funcionarios import funcionarios_bp
from routes.produtos import produtos_bp
from routes.pedidos import pedidos_bp
from routes.itens_pedido import itens_bp

app = Flask(__name__)
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
        "rotas": [
            "/api/clientes", "/api/funcionarios", "/api/produtos",
            "/api/pedidos", "/api/itens-pedido"
        ]
    })

@app.errorhandler(404)
def nao_encontrado(_):
    return jsonify({"erro": "Rota não encontrada"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)
