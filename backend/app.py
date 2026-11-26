from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
import json
import re

from flask import Flask, jsonify, send_from_directory

# O Flask serve os arquivos do site e oferece rotas auxiliares.
# Os cadastros ficam no LocalStorage do navegador, não no Python.
ROOT = Path(__file__).resolve().parent.parent
app = Flask(__name__, static_folder=str(ROOT), static_url_path="")


@app.get("/")
def inicio():
    return send_from_directory(ROOT, "index.html")


@app.get("/api/status")
def status():
    return jsonify({
        "projeto": "RAP 90s STORE",
        "mensagem": "Servidor Python Flask funcionando. Cadastros salvos no navegador."
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
        with urlopen(requisicao, timeout=8) as resposta:
            dados = json.loads(resposta.read().decode("utf-8"))

        if dados.get("erro"):
            return jsonify({"erro": "CEP não encontrado."}), 404
        return jsonify(dados)
    except (HTTPError, URLError, TimeoutError, ValueError) as erro:
        app.logger.warning("Falha na consulta ViaCEP: %s", erro)
        return jsonify({"erro": "Não foi possível consultar o CEP agora."}), 502


if __name__ == "__main__":
    print("RAP 90s STORE disponível em http://127.0.0.1:5000")
    print("Os cadastros são armazenados no LocalStorage do navegador.")
    app.run(host="127.0.0.1", port=5000, debug=True)
