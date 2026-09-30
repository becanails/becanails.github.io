const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const bookingForm = document.querySelector('#booking-form');
const formStatus = document.querySelector('#form-status');
const dateInput = document.querySelector('#preferred-date');
const yearLabel = document.querySelector('#current-year');
const imageDialog = document.querySelector('#image-dialog');
const dialogImage = imageDialog.querySelector('img');
const whatsappNumber = '';

if (yearLabel) yearLabel.textContent = new Date().getFullYear();
if (dateInput) dateInput.min = new Date().toISOString().slice(0, 10);

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  mainNav.classList.toggle('is-open', !isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    mainNav.classList.remove('is-open');
  });
});

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('#service-choice').value = link.dataset.service;
  });
});

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const message = [
    'Olá, Beca Nails! Gostaria de pedir uma marcação.',
    `Nome: ${formData.get('name')}`,
    `Serviço: ${formData.get('service')}`,
    `Dia preferido: ${formData.get('date')}`,
    `Período: ${formData.get('time')}`,
  ].join('\n');
  const destination = whatsappNumber ? `${whatsappNumber}?` : '?';
  const whatsappUrl = `https://wa.me/${destination}text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  formStatus.textContent = 'O seu pedido está pronto para continuar no WhatsApp.';
});

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    dialogImage.src = item.dataset.fullImage;
    dialogImage.alt = item.querySelector('img').alt;
    imageDialog.showModal();
  });
});

imageDialog.querySelector('.image-dialog__close').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', (event) => {
  if (event.target === imageDialog) imageDialog.close();
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'));
}
