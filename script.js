// Lista de dados
const listaFormacao = [
  { tag: "Tecnólogo", curso: "Análise e Desenvolvimento de Sistemas", data: "Formação em 2027", instituicao: "USF" },
  { tag: "Hackathon", curso: "NASA Space Apps Challenge 2025", data: "Outubro 2025", instituicao: "NASA" },
  { tag: "UX/UI", curso: "Introdução ao Design de Interação", data: "72 horas", instituicao: "Eldorado" },
  { tag: "Formação", curso: "Java: Spring Framework e API Rest", data: "Concluído 2024", instituicao: "Alura" },
  { tag: "Hackathon", curso: "1ª Edição Hackathon Lab.AI", data: "20 horas", instituicao: "Instituto Joule" },
  { tag: "Fullstack", curso: "Desenvolvimento Web Full Stack", data: "Junho 2024", instituicao: "Instituto PROA" },
  { tag: "Inglês", curso: "General English - Level A1", data: "Dezembro 2025", instituicao: "EF Education" }
];

// Função para gerar o HTML do Card
function criarCard(item) {
  return `
    <div class="card-formacao">
      <p class="tag">${item.tag}</p>
      <h3 class="curso-nome">${item.curso}</h3>
      <div class="card-footer">
        <p class="ano">${item.data}</p>
        <h3 class="universidade">${item.instituicao}</h3>
      </div>
    </div>
  `;
}

// Controle global de interação
let isInteracting = false;
let activeDragElement = null;

// Função para distribuir os cards nas fileiras com duplicação para loop infinito
function renderizarCursos() {
  const cima = document.getElementById('fileira-cima');
  const baixo = document.getElementById('fileira-baixo');

  if (!cima || !baixo) {
    console.warn("Elementos 'fileira-cima' ou 'fileira-baixo' não foram encontrados no DOM.");
    return;
  }

  // Filtra os itens em duas listas
  const listaCima = listaFormacao.filter((_, idx) => idx % 2 === 0);
  const listaBaixo = listaFormacao.filter((_, idx) => idx % 2 !== 0);

  //Para garantir scroll infinito visual
  const repeticoes = 10;
  cima.innerHTML = Array(repeticoes).fill(listaCima).flat().map(criarCard).join('');
  baixo.innerHTML = Array(repeticoes).fill(listaBaixo).flat().map(criarCard).join('');
}

// Inicializa a renderização
renderizarCursos();

// ==================== Menu hambúrguer ====================
const menuHamburguer = document.querySelector('.menu-hamburguer');
const navbar = document.querySelector('.navbar');

if (menuHamburguer && navbar) {
  menuHamburguer.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuHamburguer.classList.toggle('active');
  });
}

// ==================== CARROSSEL FORMAÇÃO - ROLAGEM E DRAG ====================
const cardsTop = document.querySelector('.cards-top');
const cardsBottom = document.querySelector('.cards-bottom');
const wrapperTop = cardsTop?.parentElement;
const wrapperBottom = cardsBottom?.parentElement;

if (cardsTop && cardsBottom && wrapperTop && wrapperBottom) {

  // Configura a funcionalidade de arrastar para rolar (Drag to Scroll)
  function setupDragToScroll(wrapper) {
    let isDown = false;
    let startX;
    let scrollLeftStart;

    wrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeftStart = wrapper.scrollLeft;
      wrapper.querySelector('.cards-top, .cards-bottom').style.animationPlayState = 'paused';
    });

    wrapper.addEventListener('mouseleave', () => {
      if (isDown) {
        isDown = false;
        setTimeout(() => {
          wrapper.querySelector('.cards-top, .cards-bottom').style.animationPlayState = 'running';
        }, 1500);
      }
    });

    wrapper.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        setTimeout(() => {
          wrapper.querySelector('.cards-top, .cards-bottom').style.animationPlayState = 'running';
        }, 1500);
      }
    });

    wrapper.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - startX) * 1.5;
      wrapper.scrollLeft = scrollLeftStart - walk;
    });

    // Eventos de toque para Mobile
    wrapper.addEventListener('touchstart', () => {
      wrapper.querySelector('.cards-top, .cards-bottom').style.animationPlayState = 'paused';
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
      setTimeout(() => {
        wrapper.querySelector('.cards-top, .cards-bottom').style.animationPlayState = 'running';
      }, 1500);
    }, { passive: true });
  }

  setupDragToScroll(wrapperTop);
  setupDragToScroll(wrapperBottom);
}

// ==================== ANIMAÇÕES AO SCROLL ====================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observar título e texto da seção Sobre
const sobreWrapper = document.querySelector('.container-sobre .wrapper');
const sobreTexto = document.querySelector('.container-sobre .texto');

if (sobreWrapper) observer.observe(sobreWrapper);
if (sobreTexto) observer.observe(sobreTexto);

// Observar título da seção Conhecimento
const conhecimentoTitulo = document.querySelector('.container-conhecimento .titulos');
if (conhecimentoTitulo) observer.observe(conhecimentoTitulo);

// Observar cada skill pill com delay escalonado
const skillPills = document.querySelectorAll('.skill-pill');
skillPills.forEach((pill, index) => {
  pill.style.transitionDelay = `${index * 0.04}s`;
  observer.observe(pill);
});
