const menuHamburguer = document.querySelector('.menu-hamburguer');
const navbar = document.querySelector('.navbar');

menuHamburguer.addEventListener('click', () => {
  navbar.classList.toggle('active');
  menuHamburguer.classList.toggle('active');
});
