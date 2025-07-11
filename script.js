console.log("Maias Mult-Service carregado com sucesso!");

// --- BOTÃO FLOTANTE DO WHATSAPP ---
const whatsappBtn = document.createElement('div');
whatsappBtn.className = 'whatsapp-float';
whatsappBtn.innerHTML = `
  <a href="https://wa.me/258870779922" target="_blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
  </a>
`;
document.body.appendChild(whatsappBtn);

// --- REVELA SEÇÕES AO ROLAR ---
function revealOnScroll() {
  const sections = document.querySelectorAll('section');
  const trigger = window.innerHeight * 0.9;

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < trigger && !section.classList.contains('visible')) {
      section.classList.add('visible');
    }
  });
}

// Evento de scroll para ativar as seções
window.addEventListener('scroll', revealOnScroll);

// Evento de carregamento inicial
window.addEventListener('load', () => {
  revealOnScroll();
  carregarAvisos();
  iniciarCarrosseis();
});

// --- CARREGAMENTO DE AVISOS DINÂMICOS ---
function carregarAvisos() {
  fetch('dados.json')
    .then(res => res.json())
    .then(dados => {
      const lista = document.getElementById('lista-avisos');
      if (lista && dados.avisos) {
        dados.avisos.forEach(msg => {
          const li = document.createElement('li');
          li.textContent = msg;
          lista.appendChild(li);
        });
      }
    })
    .catch(err => console.error('Erro ao carregar avisos:', err));
}

// --- CARROSSEL DE IMAGENS (vários ao mesmo tempo) ---
function iniciarCarrosseis() {
  const carrosseis = document.querySelectorAll('.carrossel');

  carrosseis.forEach(carrossel => {
    const slides = carrossel.querySelectorAll('.slide');
    let index = 0;

    if (slides.length <= 1) return; // Evita loop desnecessário

    setInterval(() => {
      slides[index].classList.remove('active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('active');
    }, 5000);
  });
}

// --- FAQ Toggle ---
// Expondo a função para funcionar com onclick inline no HTML
window.toggleFAQ = function(el) {
  const p = el.nextElementSibling;
  if (!p) return;
  
  if (p.style.display === 'block') {
    p.style.display = 'none';
  } else {
    p.style.display = 'block';
  }
};

// --- Filtro de Produtos ---
document.querySelectorAll('.filtro-btn').forEach(botao => {
  botao.addEventListener('click', () => {
    const filtro = botao.dataset.filtro;
    const produtos = document.querySelectorAll('.produto');

    // Atualiza os botões ativos
    document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
    botao.classList.add('active');

    produtos.forEach(produto => {
      if (filtro === 'todos' || produto.classList.contains(filtro)) {
        produto.style.display = 'block';
      } else {
        produto.style.display = 'none';
      }
    });
  });
});
