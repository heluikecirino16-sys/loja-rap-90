
const API = "http://127.0.0.1:5000";

const configuracoes = {
    produtos: {
        endpoint: "/api/produtos",
        campos: ["nome", "descricao", "preco", "estoque"]
    },

    clientes: {
        endpoint: "/api/clientes",
        campos: ["nome", "email", "telefone"]
    },

    funcionarios: {
        endpoint: "/api/funcionarios",
        campos: ["nome", "cargo", "senha"]
    },

    pedidos: {
        endpoint: "/api/pedidos",
        campos: ["id_cliente", "id_funcionario", "status", "total"]
    },

    "itens-pedido": {
        endpoint: "/api/itens-pedido",
        campos: ["id_pedido", "id_produto", "quantidade", "preco_unitario"]
    }
};

const camposNumericos = [
    "preco",
    "estoque",
    "id_cliente",
    "id_funcionario",
    "total",
    "id_pedido",
    "id_produto",
    "quantidade",
    "preco_unitario"
];

async function consultar(endpoint) {
    const resposta = await fetch(API + endpoint);

    if (!resposta.ok) {
        throw new Error("Erro ao buscar dados. Código: " + resposta.status);
    }

    return await resposta.json();
}

async function cadastrar(endpoint, dados) {
    const resposta = await fetch(API + endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    const resultado = await resposta.json().catch(() => ({}));

    if (!resposta.ok) {
        throw new Error(
            resultado.erro || resultado.mensagem || "Erro ao cadastrar."
        );
    }

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
    const pagina = document.body.dataset.page;
    const config = configuracoes[pagina];

    if (!config) return;

    const tabela = document.querySelector("#tabela-dados");

    if (!tabela) {
        console.error("Tabela #tabela-dados não encontrada.");
        return;
    }

    try {
        const dados = await consultar(config.endpoint);

        tabela.innerHTML = "";

        if (!Array.isArray(dados) || dados.length === 0) {
            mostrarMensagemTabela(
                tabela,
                "Nenhum registro encontrado."
            );
            return;
        }

        dados.forEach(item => {
            const linha = document.createElement("tr");

            config.campos.forEach(campo => {
                const coluna = document.createElement("td");

                coluna.textContent = item[campo] ?? "";

                linha.appendChild(coluna);
            });

            tabela.appendChild(linha);
        });

    } catch (erro) {
        console.error("Erro ao carregar página:", erro);

        mostrarMensagemTabela(
            tabela,
            "Não foi possível carregar os dados. Verifique o servidor Flask."
        );
    }
}

async function enviarFormulario(event) {
    event.preventDefault();

    const pagina = document.body.dataset.page;
    const config = configuracoes[pagina];

    if (!config) return;

    const formulario = event.target;
    const dados = {};

    for (const campo of config.campos) {
        const input = formulario.elements.namedItem(campo);

        if (!input) {
            console.error("Campo não encontrado:", campo);
            alert("O campo " + campo + " não foi encontrado no formulário.");
            return;
        }

        const valor = input.value.trim();

        if (valor === "") {
            alert("Preencha todos os campos.");
            input.focus();
            return;
        }

        if (camposNumericos.includes(campo)) {
            const numero = Number(valor);

            if (!Number.isFinite(numero)) {
                alert("Digite um número válido no campo: " + campo);
                input.focus();
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
        console.error("Erro no cadastro:", erro);
        alert("Erro: " + erro.message);
    }
}

async function verificarConexao() {
    const status = document.querySelector("#api-status");

    if (!status) return;

    try {
        const resposta = await fetch(API + "/");

        if (!resposta.ok) {
            throw new Error("Servidor indisponível");
        }

        status.textContent = "Sistema conectado!";

    } catch (erro) {
        status.textContent = "Inicie o servidor Flask para conectar.";
        console.error(erro);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const pagina = document.body.dataset.page;

    if (pagina === "inicio") {
        verificarConexao();
    }

    if (configuracoes[pagina]) {
        const formulario = document.querySelector("#formulario");

        if (formulario) {
            formulario.addEventListener("submit", enviarFormulario);
        }

        carregarPagina();
    }
});
