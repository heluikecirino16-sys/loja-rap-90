const API = "http://127.0.0.1:5000";

const configuracoes = {
    produtos: { endpoint: "/api/produtos", campos: ["nome", "descricao", "preco", "estoque"] },
    clientes: { endpoint: "/api/clientes", campos: ["nome", "email", "telefone"] },
    funcionarios: { endpoint: "/api/funcionarios", campos: ["nome", "cargo", "senha"] },
    pedidos: { endpoint: "/api/pedidos", campos: ["id_cliente", "id_funcionario", "status", "total"] },
    "itens-pedido": { endpoint: "/api/itens-pedido", campos: ["id_pedido", "id_produto", "quantidade", "preco_unitario"] }
};

const camposNumericos = [
    "preco", "estoque", "id_cliente", "id_funcionario", "total",
    "id_pedido", "id_produto", "quantidade", "preco_unitario"
];

async function consultar(endpoint) {
    const resposta = await fetch(API + endpoint);
    const resultado = await resposta.json().catch(() => ({}));
    if (!resposta.ok) throw new Error(resultado.erro || "Erro ao consultar a API.");
    return resultado;
}

async function cadastrar(endpoint, dados) {
    const resposta = await fetch(API + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
    const resultado = await resposta.json().catch(() => ({}));
    if (!resposta.ok) throw new Error(resultado.erro || "Erro ao cadastrar.");
    return resultado;
}

function mostrarMensagemTabela(tabela, mensagem) {
    tabela.innerHTML = "";
    const linha = document.createElement("tr");
    const coluna = document.createElement("td");
    coluna.colSpan = 10;
    coluna.textContent = mensagem;
    linha.appendChild(coluna);
    tabela.appendChild(linha);
}

async function carregarPagina() {
    const config = configuracoes[document.body.dataset.page];
    const tabela = document.querySelector("#tabela-dados");
    if (!config || !tabela) return;

    try {
        const dados = await consultar(config.endpoint);
        tabela.innerHTML = "";
        if (!Array.isArray(dados) || dados.length === 0) {
            mostrarMensagemTabela(tabela, "Nenhum registro encontrado.");
            return;
        }

        dados.forEach(item => {
            const linha = document.createElement("tr");
            Object.entries(item).forEach(([campo, valor]) => {
                if (campo === "senha") return;
                const coluna = document.createElement("td");
                coluna.textContent = valor ?? "";
                linha.appendChild(coluna);
            });
            tabela.appendChild(linha);
        });
    } catch (erro) {
        console.error(erro);
        mostrarMensagemTabela(tabela, "Não foi possível carregar os dados. Confira o servidor e o banco.");
    }
}

async function enviarFormulario(event) {
    event.preventDefault();
    const config = configuracoes[document.body.dataset.page];
    if (!config) return;

    const formulario = event.currentTarget;
    const dados = {};

    for (const campo of config.campos) {
        const input = formulario.elements.namedItem(campo);
        if (!input) continue;

        const valor = input.value.trim();
        if (!valor) {
            if (input.required) {
                input.focus();
                alert("Preencha o campo: " + campo);
                return;
            }
            dados[campo] = null;
            continue;
        }

        if (camposNumericos.includes(campo)) {
            const numero = Number(valor);
            if (!Number.isFinite(numero)) {
                input.focus();
                alert("Digite um número válido no campo: " + campo);
                return;
            }
            dados[campo] = numero;
        } else {
            dados[campo] = valor;
        }
    }

    try {
        await cadastrar(config.endpoint, dados);
        alert("Cadastro realizado com sucesso!");
        formulario.reset();
        await carregarPagina();
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível cadastrar: " + erro.message);
    }
}

async function verificarConexao() {
    const status = document.querySelector("#api-status");
    if (!status) return;
    try {
        const dados = await consultar("/");
        status.textContent = dados.mensagem || "API conectada!";
    } catch (erro) {
        status.textContent = "API offline. Inicie o servidor Flask.";
    }
}

async function consultarCep() {
    const campo = document.querySelector("#cep");
    const resultado = document.querySelector("#cep-resultado");
    if (!campo || !resultado) return;

    const cep = campo.value.replace(/\D/g, "");
    if (cep.length !== 8) {
        resultado.textContent = "Digite um CEP com 8 números.";
        return;
    }

    resultado.textContent = "Consultando CEP...";
    try {
        const dados = await consultar("/api/cep/" + cep);
        resultado.textContent = [
            dados.logradouro, dados.bairro,
            dados.localidade + " - " + dados.uf
        ].filter(Boolean).join(", ");
    } catch (erro) {
        resultado.textContent = erro.message;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const pagina = document.body.dataset.page;
    if (pagina === "inicio") verificarConexao();

    if (configuracoes[pagina]) {
        const formulario = document.querySelector("#formulario");
        if (formulario) formulario.addEventListener("submit", enviarFormulario);
        carregarPagina();
    }

    const botaoCep = document.querySelector("#consultar-cep");
    if (botaoCep) botaoCep.addEventListener("click", consultarCep);
});
