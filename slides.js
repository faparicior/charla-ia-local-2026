/**
 * Presentación Tech - Motor de Diapositivas
 * ai-local-crafters
 */

document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const progressBar = document.getElementById('progress-bar');
  const currentCounter = document.getElementById('slide-current');
  const totalCounter = document.getElementById('slide-total');
  const helpModal = document.getElementById('help-modal');

  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnOverview = document.getElementById('btn-overview');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const btnTheme = document.getElementById('btn-theme');
  const btnPdf = document.getElementById('btn-pdf');
  const btnHelp = document.getElementById('btn-help');

  let currentIndex = 0;
  let isOverview = false;

  // Cargar preferencia de tema (Solarized Light por defecto)
  const savedTheme = localStorage.getItem('deck-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('theme-dark');
  }

  function toggleTheme() {
    const isDark = document.body.classList.toggle('theme-dark');
    localStorage.setItem('deck-theme', isDark ? 'dark' : 'light');
  }

  totalCounter.textContent = slides.length;

  // Leer slide desde URL Hash (#1 = slide 0)
  function getSlideIndexFromHash() {
    const hash = window.location.hash.replace('#', '');
    const num = parseInt(hash, 10);
    if (!isNaN(num) && num >= 1 && num <= slides.length) {
      return num - 1;
    }
    return 0;
  }

  function updateHUD() {
    currentCounter.textContent = currentIndex + 1;
    const progress = ((currentIndex + 1) / slides.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  function goToSlide(index, updateHistory = true) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;

    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    currentIndex = index;
    updateHUD();

    if (updateHistory) {
      window.location.hash = (currentIndex + 1).toString();
    }
  }

  function nextSlide() {
    if (isOverview) {
      toggleOverview(false);
    }
    if (currentIndex < slides.length - 1) {
      goToSlide(currentIndex + 1);
    }
  }

  function prevSlide() {
    if (isOverview) {
      toggleOverview(false);
    }
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }

  function toggleOverview(forceState) {
    isOverview = typeof forceState === 'boolean' ? forceState : !isOverview;
    document.body.classList.toggle('overview-mode', isOverview);

    if (isOverview) {
      // Scroll suave hasta la slide actual en overview
      slides[currentIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  function toggleHelp(forceState) {
    const shouldOpen = typeof forceState === 'boolean' ? forceState : !helpModal.classList.contains('open');
    helpModal.classList.toggle('open', shouldOpen);
  }

  // Click en slides dentro del modo Overview
  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      if (isOverview) {
        goToSlide(index);
        toggleOverview(false);
      }
    });
  });

  // Event Listeners de Botones HUD
  btnPrev?.addEventListener('click', prevSlide);
  btnNext?.addEventListener('click', nextSlide);
  btnOverview?.addEventListener('click', () => toggleOverview());
  btnFullscreen?.addEventListener('click', toggleFullscreen);
  btnTheme?.addEventListener('click', toggleTheme);
  btnPdf?.addEventListener('click', () => {
    if (isOverview) toggleOverview(false);
    window.print();
  });
  btnHelp?.addEventListener('click', () => toggleHelp());

  helpModal?.addEventListener('click', (e) => {
    if (e.target === helpModal) toggleHelp(false);
  });

  // Atajos de teclado
  window.addEventListener('keydown', (e) => {
    // Si el modal de ayuda está abierto y pulsan Esc o ?, cerrarlo
    if (helpModal.classList.contains('open')) {
      if (e.key === 'Escape' || e.key === '?') {
        e.preventDefault();
        toggleHelp(false);
        return;
      }
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case ' ': // Spacebar
        e.preventDefault();
        if (e.shiftKey) {
          prevSlide();
        } else {
          nextSlide();
        }
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(slides.length - 1);
        break;
      case 'o':
      case 'O':
        e.preventDefault();
        toggleOverview();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 't':
      case 'T':
        e.preventDefault();
        toggleTheme();
        break;
      case 'p':
      case 'P':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          if (isOverview) toggleOverview(false);
          window.print();
        }
        break;
      case '?':
      case 'h':
      case 'H':
        e.preventDefault();
        toggleHelp();
        break;
      case 'Escape':
        if (isOverview) toggleOverview(false);
        break;
    }
  });

  // Navegación táctil (Swipe)
  let touchStartX = 0;
  let touchEndX = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  }

  // Sincronización con Hash al cambiar manualmente
  window.addEventListener('hashchange', () => {
    const target = getSlideIndexFromHash();
    if (target !== currentIndex) {
      goToSlide(target, false);
    }
  });

  // Inicializar en la slide correspondiente
  const initialIndex = getSlideIndexFromHash();
  goToSlide(initialIndex, false);
});
