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
    <div class="card-formacao" tabindex="0" aria-label="Formação: ${item.curso}">
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

const projetos = [
    {
        id: "nova-fit",
        categoria: "dev",
        capa: "img/capa_novafit.svg",
    },
    {
        id: "moove",
        categoria: "dev",
        capa: "img/Capa_github.svg",
    },
    {
        id: "on-game",
        categoria: "dev",
        capa: "img/capa_ongame2.png",
    },
    {
        id: "casas-bahia",
        categoria: "dev",
        capa: "img/casas.png",
    },
    {
        id: "nasa-space-apps",
        categoria: "dev",
        capa: "img/cumaru.svg",
      
    },
    {
        id: "freelance-zirighair",
        categoria: "ux",
        capa: "img/mockupzirigh.svg",
      
    },
    {
        id: "casas-bahia-ux",
        categoria: "ux",
        capa: "img/thermokids.svg",
    },
    {
        id: "proa",
        categoria: "ux",
        capa: "img/capa_lunna.svg",
    }
];

function renderizarProjetos() {
    const devContainer = document.getElementById('carrossel-dev');
    const uxContainer = document.getElementById('carrossel-ux');

    let htmlDev = '';
    let htmlUx = '';

    projetos.forEach(proj => {
        const cardHTML = `
            <div class="projeto-card" tabindex="0" role="button" aria-label="Detalhes do projeto ${proj.id}" onclick="irParaDetalhes('${proj.id}')" onkeydown="if(event.key === 'Enter') irParaDetalhes('${proj.id}')">
                <img src="${proj.capa}" alt="Capa do projeto ${proj.id}">
            </div>
        `;

        if (proj.categoria === 'dev') htmlDev += cardHTML;
        else htmlUx += cardHTML;
    });

    const repeticoes = 10;
    if (devContainer) devContainer.innerHTML = Array(repeticoes).fill(htmlDev).join('');
    if (uxContainer) uxContainer.innerHTML = Array(repeticoes).fill(htmlUx).join('');
}

function irParaDetalhes(id) {
    // Redireciona para a nova página passando o ID na URL
    window.location.href = `projetos.html?id=${id}`;
}

// Inicia tudo
renderizarProjetos();

// Menu hambúrguer
const menuHamburguer = document.querySelector('.menu-hamburguer');
const navbar = document.querySelector('.navbar');

if (menuHamburguer && navbar) {
  menuHamburguer.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuHamburguer.classList.toggle('active');
  });
}

//  carrousel
function setupDragToScroll(wrapper) {
    let isDown = false;
    let startX;
    let scrollLeftStart;

    const animatedElements = wrapper.querySelectorAll('.cards-top, .cards-bottom');

    wrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeftStart = wrapper.scrollLeft;
      animatedElements.forEach(el => el.style.animationPlayState = 'paused');
    });

    wrapper.addEventListener('mouseleave', () => {
      if (isDown) {
        isDown = false;
        setTimeout(() => {
          animatedElements.forEach(el => el.style.animationPlayState = 'running');
        }, 1500);
      }
    });

    wrapper.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        setTimeout(() => {
          animatedElements.forEach(el => el.style.animationPlayState = 'running');
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
      animatedElements.forEach(el => el.style.animationPlayState = 'paused');
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
      setTimeout(() => {
        animatedElements.forEach(el => el.style.animationPlayState = 'running');
      }, 1500);
    }, { passive: true });
}

const todosWrappers = document.querySelectorAll('.cards-wrapper');
todosWrappers.forEach(wrapper => {
  setupDragToScroll(wrapper);
});

// animação scroll
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

// --- Cookie Banner Dinâmico ---
function initCookieBanner() {
  // Verifica se o usuário já aceitou os cookies
  if (!localStorage.getItem('cookiesAceitos')) {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-icon" style="font-size: 32px;" aria-hidden="true">🍪</div>
      <div class="cookie-text">
        Usamos cookies para melhorar sua experiência no meu site pessoal. Ao continuar navegando, você concorda com o uso de cookies.
      </div>
      <button class="cookie-btn" aria-label="Aceitar cookies">Entendi</button>
    `;
    document.body.appendChild(banner);

    // Mostra o banner suavemente com um delay
    setTimeout(() => banner.classList.add('show'), 500);

    // Salva a escolha do usuário e esconde o banner ao clicar
    banner.querySelector('.cookie-btn').addEventListener('click', () => {
      localStorage.setItem('cookiesAceitos', 'true');
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 500); // Remove do DOM após a transição
    });
  }
}

initCookieBanner();
