/**
 * ===================================================================
 * SUPERHERO & ADVENTURE QUEST PARALLAX ENGINE
 * Interactive 3D Card Tilt, Parallax Layers, Sound FX, Particles
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------------
  // 1. WEB AUDIO API SYNTHESIZER (Sci-Fi Sound FX without audio files)
  // ---------------------------------------------------------------
  let soundEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSynthSound(type) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'hover') {
        // High-tech subtle chirp
        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(720, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'click') {
        // Heroic power pulse
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.16);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'success') {
        // Quest completed fanfare tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      }
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Sound toggle button
  const soundToggleBtn = document.getElementById('soundToggle');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      const icon = soundToggleBtn.querySelector('i');
      if (soundEnabled) {
        if (icon) icon.className = 'fa-solid fa-volume-high';
        playSynthSound('success');
        showSignalToast('🔊 Audio FX: Activated');
      } else {
        if (icon) icon.className = 'fa-solid fa-volume-xmark';
        showSignalToast('🔇 Audio FX: Muted');
      }
    });
  }

  // Attach hover sounds to buttons and cards
  const interactiveElements = document.querySelectorAll(
    'button, .btn-quest-primary, .btn-quest-ghost, .btn-summon-hero, .btn-filter, .hero-stat-badge, .nav-quest-menu a, .summon-channel-item'
  );
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => playSynthSound('hover'));
    el.addEventListener('click', () => playSynthSound('click'));
  });

  // ---------------------------------------------------------------
  // 2. INTERACTIVE COSMIC CANVAS (Floating Energy Particles)
  // ---------------------------------------------------------------
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 60);

    const colors = ['#00f2fe', '#ffbe1a', '#ff3366', '#00f0aa'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.005;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.8, p.alpha));
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  // ---------------------------------------------------------------
  // 3. PARALLAX SCROLL & POWER PROGRESS BAR
  // ---------------------------------------------------------------
  const progressBar = document.getElementById('powerProgress');
  const parallaxBadges = document.querySelectorAll('.parallax-badge');
  const navbar = document.querySelector('.hero-nav');
  const backToOrbitBtn = document.getElementById('backToOrbit');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / docHeight) * 100;

    // Update power bar
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // Navbar style on scroll
    if (scrollY > 50) {
      navbar?.classList.add('nav-scrolled');
    } else {
      navbar?.classList.remove('nav-scrolled');
    }

    // Back to top button visibility
    if (scrollY > 400) {
      backToOrbitBtn?.classList.add('active');
    } else {
      backToOrbitBtn?.classList.remove('active');
    }

    // Parallax badges movement at distinct speeds
    parallaxBadges.forEach(badge => {
      const speed = parseFloat(badge.getAttribute('data-speed') || '0.2');
      const offset = scrollY * speed;
      badge.style.transform = `translateY(${offset}px) rotate(${offset * 0.2}deg)`;
    });
  });

  // Back to top click
  backToOrbitBtn?.addEventListener('click', () => {
    playSynthSound('success');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // ---------------------------------------------------------------
  // 4. 3D CARD TILT PARALLAX (Mouse Movement)
  // ---------------------------------------------------------------
  const tiltCards = document.querySelectorAll(
    '.hero-dossier-card, .epic-project-card, .arsenal-card, .origin-lore-card'
  );

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });

  // ---------------------------------------------------------------
  // 5. PROJECT CATEGORY FILTER (ALL / WEB / MOBILE / IT)
  // ---------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.btn-filter');
  const projectCards = document.querySelectorAll('.epic-project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          card.style.animation = 'cardFadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ---------------------------------------------------------------
  // 6. COPY TO CLIPBOARD & HUD SIGNAL TOAST
  // ---------------------------------------------------------------
  const toastSignal = document.getElementById('toastSignal');
  function showSignalToast(msg) {
    if (!toastSignal) return;
    toastSignal.innerHTML = msg;
    toastSignal.classList.add('show');
    setTimeout(() => {
      toastSignal.classList.remove('show');
    }, 3200);
  }

  const copyElements = document.querySelectorAll('[data-copy]');
  copyElements.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          playSynthSound('success');
          showSignalToast(`⚡ Telemetry Copied: <strong>${textToCopy}</strong>`);
        }).catch(() => {
          showSignalToast(`Telemetry: ${textToCopy}`);
        });
      }
    });
  });

  // ---------------------------------------------------------------
  // 7. MOBILE NAVIGATION MENU
  // ---------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navQuestMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // ---------------------------------------------------------------
  // 8. ACTIVE NAV LINK ON SCROLL
  // ---------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-quest-menu a[href^="#"]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.pageYOffset + 220;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
});
