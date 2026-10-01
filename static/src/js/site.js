// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  if (!toggle) return;

  var header = toggle.closest('header');

  function setOpen(open) {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Escape closes the menu and returns focus to the button
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('menu-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset if the window grows past the mobile breakpoint
  window.matchMedia('(min-width: 768px)').addEventListener('change', function (e) {
    if (e.matches) setOpen(false);
  });
});
