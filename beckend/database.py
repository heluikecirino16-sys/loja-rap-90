import os
import mysql.connector
from mysql.connector import Error

def obter_conexao():
    try:
        return mysql.connector.connect(
            host=os.getenv("DB_HOST", "localhost"),
            user=os.getenv("DB_USER", "root"),
            password=os.getenv("DB_PASSWORD", ""),
            database=os.getenv("DB_NAME", "rap90s_store")
        )
    except Error as erro:
        raise RuntimeError(f"Não foi possível conectar ao MySQL: {erro}")
