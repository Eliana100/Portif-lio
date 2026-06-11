/* Dados dos projetos */
// Informações dos projetos separadas do HTML.
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

/* Lógica da página */
// Obtém o ID do projeto a partir da URL.
const urlParams = new URLSearchParams(window.location.search);
const projetoId = urlParams.get('id');
let imagemAtualIndex = 0;
let projeto = dadosProjetos[projetoId];

function preencherPagina(projetoAtual) {
    if (!projetoAtual) return;
    document.title = `${projetoAtual.titulo} | Detalhes`;
    document.getElementById('projeto-banner').innerHTML = `<img src="${projetoAtual.banner}" alt="${projetoAtual.titulo}" onerror="this.src='img/Capa_github.svg'">`;
    document.getElementById('projeto-descricao').innerText = projetoAtual.descricao;

    const galeriaContainer = document.getElementById('projeto-galeria');
    galeriaContainer.innerHTML = '';
    if (projetoAtual.galeria && projetoAtual.galeria.length > 0) {
        projetoAtual.galeria.forEach((img, index) => {
            galeriaContainer.innerHTML += `<div class="item-miniatura" tabindex="0" role="button" aria-label="Ver miniatura ${index + 1}" onclick="trocarImagem(${index})" onkeydown="if(event.key === 'Enter') trocarImagem(${index})"><img src="${img}" alt="Miniatura ${index + 1}" onerror="this.src='img/Capa_github.svg'"></div>`;
        });
    }

    const linksContainer = document.getElementById('lista-links');
    linksContainer.innerHTML = '';
    projetoAtual.links.forEach(link => {
        linksContainer.innerHTML += `<li><strong>${link.nome}</strong><br><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.url}</a></li>`;
    });
}

if (projeto) {
    // Projeto estático cadastrado
    preencherPagina(projeto);
} else if (projetoId) {
    // Se não está no arquivo estático, busca as informações na API do GitHub!
    buscarDetalhesNoGitHub(projetoId);
}

async function buscarDetalhesNoGitHub(id) {
    const usuario = 'Eliana100';
    try {
        const resposta = await fetch(`https://api.github.com/repos/${usuario}/${id}`);
        if (!resposta.ok) throw new Error('Repositório não encontrado no GitHub');
        
        const repo = await resposta.json();
        
        projeto = {
            titulo: repo.name.replace(/-/g, ' ').toUpperCase(),
            banner: `https://raw.githubusercontent.com/${usuario}/${repo.name}/main/capa.png`,
            descricao: repo.description || 'Projeto desenvolvido por Eliana Silva. (Importado automaticamente do GitHub)',
            galeria: [],
            links: [
                { nome: "Repositório GitHub", url: repo.html_url },
                ...(repo.homepage ? [{ nome: "Acesso Online / Deploy", url: repo.homepage }] : [])
            ]
        };
        
        preencherPagina(projeto);
    } catch (erro) {
        console.error(erro);
        document.getElementById('projeto-descricao').innerHTML = '<strong>Projeto dinâmico não encontrado!</strong>';
    }
}

// Alterna a imagem principal do projeto.
function trocarImagem(index) {
    imagemAtualIndex = index;
    const imgPrincipal = document.querySelector('#projeto-banner img');
    if (imgPrincipal && projeto && projeto.galeria) {
        imgPrincipal.style.opacity = 0; 
        setTimeout(() => {
            imgPrincipal.src = projeto.galeria[index];
            imgPrincipal.style.opacity = 1; 
        }, 200);
    }
}

function scrollGaleria(direcao) {
    if (!projeto || !projeto.galeria) return;
    imagemAtualIndex += direcao;
    if (imagemAtualIndex < 0) imagemAtualIndex = projeto.galeria.length - 1;
    else if (imagemAtualIndex >= projeto.galeria.length) imagemAtualIndex = 0;
    trocarImagem(imagemAtualIndex);
    
    // Centraliza a miniatura selecionada.
    const container = document.getElementById('projeto-galeria');
    const thumbs = container.querySelectorAll('.item-miniatura');
    if (thumbs[imagemAtualIndex]) {
        thumbs[imagemAtualIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

// Comportamento do menu mobile.
const menuHamburguer = document.querySelector('.menu-hamburguer');
const navbar = document.querySelector('.navbar');
if (menuHamburguer && navbar) {
  menuHamburguer.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuHamburguer.classList.toggle('active');
  });
}

/* Aviso de cookies compartilhado */
function initCookieBanner() {
  if (!localStorage.getItem('cookiesAceitos')) {
    const banner = document.createElement('div');
    banner.className = 'banner-cookies';
    banner.innerHTML = `
      <div class="icone-cookies" style="font-size: 32px;" aria-hidden="true">🍪</div>
      <div class="texto-cookies">
        Usamos cookies para melhorar sua experiência no meu site pessoal. Ao continuar navegando, você concorda com o uso de cookies.
      </div>
      <button class="botao-cookies" aria-label="Aceitar cookies">Entendi</button>
    `;
    document.body.appendChild(banner);

    setTimeout(() => banner.classList.add('show'), 500);

    banner.querySelector('.botao-cookies').addEventListener('click', () => {
      localStorage.setItem('cookiesAceitos', 'true');
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 500);
    });
  }
}

initCookieBanner();