const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

function setMenuOpen(open) {
  menu.setAttribute('aria-expanded', String(open));
}

menu.addEventListener('click', () => {
  setMenuOpen(menu.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || menu.getAttribute('aria-expanded') !== 'true') return;
  const section = document.querySelector(link.hash);
  if (section) {
    section.setAttribute('tabindex', '-1');
    section.focus({ preventScroll: true });
  }
  setMenuOpen(false);
});

document.querySelector('.site-header').addEventListener('keydown', event => {
  if (event.key !== 'Escape' || menu.getAttribute('aria-expanded') !== 'true') return;
  setMenuOpen(false);
  menu.focus();
});
