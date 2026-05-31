const menuHamburguer = document.querySelector('.menu-hamburguer');
const navbar = document.querySelector('.navbar');

menuHamburguer.addEventListener('click', () => {
  navbar.classList.toggle('active');
  menuHamburguer.classList.toggle('active');
});

// ==================== CARROSSEL FORMAÇÃO - INÍCIO ====================
// Scroll invertido: quando rolar os cards de cima, os de baixo rolam na direção oposta
const cardsTop = document.querySelector('.cards-top');
const cardsBottom = document.querySelector('.cards-bottom');

if (cardsTop && cardsBottom) {
  cardsTop.addEventListener('scroll', () => {
    const maxScroll = cardsTop.scrollWidth - cardsTop.clientWidth;
    const currentScroll = cardsTop.scrollLeft;
    // Inverte a direção do scroll
    cardsBottom.scrollLeft = maxScroll - currentScroll;
  });

  cardsBottom.addEventListener('scroll', () => {
    const maxScroll = cardsBottom.scrollWidth - cardsBottom.clientWidth;
    const currentScroll = cardsBottom.scrollLeft;
    // Inverte a direção do scroll
    cardsTop.scrollLeft = maxScroll - currentScroll;
  });
}
// ==================== CARROSSEL FORMAÇÃO - FIM ====================
