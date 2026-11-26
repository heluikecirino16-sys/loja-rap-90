# RAP 90s STORE — Python + Flask (modo de simulação)

O Flask serve o site localmente e disponibiliza as rotas auxiliares de status e consulta de CEP. Os cadastros da loja são simulados no próprio navegador com JavaScript e LocalStorage, sem MySQL ou outro banco de dados.

## Como executar no Windows

Abra o terminal na pasta principal do projeto e execute:

```bash
py -m pip install -r backend/requirements.txt
py backend/app.py
```

Depois, acesse http://127.0.0.1:5000.

Para encerrar o servidor, volte ao terminal e pressione Ctrl + C.

## Como os dados são guardados

Produtos, clientes, funcionários, pedidos e itens de pedido são salvos no LocalStorage do navegador. Os dados continuam disponíveis ao fechar e abrir o navegador, desde que você use o mesmo navegador e endereço do site.

O modo publicado no GitHub Pages também permite cadastrar e consultar dados usando LocalStorage, mesmo sem o Flask. Os dados do endereço local e do GitHub Pages ficam separados.

## Rotas Python

- `GET /`: abre o site.
- `GET /api/status`: informa que o Flask está funcionando.
- `GET /api/cep/<cep>`: consulta o ViaCEP.

## Limitações

Este é um projeto de demonstração. O LocalStorage não é um banco de dados compartilhado, não sincroniza dados entre dispositivos ou navegadores e não deve guardar senhas ou informações confidenciais. Os dados podem ser apagados nas configurações do navegador.
