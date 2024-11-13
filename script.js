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
        hamburguer.innerHTML = '&#9776;'
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

