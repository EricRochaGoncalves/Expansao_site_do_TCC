// Exibe o modal quando a página carrega, se não houver a opção salva
document.addEventListener("DOMContentLoaded", function () {
    // Verifica se o item "naoMostrarModal" está salvo no localStorage
    if (!localStorage.getItem("naoMostrarModal")) {
        // Exibe o modal se a chave não estiver no localStorage
        document.getElementById("modal-inicial").style.display = "flex";
    }

    // Adiciona o evento ao checkbox
    document.getElementById("naoLembrar").addEventListener("change", function () {
        // Verifica se a checkbox foi marcada
        if (this.checked) {
            // Marca no localStorage para não mostrar o modal novamente
            localStorage.setItem("naoMostrarModal", "true");
            // Fecha o modal
            document.getElementById("modal-inicial").style.display = "none";
        }
    });
});

// Função para fechar o modal e salvar a preferência do usuário
function fecharModal() {
    if (document.getElementById("naoLembrar").checked) {
        localStorage.setItem("naoMostrarModal", "true");
    }
    document.getElementById("modal-inicial").style.display = "none";
}

// Fecha o modal ao clicar fora da caixa
document.getElementById("modal-inicial").addEventListener("click", function (event) {
    if (event.target === this) {
        fecharModal();
    }
});
// Inicio de uma função 
function toggleMenu() {
    // acessos os elementos a ser modificados
    const navLinks = document.querySelector('.nav-links')
    const hamburguer = document.querySelector('.hamburguer')
    // Inserimos uma nova classe
    navLinks.classList.toggle('active')

  
    if (navLinks.classList.contains('active')) {
        hamburguer.innerHTML = '&times;'
    } else {
        hamburguer.innerHTML = '<i class="fas fa-compass" style = "color: orange;"></i>'
    }
}

// logica para ativar os botões das etapas
document.querySelectorAll('.learn-more-btn').forEach(button => {

    button.addEventListener('click', () => {

         const modal = document.getElementById(button.dataset.modal)

         modal.style.display = 'flex'
    })

})
document.querySelectorAll('.close-btn').forEach(button => {

  button.addEventListener('click', () => {
      button.closest('.modal').style.display = 'none'
  })
})

window.addEventListener('click', (event) => {
 
  if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none'
  }

})
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});
let currentIndex = 0;
const images = document.querySelectorAll('.carrossel img');

function mudarImagem(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    document.querySelector('.carrossel').style.transform = `translateX(-${currentIndex * 600}px)`;
}

// Chama mudarImagem com intervalos para automatizar a troca das imagens
setInterval(() => mudarImagem(1), 3000); // Muda a imagem a cada 3 segundos

//  Final dos slides

