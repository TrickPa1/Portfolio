// --- Menu Mobile ---
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
  menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
  };
}

// --- Cursor Kunai + Rastro de Partículas ---
const kunaiCursor = document.getElementById('kunai-cursor');
const particleCanvas = document.getElementById('particle-canvas');
const ctx = particleCanvas.getContext('2d');

function resizeCanvas() {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let particles = [];

class NinjaParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 2;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = (Math.random() - 0.5) * 1.5;
    // Cores que combinam com seu gradiente (#009dff e #ff00ff)
    this.color = Math.random() > 0.5 ? 'rgba(0, 157, 255,' : 'rgba(255, 0, 255,';
    this.opacity = 0.8;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.025;
    if (this.size > 0.2) this.size -= 0.05;
  }

  draw() {
    ctx.fillStyle = this.color + this.opacity + ')';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

let lastX = 0;
let lastY = 0;

window.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  if (kunaiCursor) {
    kunaiCursor.style.display = 'block';
    kunaiCursor.style.left = x + 'px';
    kunaiCursor.style.top = y + 'px';

    const deltaX = x - lastX;
    const deltaY = y - lastY;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
      kunaiCursor.style.transform = `rotate(${angle + 45}deg)`;
      for (let i = 0; i < 2; i++) {
        particles.push(new NinjaParticle(x, y));
      }
    }
  }

  lastX = x;
  lastY = y;
});

window.addEventListener('mousedown', () => {
  if (kunaiCursor) {
    kunaiCursor.classList.add('slashing');
    for (let i = 0; i < 12; i++) {
      particles.push(new NinjaParticle(lastX, lastY));
    }
  }
});

window.addEventListener('mouseup', () => {
  if (kunaiCursor) {
    kunaiCursor.classList.remove('slashing');
  }
});

function animateParticles() {
  ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].opacity <= 0 || particles[i].size <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animateParticles);
}

animateParticles();

// --- Lógica do Botão de Contacto ---
const submitBtn = document.querySelector('#submit-btn');
const userEmailInput = document.querySelector('#user-email');

if (submitBtn && userEmailInput) {
    submitBtn.addEventListener('click', () => {
        const userEmail = userEmailInput.value.trim();
        
        const meuEmail = "patricklanga47@gmail.com";

        if (userEmail === "") {
            alert("Por favor, digite o seu e-mail antes de submeter!");
            return;
        }

        // Validação simples de formato de e-mail
        if (!userEmail.includes('@') || !userEmail.includes('.')) {
            alert("Por favor, insira um endereço de e-mail válido!");
            return;
        }

        // Assunto e corpo da mensagem
        const subject = encodeURIComponent("Contacto via Portfólio");
        const body = encodeURIComponent(`Olá Patrick,\n\nMeu e-mail para contacto é: ${userEmail}\n\nGostaria de conversar sobre um projeto/oportunidade.`);

        // Abre o leitor de e-mail padrão do sistema
        window.location.href = `mailto:${meuEmail}?subject=${subject}&body=${body}`;
    });
}