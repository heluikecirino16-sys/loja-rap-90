# RAP 90s STORE

Loja temática inspirada na cultura hip-hop dos anos 1990. Projeto escolar com frontend HTML/CSS/JavaScript, API Python Flask, MySQL e Programação Orientada a Objetos.

## Tecnologias
- HTML5, CSS3 e JavaScript
- Python 3, Flask e Flask-CORS
- MySQL e mysql-connector-python
- API externa ViaCEP para consulta de endereços por CEP

## Estrutura
- `backend/`: aplicação Flask, modelos, rotas, DAOs e conexão MySQL.
- `database/rap90s_store.sql`: criação do banco e das tabelas.
- `pages/`: telas de cadastro.
- `style/style.css`: estilos separados do HTML.
- `script/script.js`: comunicação com a API.
- `docs/`: diagrama POO, wireframe e exemplo de estrutura condicional.

## Como executar
1. Inicie o MySQL pelo XAMPP.
2. Importe `database/rap90s_store.sql` pelo phpMyAdmin.
3. No terminal, entre em `backend`.
4. Instale as dependências: `pip install -r requirements.txt`.
5. Execute `python app.py`.
6. Abra `index.html` com Live Server ou servidor HTTP local.

O backend usa por padrão host `localhost`, usuário `root`, senha vazia e banco `rap90s_store`. Configure `DB_HOST`, `DB_USER`, `DB_PASSWORD` e `DB_NAME` por variáveis de ambiente se necessário.

## API local
- `GET /`: status da API.
- `GET/POST /api/clientes`
- `GET/POST /api/funcionarios`
- `GET/POST /api/produtos`
- `GET/POST /api/pedidos`
- `GET/POST /api/itens-pedido`
- `GET /api/cep/<cep>`: consulta o ViaCEP e retorna os dados do endereço.

Cadastros recebem JSON. Exemplo para `POST /api/produtos`:
```json
{"nome":"Camiseta Rap 90s","descricao":"Camiseta temática","preco":79.90,"estoque":15}
```

## Modelagem e documentação
Veja `docs/diagrama-poo.md` para classes, herança e associações e `docs/wireframe.md` para a estrutura das telas. O banco possui clientes, funcionários, produtos, pedidos e itens de pedido.

## Observações
A aplicação está em desenvolvimento educacional. Antes de usar em produção, configure credenciais seguras, desative debug, adicione autenticação/autorização e testes automatizados.
