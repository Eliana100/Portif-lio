// Banco de dados com imagens "temporárias" reutilizando as capas
const dadosProjetos = {
    "nova-fit": {
        titulo: "Nova Fit",
        banner: "img/capa_novafit.svg",
        descricao: "Projeto feito como case de estudo UI.",
        galeria: ["img/capa_novafit.svg", "img/capa_novafit.svg", "img/capa_novafit.svg", "img/capa_novafit.svg"],
        links: [{ nome: "Figma", url: "#" }, { nome: "GitHub", url: "#" }]
    },
    "moove": {
        titulo: "Moove",
        banner: "img/Capa_github.svg",
        descricao: "Minha ideia de startup. Feita em HTML, CSS e JS.",
        galeria: ["img/Capa_github.svg", "img/Capa_github.svg", "img/Capa_github.svg"],
        links: [{ nome: "Repositório GitHub", url: "#" }]
    },
    "on-game": {
        titulo: "On Game",
        banner: "img/capa_ongame2.png",
        descricao: "Projeto com foco no mercado de games.",
        galeria: ["img/capa_ongame2.png", "img/capa_ongame2.png"],
        links: [{ nome: "Repositório GitHub", url: "#" }]
    },
    "casas-bahia": {
        titulo: "Casas Bahia (Dev)",
        banner: "img/casas.png",
        descricao: "Aplicação relacionada ao e-commerce das Casas Bahia.",
        galeria: ["img/casas.png", "img/casas.png"],
        links: [{ nome: "Repositório GitHub", url: "#" }]
    },
    "nasa-space-apps": {
        titulo: "NASA Space Apps Challenge",
        banner: "img/cumaru.svg",
        descricao: "Projeto desenvolvido durante o NASA Space Apps Challenge 2025. Focado em resolver problemas globais utilizando dados espaciais.",
        galeria: ["img/cumaru.svg", "img/cumaru.svg"],
        links: [{ nome: "Página do Projeto", url: "https://spaceappschallenge.org/" }]
    },
    "freelance-zirighair": {
        titulo: "Freelance Zirighair",
        banner: "img/mockupzirigh.svg",
        descricao: "Projeto de UI/UX focado em um salão de beleza, trazendo uma interface moderna e intuitiva.",
        galeria: ["img/mockupzirigh.svg", "img/mockupzirigh.svg"],
        links: [{ nome: "Acesso ao Figma", url: "#" }]
    },
    "casas-bahia-ux": {
        titulo: "Casas Bahia (UX)",
        banner: "img/thermokids.svg",
        descricao: "Projeto focado em estudo UI.",
        galeria: ["img/thermokids.svg", "img/thermokids.svg"],
        links: [{ nome: "Acesso ao Figma", url: "#" }]
    },
    "proa": {
        titulo: "Projeto PROA",
        banner: "img/capa_lunna.svg",
        descricao: "Atividade desenvolvida no Instituto PROA unindo design e desenvolvimento web.",
        galeria: ["img/capa_lunna.svg", "img/capa_lunna.svg"],
        links: [{ nome: "Behance", url: "#" }]
    }
};

// 1. Pega o ID da URL
const urlParams = new URLSearchParams(window.location.search);
const projetoId = urlParams.get('id');
const projeto = dadosProjetos[projetoId];
let imagemAtualIndex = 0;

if (projeto) {
    document.title = `${projeto.titulo} | Detalhes`;
    document.getElementById('projeto-banner').innerHTML = `<img src="${projeto.banner}" alt="${projeto.titulo}">`;
    document.getElementById('projeto-descricao').innerText = projeto.descricao;

    const galeriaContainer = document.getElementById('projeto-galeria');
    projeto.galeria.forEach((img, index) => {
        galeriaContainer.innerHTML += `<div class="thumb-item" tabindex="0" role="button" aria-label="Ver miniatura ${index + 1}" onclick="trocarImagem(${index})" onkeydown="if(event.key === 'Enter') trocarImagem(${index})"><img src="${img}" alt="Miniatura ${index + 1}"></div>`;
    });

    const linksContainer = document.getElementById('lista-links');
    projeto.links.forEach(link => {
        linksContainer.innerHTML += `<li><strong>${link.nome}</strong><br><a href="${link.url}" target="_blank">${link.url}</a></li>`;
    });
}

function trocarImagem(index) {
    imagemAtualIndex = index;
    const imgPrincipal = document.querySelector('#projeto-banner img');
    if (imgPrincipal && projeto && projeto.galeria) {
        imgPrincipal.style.opacity = 0; // Inicia o fade out
        setTimeout(() => {
            imgPrincipal.src = projeto.galeria[index];
            imgPrincipal.style.opacity = 1; // Inicia o fade in com a nova imagem
        }, 200);
    }
}

function scrollGaleria(direcao) {
    if (!projeto || !projeto.galeria) return;
    imagemAtualIndex += direcao;
    if (imagemAtualIndex < 0) imagemAtualIndex = projeto.galeria.length - 1;
    else if (imagemAtualIndex >= projeto.galeria.length) imagemAtualIndex = 0;
    trocarImagem(imagemAtualIndex);
    
    // Rola a galeria para manter a miniatura visível e centralizada
    const container = document.getElementById('projeto-galeria');
    const thumbs = container.querySelectorAll('.thumb-item');
    if (thumbs[imagemAtualIndex]) {
        thumbs[imagemAtualIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

// Script de ativação do Menu Mobile (Reaproveitado)
const menuHamburguer = document.querySelector('.menu-hamburguer');
const navbar = document.querySelector('.navbar');
if (menuHamburguer && navbar) {
  menuHamburguer.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuHamburguer.classList.toggle('active');
  });
}

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

    setTimeout(() => banner.classList.add('show'), 500);

    banner.querySelector('.cookie-btn').addEventListener('click', () => {
      localStorage.setItem('cookiesAceitos', 'true');
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 500);
    });
  }
}

initCookieBanner();