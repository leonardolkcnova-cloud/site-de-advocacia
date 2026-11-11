
const perguntas = [
    {
        pergunta: "Qual é a sua idade?",
        opcoes: [
            "Até 40 anos",
            "Entre 41 e 50 anos",
            "Entre 51 e 60 anos",
            "Acima de 60 anos"
        ]
    },
    {
        pergunta: "Você já contribuiu para o INSS?",
        opcoes: [
            "Sim, atualmente contribuo",
            "Já contribuí, mas parei",
            "Nunca contribuí",
            "Não tenho certeza"
        ]
    },
    {
        pergunta: "Qual é o seu principal objetivo?",
        opcoes: [
            "Solicitar aposentadoria",
            "Entender meus direitos",
            "Solicitar um benefício",
            "Revisar meu benefício"
        ]
    }
];

let etapa = 0;
let respostas = [];

const pergunta = document.getElementById("pergunta");
const opcoes = document.getElementById("opcoes");
const proximo = document.getElementById("proximo");
const progresso = document.getElementById("barra-progresso");

function mostrarPergunta() {

    pergunta.textContent = perguntas[etapa].pergunta;
    const container = document.getElementById("pergunta-container");

container.style.animation = "none";

void container.offsetWidth;

container.style.animation = "aparecer 0.5s ease";

    opcoes.innerHTML = "";

    perguntas[etapa].opcoes.forEach(opcao => {

        const botao = document.createElement("button");

        botao.textContent = opcao;
        botao.classList.add("opcao");

        botao.addEventListener("click", () => {

            document.querySelectorAll(".opcao").forEach(item => {
                item.classList.remove("selecionada");
            });

            botao.classList.add("selecionada");

            respostas[etapa] = opcao;

            proximo.disabled = false;

        });

        opcoes.appendChild(botao);

    });

    proximo.disabled = true;

    progresso.style.width = `${((etapa + 1) / perguntas.length) * 100}%`;

}

proximo.addEventListener("click", () => {

    if (!respostas[etapa]) return;

    etapa++;

    if (etapa < perguntas.length) {

        mostrarPergunta();

    } else {

        document.getElementById("pergunta-container").hidden = true;

        const resultado = document.getElementById("resultado");

        resultado.hidden = false;

        document.getElementById("resumo").textContent =
            `Idade: ${respostas[0]}. Situação de contribuição: ${respostas[1]}. Objetivo: ${respostas[2]}.`;

        const mensagem = encodeURIComponent(
            `Olá, Dra. Flávia! Gostaria de uma orientação previdenciária. ${respostas.join(". ")}.`
        );

        document.getElementById("contato-simulador").href =
            `https://wa.me/5514998551057?text=${mensagem}`;

    }

});

mostrarPergunta();
