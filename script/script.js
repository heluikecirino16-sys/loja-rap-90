const configuracoes = {
    produtos: {
        storage: "rap90_produtos",
        campos: ["nome", "descricao", "preco", "estoque"],
        colunas: [["id_produto", "ID"], ["nome", "Nome"], ["descricao", "Descrição"], ["preco", "Preço"], ["estoque", "Estoque"]]
    },
    clientes: {
        storage: "rap90_clientes",
        campos: ["nome", "email", "telefone"],
        colunas: [["id_cliente", "ID"], ["nome", "Nome"], ["email", "E-mail"], ["telefone", "Telefone"]]
    },
    funcionarios: {
        storage: "rap90_funcionarios",
        campos: ["nome", "cargo", "senha"],
        colunas: [["id_funcionario", "ID"], ["nome", "Nome"], ["cargo", "Cargo"]]
    },
    pedidos: {
        storage: "rap90_pedidos",
        campos: ["id_cliente", "id_funcionario", "status", "total"],
        colunas: [["id_pedido", "ID"], ["id_cliente", "ID Cliente"], ["id_funcionario", "ID Funcionário"], ["status", "Status"], ["total", "Total"]]
    },
    "itens-pedido": {
        storage: "rap90_itens_pedido",
        campos: ["id_pedido", "id_produto", "quantidade", "preco_unitario"],
        colunas: [["id_item", "ID"], ["id_pedido", "ID Pedido"], ["id_produto", "ID Produto"], ["quantidade", "Quantidade"], ["preco_unitario", "Preço unitário"]]
    }
};

const camposNumericos = [
    "preco", "estoque", "id_cliente", "id_funcionario", "total",
    "id_pedido", "id_produto", "quantidade", "preco_unitario"
];

function lerRegistros(config) {
    try {
        const dados = JSON.parse(localStorage.getItem(config.storage) || "[]");
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        console.error("Não foi possível ler os dados salvos:", erro);
        return [];
    }
}

function salvarRegistros(config, registros) {
    localStorage.setItem(config.storage, JSON.stringify(registros));
}

function proximoId(registros, campoId) {
    return registros.reduce((maior, item) => Math.max(maior, Number(item[campoId]) || 0), 0) + 1;
}

function criarCelula(linha, valor) {
    const celula = document.createElement("td");
    celula.textContent = valor === null || valor === undefined ? "" : valor;
    linha.appendChild(celula);
}

function criarCelulaCabecalho(linha, titulo) {
    const celula = document.createElement("th");
    celula.textContent = titulo;
    linha.appendChild(celula);
}

function mostrarMensagemTabela(tbody, mensagem, quantidadeColunas) {
    tbody.innerHTML = "";
    const linha = document.createElement("tr");
    const celula = document.createElement("td");
    celula.colSpan = quantidadeColunas;
    celula.textContent = mensagem;
    linha.appendChild(celula);
    tbody.appendChild(linha);
}

function carregarPagina() {
    const pagina = document.body.dataset.page;
    const config = configuracoes[pagina];
    const tbody = document.querySelector("#tabela-dados");
    const tabela = tbody?.closest("table");
    if (!config || !tbody || !tabela) return;

    let thead = tabela.querySelector("thead");
    if (!thead) {
        thead = document.createElement("thead");
        tabela.insertBefore(thead, tbody);
    }

    thead.innerHTML = "";
    const cabecalho = document.createElement("tr");
    config.colunas.forEach(([, titulo]) => criarCelulaCabecalho(cabecalho, titulo));
    criarCelulaCabecalho(cabecalho, "Ações");
    thead.appendChild(cabecalho);

    const registros = lerRegistros(config);
    if (registros.length === 0) {
        mostrarMensagemTabela(tbody, "Nenhum registro cadastrado ainda.", config.colunas.length + 1);
        return;
    }

    tbody.innerHTML = "";
    registros.forEach(registro => {
        const linha = document.createElement("tr");
        config.colunas.forEach(([campo]) => {
            let valor = registro[campo];
            if (["preco", "total", "preco_unitario"].includes(campo)) {
                valor = Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
            }
            criarCelula(linha, valor);
        });

        const celulaAcoes = document.createElement("td");
        const excluir = document.createElement("button");
        excluir.type = "button";
        excluir.className = "btn btn-excluir";
        excluir.textContent = "Excluir";
        excluir.addEventListener("click", () => excluirRegistro(config, registro, pagina));
        celulaAcoes.appendChild(excluir);
        linha.appendChild(celulaAcoes);
        tbody.appendChild(linha);
    });
}

