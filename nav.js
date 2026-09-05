// Global Navigation Script for Mad Monkey AI Pages
function initMadMonkeyNav() {
  const toggle = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const closeBtn = document.getElementById('mobileNavCloseBtn');

  if (!toggle || !drawer) return;

  function openMenu() {
    drawer.classList.add('show');
    toggle.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('show');
    toggle.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (drawer.classList.contains('show')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  if (backdrop) backdrop.addEventListener('click', closeMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close when tapping any link inside the mobile drawer
  drawer.querySelectorAll('.mobile-nav-link, .mobile-nav-cta-btn').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('show')) {
      closeMenu();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMadMonkeyNav);
} else {
  initMadMonkeyNav();
}