const questions = [
    {
        question: "O que é um orçamento?",
        options: [
            "Um tipo de moeda usada em outros países.",
            "Uma lista de coisas que você quer comprar.",
            "Um plano de quanto dinheiro você vai gastar e economizar.",
            "Um lugar onde você guarda seu dinheiro."
        ],
        answer: 2,
        justification: "O orçamento é um planejamento de como você vai usar seu dinheiro, controlando os gastos e as economias."
    },
    {
        question: "O que significa poupar dinheiro?",
        options: [
            "Gastar todo o dinheiro em doces e brinquedos.",
            "Guardar um pouco do dinheiro que você ganha para usar depois.",
            "Empréstimo de dinheiro para os outros.",
            "Comprar o que você deseja, sempre."
        ],
        answer: 1,
        justification: "Poupar é guardar parte do seu dinheiro para usar em outro momento, seja para emergências ou para realizar um desejo futuro."
    },
    {
        question: "O que é um cofrinho?",
        options: [
            "Um lugar para guardar brinquedos.",
            "Um lugar onde você guarda seu dinheiro para economizar.",
            "Uma caixa onde você coloca suas roupas.",
            "Um lugar onde você coloca seus brinquedos favoritos."
        ],
        answer: 1,
        justification: "Um cofrinho é um recipiente onde você pode guardar o seu dinheiro de forma segura enquanto economiza."
    },
    {
        question: "O que significa 'gastar com sabedoria'?",
        options: [
            "Comprar tudo o que aparece na frente.",
            "Comprar coisas que você realmente precisa e economizar o restante.",
            "Gastar tudo de uma vez.",
            "Não usar dinheiro nunca."
        ],
        answer: 1,
        justification: "Gastar com sabedoria significa priorizar o que é realmente necessário, economizando o que sobra para o futuro."
    },
    {
        question: "Qual é a vantagem de economizar dinheiro?",
        options: [
            "Você pode comprar mais brinquedos no futuro.",
            "Você pode sair para passeios todos os dias.",
            "Economizar não tem nenhuma vantagem.",
            "Você terá mais dinheiro para emergências ou coisas importantes no futuro."
        ],
        answer: 3,
        justification: "A principal vantagem de economizar é ter um dinheiro guardado para emergências ou para realizar objetivos no futuro."
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-btn');
const errorMessageCard = document.getElementById('error-message');
const errorText = document.getElementById('error-text');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    questionElement.textContent = currentQuestion.question;
    
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.setAttribute('data-index', index);
        optionElement.onclick = checkAnswer;
        optionsElement.appendChild(optionElement);
    });

    nextButton.style.display = 'none';
    errorMessageCard.style.display = 'none'; // Esconde o card de erro ao carregar a próxima pergunta
}

function checkAnswer(event) {
    const selectedAnswer = event.target.getAttribute('data-index');
    const correctAnswer = questions[currentQuestionIndex].answer;
    const currentQuestion = questions[currentQuestionIndex];

    // Atualiza o estilo das alternativas
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.onclick = null; // Desabilita as opções após a resposta
        if (index === correctAnswer) {
            option.classList.add('correct'); // Marca a alternativa correta
        } else if (index == selectedAnswer) {
            option.classList.add('incorrect'); // Marca a alternativa errada
        }
    });

    // Exibe justificativa quando acerta
    if (parseInt(selectedAnswer) === correctAnswer) {
        score++;
        const justificationElement = document.createElement('div');
        justificationElement.classList.add('correct-answer');
        justificationElement.innerHTML = `Você acertou!<br><span class="justification">${currentQuestion.justification}</span>`;
        optionsElement.appendChild(justificationElement);
    } else {
        showErrorMessage("Você errou! Tente novamente!");
    }

    scoreElement.textContent = `Pontuação: ${score}`;
    nextButton.style.display = 'block'; // Exibir o botão de "Próxima Pergunta"
}

function showErrorMessage(message) {
    errorText.textContent = message;
    errorMessageCard.style.display = 'block';

    setTimeout(() => {
        errorMessageCard.style.display = 'none';
    }, 4000); // O card desaparecerá após 4 segundos
}

nextButton.onclick = () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert(`Fim do quiz! Sua pontuação final é ${score} de ${questions.length}`);
        currentQuestionIndex = 0;
        score = 0;
        scoreElement.textContent = `Pontuação: ${score}`;
        loadQuestion();
    }

    nextButton.style.display = 'none'; // Esconde o botão até a resposta ser dada
};

// Iniciar o quiz
loadQuestion();
// Função para fechar o modal e salvar a preferência do usuário
function fecharModal() {
    // Adiciona a classe fade-out para animação de saída
    const modal = document.getElementById("modal-inicial");
    modal.classList.add("fade-out");

    // Aguarda a animação e depois oculta o modal
    setTimeout(() => {
        modal.style.display = "none";
    }, 500); // Tempo igual à duração da animação
}

// Fecha o modal ao clicar fora da caixa
document.getElementById("modal-inicial").addEventListener("click", function (event) {
    if (event.target === this) {
        fecharModal();
    }
});

// Fechar o modal ao clicar no botão de fechar
document.getElementById("fechar").addEventListener("click", fecharModal);






