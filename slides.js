/**
 * Presentación Tech - Motor de Diapositivas
 * ai-local-crafters
 */

function initDeck() {
  const slides = Array.from(document.querySelectorAll('.slide'));
  if (!slides.length) return;

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

  if (totalCounter) {
    totalCounter.textContent = slides.length;
  }

  // Leer slide desde URL Hash (#1 o #slide-1 = slide 0, o #last = última slide)
  function getSlideIndexFromHash() {
    let hash = window.location.hash.replace('#', '').trim();
    if (hash === 'last') {
      return slides.length - 1;
    }
    if (hash.startsWith('slide-')) {
      hash = hash.replace('slide-', '');
    }
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
    } else if (document.body.dataset.nextDeck) {
      window.location.href = document.body.dataset.nextDeck;
    }
  }

  function prevSlide() {
    if (isOverview) {
      toggleOverview(false);
    }
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else if (document.body.dataset.prevDeck) {
      window.location.href = document.body.dataset.prevDeck;
    }
  }

  const BASE_WIDTH = 1920;
  const BASE_HEIGHT = 1080;

  function updateScale() {
    if (isOverview) return;
    const availableWidth = window.innerWidth * 0.96;
    const availableHeight = window.innerHeight * 0.92;
    const scale = Math.min(availableWidth / BASE_WIDTH, availableHeight / BASE_HEIGHT);
    document.documentElement.style.setProperty('--slide-scale', scale.toFixed(4));
  }

  window.addEventListener('resize', updateScale);
  window.addEventListener('orientationchange', updateScale);
  document.addEventListener('fullscreenchange', updateScale);

  function toggleOverview(forceState) {
    isOverview = typeof forceState === 'boolean' ? forceState : !isOverview;
    document.body.classList.toggle('overview-mode', isOverview);

    if (isOverview) {
      // Scroll suave hasta la slide actual en overview
      slides[currentIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      updateScale();
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

  // Atajos de teclado para navegación y controles
  document.addEventListener('keydown', (e) => {
    // Lightbox de imágenes de plantillas
    const lightbox = document.getElementById('template-lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') {
        e.preventDefault();
        lightbox.classList.remove('active');
        return;
      }
    }

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

  // Lightbox interactivo para imágenes de plantillas
  const lightboxElem = document.getElementById('template-lightbox');
  const lightboxImg = document.getElementById('template-lightbox-img');

  document.querySelectorAll('.template-preview-img-box').forEach(box => {
    box.addEventListener('click', (e) => {
      e.stopPropagation();
      const img = box.querySelector('img');
      if (img && lightboxElem && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxElem.classList.add('active');
      }
    });
  });

  if (lightboxElem) {
    lightboxElem.addEventListener('click', () => {
      lightboxElem.classList.remove('active');
    });
  }

  // Inicializar en la slide correspondiente y calcular escala
  updateScale();
  const initialIndex = getSlideIndexFromHash();
  goToSlide(initialIndex, false);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDeck);
} else {
  initDeck();
}
