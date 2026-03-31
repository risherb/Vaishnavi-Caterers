// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFadeIn();
  initMenuTabs();
  initMobileMenu();
  initContactForm();
  initSmoothScroll();
  initClientLogos();
});

// ===== STICKY NAVBAR =====
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== FADE-IN ON SCROLL =====
function initFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ===== MENU TABS =====
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      panels.forEach(p => {
        p.style.display = p.dataset.panel === target ? 'grid' : 'none';
      });
    });
  });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const eventType = form.querySelector('#eventType').value;
    const message = form.querySelector('#message').value.trim();

    if (!name || !phone) {
      showToast('Please fill in your name and phone number.', 'error');
      return;
    }

    // Build WhatsApp message
    const waMessage = `Hi, I'm ${name}.%0A` +
      `Phone: ${phone}%0A` +
      `Event: ${eventType}%0A` +
      `Message: ${message}`;
    
    const waUrl = `https://wa.me/919819321750?text=${waMessage}`;
    window.open(waUrl, '_blank');
    
    showToast('Redirecting to WhatsApp...', 'success');
    form.reset();
  });
}

// ===== TOAST NOTIFICATION =====
function showToast(msg, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 100px; right: 28px; z-index: 9999;
    padding: 14px 28px; border-radius: 12px; font-size: 0.9rem; font-weight: 500;
    color: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    animation: slideInToast 0.3s ease;
    background: ${type === 'success' ? '#25D366' : '#FF4444'};
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== CLIENT LOGOS =====
function initClientLogos() {
  const clients = [
    { name: 'L&T Infotech', domain: 'ltimindtree.com' },
    { name: 'Cipla', domain: 'cipla.com' },
    { name: 'ABB', domain: 'abb.com' },
    { name: 'MTNL', domain: 'mtnl.net.in' },
    { name: 'Mahindra & Mahindra', domain: 'mahindra.com' },
    { name: 'Asahi India Glass', domain: 'aisglass.com' },
    { name: 'Dulux', domain: 'dulux.co.in' },
    { name: 'Mazda', domain: 'mazda.com' },
    { name: 'Welspun', domain: 'welspun.com' },
    { name: 'Hoerbiger', domain: 'hoerbiger.com' },
    { name: 'Sterling College', domain: null },
    { name: 'L&T Electrical', domain: 'larsentoubro.com' },
    { name: 'Gala', domain: null },
    { name: 'Bhushan Steel', domain: null },
    { name: 'Asian Paints', domain: 'asianpaints.com' },
    { name: 'CMS Computers', domain: null },
    { name: 'Parker', domain: 'parker.com' },
    { name: 'Zydus', domain: 'zyduslife.com' },
    { name: 'Takeda', domain: 'takeda.com' },
    { name: 'Savita', domain: 'savita.com' },
    { name: 'AkzoNobel', domain: 'akzonobel.com' },
    { name: 'Tata Memorial Hospital', domain: 'tmc.gov.in' },
    { name: 'ACTREC', domain: 'actrec.gov.in' },
    { name: 'Indoco Remedies', domain: 'indoco.com' },
    { name: 'Nelco', domain: 'nelco.in' },
    { name: 'SPACO', domain: null },
    { name: 'Equus', domain: null },
    { name: 'Macsteel', domain: 'macsteel.co.za' },
  ];

  const grid = document.getElementById('clienteleGrid');
  if (!grid) return;

  clients.forEach(client => {
    const div = document.createElement('div');
    div.className = 'client-logo';
    
    if (client.domain) {
      const img = document.createElement('img');
      img.src = `https://logo.clearbit.com/${client.domain}`;
      img.alt = client.name;
      img.loading = 'lazy';
      img.onerror = function() {
        this.parentElement.innerHTML = `<span class="fallback-text">${client.name}</span>`;
      };
      div.appendChild(img);
    } else {
      div.innerHTML = `<span class="fallback-text">${client.name}</span>`;
    }
    
    grid.appendChild(div);
  });
}
