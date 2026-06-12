/**
 * main.js - RafiFolio
 * @author Rafi Haikal Pratama
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ── */
  const navbar = document.querySelector('.custom-navbar');
  window.addEventListener('scroll', () => {
    navbar.style.borderBottomColor = window.scrollY > 50
      ? 'rgba(204,0,24,0.5)'
      : 'rgba(204,0,24,0.3)';
  });

  /* ── Skill bars animate on scroll ── */
  const skillBars = document.querySelectorAll('.progress-bar');
  if (skillBars.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const bar = e.target;
          const target = bar.getAttribute('aria-valuenow') + '%';
          setTimeout(() => { bar.style.width = target; }, 200);
          io.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    skillBars.forEach(b => { b.style.width = '0'; b.style.transition = 'width 1.2s ease'; io.observe(b); });
  }

  /* ── Portfolio filter (data-filter attribute approach) ── */
  const filterBtns = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const col = card.closest('[data-aos], .col-md-6, .col-lg-4') || card;
        const cats = card.dataset.category || '';
        if (filter === 'all' || cats.includes(filter)) {
          col.style.display = '';
          col.style.animation = 'fadeUp .4s ease forwards';
        } else {
          col.style.display = 'none';
        }
      });
    });
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ── Contact form feedback ── */
  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check me-2"></i>TERKIRIM!';
      btn.disabled = true;
      btn.style.background = '#22c55e';
      setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; btn.style.background = ''; form.reset(); }, 3000);
    });
  }

  /* ── AOS init (if loaded) ── */
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 600, once: true, offset: 60 });
  }

});