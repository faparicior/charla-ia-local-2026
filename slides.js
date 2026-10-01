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
  const btnDualMode = document.getElementById('btn-dual-mode');

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

  // Cargar preferencia de Modo Dual (Charla por defecto / Documento opcional)
  let isDocumentMode = localStorage.getItem('deck-doc-mode') === 'true';
  if (isDocumentMode) {
    document.body.classList.add('mode-document');
  }

  function updateDualModeUI() {
    if (btnDualMode) {
      btnDualMode.innerHTML = isDocumentMode ? '📖' : '⚡';
      btnDualMode.title = isDocumentMode
        ? 'Modo Documento activo (D para Modo Charla)'
        : 'Modo Charla activo (D para Modo Documento)';
    }
    document.querySelectorAll('.btn-toggle-doc').forEach(btn => {
      btn.innerHTML = isDocumentMode ? '⚡ Modo Charla' : '🔍 Ver Documento Completo';
      btn.title = isDocumentMode ? 'Volver a vista simplificada de charla (D)' : 'Ver tabla y notas completas (D)';
    });
  }

  function toggleDocumentMode(forceState) {
    isDocumentMode = typeof forceState === 'boolean' ? forceState : !isDocumentMode;
    document.body.classList.toggle('mode-document', isDocumentMode);
    localStorage.setItem('deck-doc-mode', isDocumentMode ? 'true' : 'false');
    updateDualModeUI();
    // Al volver a Modo Charla desde una slide doc-only, ir a la visible más cercana
    if (!isDocumentMode && isSlideHidden(slides[currentIndex])) {
      goToSlide(nearestVisibleIndex(currentIndex, 'forward'), true, 'forward');
    }
  }

  updateDualModeUI();

  const hasSlide0 = slides[0]?.id === 'slide-0';
  if (totalCounter) {
    totalCounter.textContent = hasSlide0 ? (slides.length - 1) : slides.length;
  }

  // Reiniciar animación del GIF de crash (slide-0)
  function restartCrashGif() {
    const crashImg = document.getElementById('car-crash-img');
    if (!crashImg || !crashImg.parentNode) return;
    const parent = crashImg.parentNode;
    const clone = crashImg.cloneNode(true);
    parent.replaceChild(clone, crashImg);
  }

  // Leer slide desde URL Hash (#0, #1, #21, #slide-pillar-intro, o #last = última slide)
  function getSlideIndexFromHash() {
    let rawHash = window.location.hash.replace('#', '').trim();
    if (!rawHash) return 0;
    if (rawHash === 'last') {
      return slides.length - 1;
    }
    // Prioridad 1: Coincidencia exacta por ID semántico de slide (ej: slide-0, slide-1, slide-pillar-intro)
    const exactIndex = slides.findIndex(s => s.id === rawHash || s.id === `slide-${rawHash}`);
    if (exactIndex !== -1) {
      return exactIndex;
    }
    // Prioridad 2: Si el hash es 0
    if (rawHash === '0') {
      return 0;
    }
    // Prioridad 3: Si es numérico puro (#1, #21)
    if (/^\d+$/.test(rawHash)) {
      const num = parseInt(rawHash, 10);
      if (hasSlide0) {
        if (num >= 0 && num < slides.length) {
          return num;
        }
      } else {
        if (num >= 1 && num <= slides.length) {
          return num - 1;
        }
      }
    }
    return 0;
  }

  function updateHUD() {
    if (hasSlide0) {
      currentCounter.textContent = currentIndex;
      const totalUseful = Math.max(1, slides.length - 1);
      const progress = (currentIndex / totalUseful) * 100;
      progressBar.style.width = `${progress}%`;
    } else {
      currentCounter.textContent = currentIndex + 1;
      const progress = ((currentIndex + 1) / slides.length) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }

  function updateStepsStatus(slide) {
    if (!slide) return;
    const steps = Array.from(slide.querySelectorAll('.step'));
    steps.forEach(s => s.classList.remove('step-current'));
    const activeSteps = steps.filter(s => s.classList.contains('step-active'));
    if (activeSteps.length > 0) {
      activeSteps[activeSteps.length - 1].classList.add('step-current');
    }
    slide.setAttribute('data-active-steps', activeSteps.length);

    // Sincronizar segmentos visuales de barras si existen
    const segments = slide.querySelectorAll('.rect-bar-segment[data-step]');
    segments.forEach(seg => {
      const sNum = parseInt(seg.getAttribute('data-step'), 10);
      const colStep = slide.querySelector(`.rect-col[data-step="${sNum}"]`);
      if (colStep && colStep.classList.contains('step-active')) {
        seg.classList.add('segment-active');
      } else {
        seg.classList.remove('segment-active');
      }
    });
  }

  function goToSlide(index, updateHistory = true, direction = 'forward') {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;

    // En Modo Charla, las slides marcadas .doc-only no se muestran: redirigir a la
    // visible más cercana (respetando la dirección de la navegación)
    if (isSlideHidden(slides[index])) {
      index = nearestVisibleIndex(index, direction === 'backward' ? 'backward' : 'forward');
    }

    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
        const steps = Array.from(slide.querySelectorAll('.step'));
        if (steps.length > 0) {
          if (direction === 'backward') {
            steps.forEach(s => s.classList.add('step-active'));
          } else {
            steps.forEach(s => s.classList.remove('step-active'));
          }
          updateStepsStatus(slide);
        }
      } else {
        slide.classList.remove('active');
      }
    });

    currentIndex = index;
    updateHUD();

    if (slides[currentIndex]?.id === 'slide-0') {
      restartCrashGif();
    }

    if (updateHistory) {
      // Usar el ID semántico de la slide (#slide-13-autoround, #slide-41, #slide-0...)
      // para que el hash siempre resuelva de vuelta a la MISMA slide.
      // (Un hash numérico se resuelve por ID semántico en getSlideIndexFromHash,
      //  y en la parte 1 los IDs no coinciden con la posición DOM → teletransportes).
      const slideId = slides[currentIndex]?.id;
      if (slideId) {
        window.location.hash = slideId;
      } else if (hasSlide0) {
        window.location.hash = currentIndex.toString();
      } else {
        window.location.hash = (currentIndex + 1).toString();
      }
    }
  }

  // Slides "solo documento" (clase .doc-only en la <section>): ocultas en Modo Charla,
  // visibles en Modo Documento y en export/PDF. El contador sigue siendo el número global
  // de slide (coincide con el ID y con el guion) y salta las ocultas.
  function isSlideHidden(slide) {
    return !isDocumentMode && slide?.classList.contains('doc-only');
  }

  function nearestVisibleIndex(index, preferDir = 'forward') {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    if (!isSlideHidden(slides[index])) return index;
    for (let d = 1; d < slides.length; d++) {
      if (preferDir === 'backward') {
        const back = index - d;
        if (back >= 0 && !isSlideHidden(slides[back])) return back;
        const fwd = index + d;
        if (fwd < slides.length && !isSlideHidden(slides[fwd])) return fwd;
      } else {
        const fwd = index + d;
        if (fwd < slides.length && !isSlideHidden(slides[fwd])) return fwd;
        const back = index - d;
        if (back >= 0 && !isSlideHidden(slides[back])) return back;
      }
    }
    return index;
  }

  function nextSlide() {
    if (isOverview) {
      toggleOverview(false);
    }
    const activeSlide = slides[currentIndex];
    if (activeSlide) {
      const nextUnactiveStep = activeSlide.querySelector('.step:not(.step-active)');
      if (nextUnactiveStep) {
        nextUnactiveStep.classList.add('step-active');
        updateStepsStatus(activeSlide);
        return;
      }
    }
    // Saltar las slides doc-only en Modo Charla
    let target = currentIndex + 1;
    while (target < slides.length && isSlideHidden(slides[target])) target++;
    if (target < slides.length) {
      goToSlide(target, true, 'forward');
    } else if (document.body.dataset.nextDeck) {
      window.location.href = document.body.dataset.nextDeck;
    }
  }

  function prevSlide() {
    if (isOverview) {
      toggleOverview(false);
    }
    const activeSlide = slides[currentIndex];
    if (activeSlide) {
      const activeSteps = Array.from(activeSlide.querySelectorAll('.step.step-active'));
      if (activeSteps.length > 0) {
        activeSteps[activeSteps.length - 1].classList.remove('step-active');
        updateStepsStatus(activeSlide);
        return;
      }
    }
    // Saltar las slides doc-only en Modo Charla
    let target = currentIndex - 1;
    while (target >= 0 && isSlideHidden(slides[target])) target--;
    if (target >= 0) {
      goToSlide(target, true, 'backward');
    } else if (document.body.dataset.prevDeck) {
      window.location.href = document.body.dataset.prevDeck;
    }
  }

  const BASE_WIDTH = 1920;
  const BASE_HEIGHT = 1080;

  function updateScale() {
    if (isOverview) return;
    // Dejar margen de seguridad tanto horizontal como vertical para el HUD y posibles marcos
    const availableWidth = window.innerWidth * 0.94;
    const availableHeight = window.innerHeight * 0.86;
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
  btnDualMode?.addEventListener('click', () => toggleDocumentMode());
  btnPdf?.addEventListener('click', () => {
    if (isOverview) toggleOverview(false);
    window.print();
  });
  btnHelp?.addEventListener('click', () => toggleHelp());

  // Delegación de clic para botones locales de cambio de modo en diapositivas
  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.btn-toggle-doc');
    if (toggleBtn) {
      e.preventDefault();
      toggleDocumentMode();
    }
  });

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
      case 'd':
      case 'D':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          toggleDocumentMode();
        }
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
      const dir = target < currentIndex ? 'backward' : 'forward';
      goToSlide(target, false, dir);
    }
  });

  // Click interactivo directo en cualquier elemento .step de la slide activa
  document.querySelectorAll('.slide .step').forEach(step => {
    step.addEventListener('click', (e) => {
      if (isOverview) return;
      const slide = step.closest('.slide');
      if (!slide || !slide.classList.contains('active')) return;

      const steps = Array.from(slide.querySelectorAll('.step'));
      const targetIdx = steps.indexOf(step);
      if (targetIdx !== -1) {
        steps.forEach((s, idx) => {
          if (idx <= targetIdx) {
            s.classList.add('step-active');
          } else {
            s.classList.remove('step-active');
          }
        });
        updateStepsStatus(slide);
      }
    });
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

  // Toggle interactivo de vista Limpia vs Detallada en Los 3 Pilares
  const pillarsViewport = document.querySelector('.three-pillars-viewport');
  if (pillarsViewport) {
    const toggleBtns = pillarsViewport.querySelectorAll('.pillars-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = btn.dataset.target;
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (target === 'detailed') {
          pillarsViewport.classList.add('show-detailed');
        } else {
          pillarsViewport.classList.remove('show-detailed');
        }
      });
    });
  }

  // Click interactivo directo en la imagen del crash (slide-0) para repetir
  const crashBox = document.getElementById('car-crash-box');
  if (crashBox) {
    crashBox.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      restartCrashGif();
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
