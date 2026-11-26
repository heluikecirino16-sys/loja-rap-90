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

const camposNumericos = new Set([
    "preco", "estoque", "id_cliente", "id_funcionario", "total",
    "id_pedido", "id_produto", "quantidade", "preco_unitario"
]);

function lerRegistros(config) {
    try {
        const dados = JSON.parse(localStorage.getItem(config.storage) || "[]");
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        console.error("Erro ao ler dados locais:", erro);
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

function renderizarTabela() {
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

    thead.replaceChildren();
    const cabecalho = document.createElement("tr");
    config.colunas.forEach(([, titulo]) => {
        const th = document.createElement("th");
        th.textContent = titulo;
        cabecalho.appendChild(th);
    });
    const thAcoes = document.createElement("th");
    thAcoes.textContent = "Ações";
    cabecalho.appendChild(thAcoes);
    thead.appendChild(cabecalho);

    const registros = lerRegistros(config);
    tbody.replaceChildren();

    if (!registros.length) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");
        celula.colSpan = config.colunas.length + 1;
        celula.textContent = "Nenhum registro cadastrado ainda.";
        linha.appendChild(celula);
        tbody.appendChild(linha);
        return;
    }

    registros.forEach(registro => {
        const linha = document.createElement("tr");
        config.colunas.forEach(([campo]) => {
            let valor = registro[campo];
            if (["preco", "total", "preco_unitario"].includes(campo)) {
                valor = Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
            }
            criarCelula(linha, valor);
        });

        const acoes = document.createElement("td");
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "btn btn-excluir";
        botao.textContent = "Excluir";
        botao.addEventListener("click", () => {
            if (!confirm("Tem certeza que deseja excluir este registro?")) return;
            const idCampo = config.colunas[0][0];
            salvarRegistros(config, lerRegistros(config).filter(item => item[idCampo] !== registro[idCampo]));
            renderizarTabela();
        });
        acoes.appendChild(botao);
        linha.appendChild(acoes);
        tbody.appendChild(linha);
    });
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
        const valor = String(input.value || "").trim();

        if (!valor) {
            if (input.required) {
                input.focus();
                alert("Preencha todos os campos obrigatórios.");
                return;
            }
            dados[campo] = null;
            continue;
        }

        if (camposNumericos.has(campo)) {
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

    // Este projeto é uma demonstração no GitHub Pages: não envia cadastros para servidor.
    // A senha é usada apenas para validar o formulário e nunca é armazenada.
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

    try {
        const registros = lerRegistros(config);
        const idCampo = config.colunas[0][0];
        dados[idCampo] = proximoId(registros, idCampo);
        registros.push(dados);
        salvarRegistros(config, registros);
        formulario.reset();
        renderizarTabela();
        alert("Cadastro realizado e salvo neste navegador!");
    } catch (erro) {
        console.error("Erro ao salvar cadastro:", erro);
        alert("O navegador bloqueou o armazenamento. Ative os dados do site e tente novamente.");
    }
}

async function requisitarCep(url) {
    const controlador = new AbortController();
    const temporizador = setTimeout(() => controlador.abort(), 10000);
    try {
        const resposta = await fetch(url, {
            method: "GET",
            headers: { "Accept": "application/json" },
            cache: "no-store",
            signal: controlador.signal
        });
        if (!resposta.ok) throw new Error("Serviço de CEP indisponível (HTTP " + resposta.status + ").");
        return await resposta.json();
    } finally {
        clearTimeout(temporizador);
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
    const servicos = [
        async () => {
            const dados = await requisitarCep("https://viacep.com.br/ws/" + cep + "/json/");
            if (dados.erro) throw new Error("CEP não encontrado.");
            return {
                logradouro: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                uf: dados.uf
            };
        },
        async () => {
            const dados = await requisitarCep("https://brasilapi.com.br/api/cep/v1/" + cep);
            return {
                logradouro: dados.street,
                bairro: dados.neighborhood,
                cidade: dados.city,
                uf: dados.state
            };
        }
    ];

    let ultimoErro;
    for (const consultar of servicos) {
        try {
            const endereco = await consultar();
            resultado.textContent = [
                endereco.logradouro,
                endereco.bairro,
                [endereco.cidade, endereco.uf].filter(Boolean).join(" - ")
            ].filter(Boolean).join(", ") || "Endereço encontrado.";
            return;
        } catch (erro) {
            ultimoErro = erro;
        }
    }

    resultado.textContent = ultimoErro?.name === "AbortError"
        ? "A consulta demorou demais. Tente novamente."
        : (ultimoErro?.message || "Não foi possível consultar o CEP. Confira sua conexão.");
}

document.addEventListener("DOMContentLoaded", () => {
    const pagina = document.body.dataset.page;
    const formulario = document.querySelector("#formulario");

    if (configuracoes[pagina]) {
        if (formulario) formulario.addEventListener("submit", enviarFormulario);
        renderizarTabela();
    }

    const botaoCep = document.querySelector("#consultar-cep");
    if (botaoCep) botaoCep.addEventListener("click", consultarCep);

    const status = document.querySelector("#api-status");
    if (status) {
        status.textContent = "Sistema ativo: cadastros salvos neste navegador (GitHub Pages).";
    }
});
