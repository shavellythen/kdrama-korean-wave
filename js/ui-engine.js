(function () {

  // Progress bar
  const progressBar = document.getElementById('progressBar');
  function updateProgress() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.min(100, (window.scrollY / docHeight) * 100);
    if (progressBar) progressBar.style.width = pct + '%';
  }

  window.addEventListener('scroll', function () {
    requestAnimationFrame(updateProgress);
  });
  updateProgress();

  // Fade-in on scroll
  const fadeEls = document.querySelectorAll('.fade-in');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(el => obs.observe(el));

})();
