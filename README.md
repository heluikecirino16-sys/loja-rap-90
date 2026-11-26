# RAP 90s STORE

Loja temática inspirada na cultura hip-hop dos anos 1990. Projeto educacional com HTML, CSS, JavaScript e Python Flask.

## Tecnologias
- HTML5, CSS3 e JavaScript
- Python 3 e Flask
- LocalStorage do navegador para simular o armazenamento dos cadastros
- API ViaCEP para consulta de endereços

## Como executar localmente

1. Instale o Python 3.
2. Abra o terminal na pasta principal do projeto.
3. Instale a dependência:

   ```bash
   py -m pip install -r backend/requirements.txt
   ```

4. Inicie o servidor Python:

   ```bash
   py backend/app.py
   ```

5. Abra http://127.0.0.1:5000 no navegador.

O Flask serve o site localmente. Os cadastros são guardados pelo JavaScript no LocalStorage do navegador, sem precisar iniciar MySQL ou importar um banco de dados.

## Funcionalidades simuladas
- Cadastro, listagem e exclusão de produtos.
- Cadastro, listagem e exclusão de clientes.
- Cadastro, listagem e exclusão de funcionários.
- Cadastro, listagem e exclusão de pedidos.
- Cadastro, listagem e exclusão de itens de pedido.
- Validação simples dos relacionamentos entre clientes, funcionários, pedidos e produtos.
- Consulta de CEP pela API ViaCEP.

## GitHub Pages

O site também pode ser publicado no GitHub Pages. Nesse caso, o Python não é executado pelo Pages, mas os cadastros continuam funcionando no navegador por meio do LocalStorage.

Os dados ficam separados por endereço: o que for cadastrado em http://127.0.0.1:5000 não aparece automaticamente no endereço do GitHub Pages. Também não são compartilhados entre dispositivos ou navegadores.

## Limitações da simulação

Este projeto não utiliza banco de dados real. O LocalStorage é adequado para demonstração escolar, mas não é seguro para senhas ou informações confidenciais. Limpar os dados do site no navegador pode apagar os cadastros.
