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

// Books page: "Notify Me" reveals the email form, which posts to Netlify Forms
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.notify-toggle');
  var form = document.getElementById('notify-form');
  if (!toggle || !form) return;

  var status = form.querySelector('.notify-form__status');
  var submit = form.querySelector('button[type="submit"]');

  toggle.addEventListener('click', function () {
    var open = form.hidden;
    form.hidden = !open;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) form.querySelector('input[type="email"]').focus();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submit.disabled = true;
    status.textContent = '';

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.textContent = 'Thanks! You’re on the list.';
      })
      .catch(function () {
        status.textContent = 'Something went wrong. Please try again.';
      })
      .finally(function () {
        submit.disabled = false;
      });
  });
});
