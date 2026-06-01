/* ====================================================
   HAFIN PAROKKOT PORTFOLIO – script.js
   All interactions, animations & dynamic behavior
   ==================================================== */

(function () {
  'use strict';

  /* ---- Custom Cursor ---- */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, button, .skill-tag, .cert-card, .project-card').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        follower.style.width = '60px';
        follower.style.height = '60px';
        follower.style.opacity = '0.5';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.width = '36px';
        follower.style.height = '36px';
        follower.style.opacity = '1';
      });
    });
  }

  /* ---- Navbar: scroll class + active link ---- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Scrolled class
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    const btt = document.getElementById('backToTop');
    if (window.scrollY > 500) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }

    // Active nav link
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile Menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---- Back to top ---- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Particles ---- */
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const colors = ['#00d4aa', '#f0a500', '#3b82f6', '#8b5cf6'];
    const count = 35;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');

      const size = Math.random() * 4 + 1.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 12 + 8;

      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        box-shadow: 0 0 ${size * 3}px ${color};
      `;

      container.appendChild(p);
    }
  }

  createParticles();

  /* ---- Counter Animation ---- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* ---- Intersection Observer for Animations ---- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal-up').forEach((el) => {
    revealObserver.observe(el);
  });

  // Timeline items
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.index || 0) * 120;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.timeline-item').forEach((el) => {
    timelineObserver.observe(el);
  });

  // Counters
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) counterObserver.observe(heroStats);

  // Edu cards, cert cards, project cards, skill categories
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll(
            '.edu-card, .cert-card, .project-card, .skill-category, .org-card, .ach-item, .lang-item, .testimonial-card'
          );
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, i * 80);
          });
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
  );

  // Initially hide cards for animation
  [
    '.edu-card',
    '.cert-card',
    '.project-card',
    '.skill-category',
    '.org-card',
    '.ach-item',
    '.lang-item',
    '.testimonial-card',
  ].forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s, background 0.3s';
    });
  });

  [
    '.edu-grid',
    '.certs-grid',
    '.projects-grid',
    '.skills-grid',
    '.org-list',
    '.ach-list',
    '.lang-grid',
    '.testimonials-grid',
  ].forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      cardObserver.observe(el);
    });
  });

  /* ---- Contact Form (EmailJS v4) ---- */
  // ⚙️  REPLACE these three values with your own EmailJS credentials:
  const EMAILJS_PUBLIC_KEY  = 'cH8XIgAVO7nNV5Lh_';
  const EMAILJS_SERVICE_ID  = 'service_9dylheq';
  const EMAILJS_TEMPLATE_ID = 'template_n3j7lrm';

  // Initialise EmailJS with your public key
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const form       = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  const errorMsg   = document.getElementById('formError');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Honeypot check – abort silently if a bot filled the hidden field
      if (document.getElementById('_honey').value) return;

      const btn = document.getElementById('form-submit-btn');
      const originalBtnHTML = btn.innerHTML;

      // Loading state
      btn.innerHTML = '<span>Sending…</span>';
      btn.disabled  = true;
      btn.style.opacity = '0.7';

      // Hide any previous status messages
      successMsg.style.display = 'none';
      errorMsg.style.display   = 'none';

      // Collect form values into the template params EmailJS will use
      const templateParams = {
        from_name : document.getElementById('cf-name').value.trim(),
        from_email: document.getElementById('cf-email').value.trim(),
        subject   : document.getElementById('cf-subject').value.trim() || '(No subject)',
        message   : document.getElementById('cf-message').value.trim(),
        reply_to  : document.getElementById('cf-email').value.trim(),
      };

      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(() => {
          // ✅ Success
          successMsg.style.display = 'block';
          form.reset();
          setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
        })
        .catch((err) => {
          // ❌ Failure – show error and let user try again
          console.error('EmailJS error:', err);
          errorMsg.style.display = 'block';
          setTimeout(() => { errorMsg.style.display = 'none'; }, 8000);
        })
        .finally(() => {
          // Re-enable button regardless of outcome
          btn.innerHTML    = originalBtnHTML;
          btn.disabled     = false;
          btn.style.opacity = '1';
        });
    });
  }

  /* ---- Smooth hero reveal on load ---- */
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, 200 + i * 150);
    });
  });

  /* ---- Navbar highlight on click ---- */
  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      navLinks.forEach((l) => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  /* ---- Magnetic effect on primary buttons ---- */
  document.querySelectorAll('.btn-primary, .btn-hire').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ---- Tilt effect on edu cards & project cards ---- */
  function addTilt(selector) {
    document.querySelectorAll(selector).forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  addTilt('.edu-card');
  addTilt('.project-card');

  /* ---- Glowing background orbs (subtle parallax) ---- */
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    const overlay = document.querySelector('.hero-overlay');
    if (overlay) {
      overlay.style.backgroundPosition = `${50 + x * 0.2}% ${50 + y * 0.2}%`;
    }
  });

  /* ---- Scroll progress indicator (thin line at top) ---- */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: linear-gradient(90deg, #00d4aa, #f0a500);
    z-index: 9999;
    transition: width 0.1s linear;
    width: 0%;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    progressBar.style.width = progress + '%';
  }, { passive: true });

})();
