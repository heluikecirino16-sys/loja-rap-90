from datetime import date, datetime
from decimal import Decimal

def preparar_dados(dados):
    resultado = {}
    for chave, valor in dados.items():
        if isinstance(valor, (date, datetime)):
            resultado[chave] = valor.isoformat()
        elif isinstance(valor, Decimal):
            resultado[chave] = float(valor)
        else:
            resultado[chave] = valor
    return resultado
