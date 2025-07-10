console.log("Maias Mult-Service carregado com sucesso!");

const whatsappBtn = document.createElement('div');
whatsappBtn.className = 'whatsapp-float';
whatsappBtn.innerHTML = `
  <a href="https://wa.me/258870779922" target="_blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
  </a>
`;
document.body.appendChild(whatsappBtn);

function revealOnScroll() {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.9;
    if (top < trigger) {
      section.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
  revealOnScroll();
  carregarAvisos();
});


function carregarAvisos() {
  fetch('dados.json')
    .then(res => res.json())
    .then(dados => {
      const lista = document.getElementById('lista-avisos');
      if (lista && dados.avisos) {
        lista.innerHTML = ''; // 🧽 Limpa a lista antes de adicionar os novos avisos
        dados.avisos.forEach(msg => {
          const li = document.createElement('li');
          li.textContent = msg;
          lista.appendChild(li);
        });
      }
    })

    function toggleFAQ(element) {
  const para = element.nextElementSibling;
  para.style.display = (para.style.display === "block") ? "none" : "block";
}

    .catch(err => console.error('Erro ao carregar dados:', err));
}

