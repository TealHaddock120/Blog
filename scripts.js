// Toggle menú móvil
const btnMenu = document.getElementById('btn-menu');
const nav = document.querySelector('.main-nav');

btnMenu?.addEventListener('click', () => {
  nav.classList.toggle('open');
});
