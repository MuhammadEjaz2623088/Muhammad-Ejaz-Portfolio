const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce) {
  const targets = document.querySelectorAll('section, article, .rounded-2xl');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal', 'is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach((el) => { el.classList.add('reveal'); io.observe(el); });
}

 document.querySelectorAll('#mobileMenu a').forEach(a=>a.addEventListener('click',()=>{const m=document.getElementById('mobileMenu'); if(m) m.classList.add('hidden');}));
