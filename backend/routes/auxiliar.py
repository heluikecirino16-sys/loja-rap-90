from flask import jsonify, request

def validar_json(campos):
    dados = request.get_json(silent=True)
    if not isinstance(dados, dict):
        return None, (jsonify({"erro": "Envie um JSON válido"}), 400)
    faltando = [campo for campo in campos if campo not in dados or dados[campo] in (None, "")]
    if faltando:
        return None, (jsonify({"erro": "Campos obrigatórios ausentes", "campos": faltando}), 400)
    return dados, None