function excluirRegistro(config, registro, pagina) {
    const idCampo = config.colunas[0][0];
    if (!confirm("Tem certeza que deseja excluir este registro?")) return;

    const atualizados = lerRegistros(config).filter(item => item[idCampo] !== registro[idCampo]);
    salvarRegistros(config, atualizados);
    carregarPagina();
}

function enviarFormulario(event) {
    event.preventDefault();
    const pagina = document.body.dataset.page;
    const config = configuracoes[pagina];
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
                alert("Preencha todos os campos obrigatórios.");
                return;
            }
            dados[campo] = null;
            continue;
        }

        if (camposNumericos.includes(campo)) {
            const numero = Number(valor);
            if (!Number.isFinite(numero) || numero < 0) {
                input.focus();
                alert("Digite um número válido no campo indicado.");
                return;
            }
            dados[campo] = numero;
        } else {
            dados[campo] = valor;
        }
    }

    const registros = lerRegistros(config);

    // A senha é solicitada para demonstrar o formulário, mas não é salva.
    delete dados.senha;

    if (pagina === "pedidos") {
        if (!lerRegistros(configuracoes.clientes).some(item => item.id_cliente === dados.id_cliente)) {
            alert("Cadastre primeiro um cliente com esse ID.");
            return;
        }
        if (!lerRegistros(configuracoes.funcionarios).some(item => item.id_funcionario === dados.id_funcionario)) {
            alert("Cadastre primeiro um funcionário com esse ID.");
            return;
        }
    }

    if (pagina === "itens-pedido") {
        if (!lerRegistros(configuracoes.pedidos).some(item => item.id_pedido === dados.id_pedido)) {
            alert("Cadastre primeiro um pedido com esse ID.");
            return;
        }
        if (!lerRegistros(configuracoes.produtos).some(item => item.id_produto === dados.id_produto)) {
            alert("Cadastre primeiro um produto com esse ID.");
            return;
        }
    }

    const idCampo = config.colunas[0][0];
    dados[idCampo] = proximoId(registros, idCampo);
    registros.push(dados);

    try {
        salvarRegistros(config, registros);
        formulario.reset();
        carregarPagina();
        alert("Cadastro realizado e salvo neste navegador!");
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível salvar. O armazenamento do navegador pode estar cheio ou bloqueado.");
    }
}

async function verificarConexao() {
    const status = document.querySelector("#api-status");
    if (!status) return;

    try {
        const resposta = await fetch("/api/status");
        if (!resposta.ok) throw new Error("Servidor indisponível");
        const dados = await resposta.json();
        status.textContent = dados.mensagem;
    } catch {
        status.textContent = "Modo demonstração ativo: os cadastros são salvos no LocalStorage. O servidor Python não está conectado.";
    }
}

async function consultarCep() {
    const campo = document.querySelector("#cep");
    const resultado = document.querySelector("#cep-resultado");
    if (!campo || !resultado) return;

    const cep = campo.value.replace(/\\D/g, "");
    if (cep.length !== 8) {
        resultado.textContent = "Digite um CEP com 8 números.";
        return;
    }

    resultado.textContent = "Consultando CEP...";
    try {
        let resposta;
        const servidorLocal = location.hostname === "127.0.0.1" || location.hostname === "localhost";

        // Quando o site está rodando pelo Flask, usa a rota Python.
        if (servidorLocal && location.port === "5000") {
            resposta = await fetch("/api/cep/" + cep);
        } else {
            // No GitHub Pages, consulta o ViaCEP diretamente.
            resposta = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
        }

        if (!resposta.ok) {
            const erro = await resposta.json().catch(() => ({}));
            throw new Error(erro.erro || "Não foi possível consultar o CEP.");
        }

        const dados = await resposta.json();
        if (dados.erro) throw new Error("CEP não encontrado.");

        resultado.textContent = [
            dados.logradouro, dados.bairro,
            dados.localidade + " - " + dados.uf
        ].filter(Boolean).join(", ") || "Endereço encontrado.";
    } catch (erro) {
        resultado.textContent = erro.message === "Failed to fetch"
            ? "Falha de conexão. Confira sua internet e tente novamente."
            : (erro.message || "Erro ao consultar o CEP.");
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
