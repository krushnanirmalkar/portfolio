/* ============================================================
   main.js — Portfolio JavaScript
   Author : Krushna Nirmalkar
   ============================================================ */

'use strict';

/* ============================================================
   1. CUSTOM CURSOR
   ============================================================ */
(function initCursor() {
  const dot  = document.getElementById('cdot');
  const ring = document.getElementById('cring');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  (function loop() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    dot.style.left  = mouseX + 'px';
    dot.style.top   = mouseY + 'px';
    ring.style.left = ringX  + 'px';
    ring.style.top  = ringY  + 'px';
    requestAnimationFrame(loop);
  })();

  // Enlarge ring on interactive elements
  const hoverTargets = 'a, button, .pill, .proj-cell, .cert-cell, .exp-item, .ach-row';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('big'));
    el.addEventListener('mouseleave', () => ring.classList.remove('big'));
  });
})();


/* ============================================================
   2. STICKY NAV + BACK-TO-TOP VISIBILITY
   ============================================================ */
(function initScroll() {
  const nav    = document.getElementById('nav');
  const topBtn = document.getElementById('topBtn');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('stuck',   scrollY > 50);
    topBtn.classList.toggle('show', scrollY > 500);
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ============================================================
   3. SCROLL REVEAL  (.rev → .in)
   ============================================================ */
(function initReveal() {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('in'); },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.rev').forEach(el => observer.observe(el));
})();


/* ============================================================
   4. ANIMATED COUNTERS  (data-count attribute)
   ============================================================ */
(function initCounters() {
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    const el  = entry.target;
    const end = +el.dataset.count;
    let   current = 0;
    const timer = setInterval(() => {
      current++;
      el.textContent = current;
      if (current >= end) clearInterval(timer);
    }, 70);
    observer.unobserve(el); // only animate once
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
})();


/* ============================================================
   5. CONTACT FORM — send-button feedback
   ============================================================ */
(function initContactForm() {
  const btn = document.getElementById('sendBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !message) {
      btn.textContent = 'Fill all fields →';
      setTimeout(() => (btn.textContent = 'Send Message →'), 2000);
      return;
    }
    btn.textContent = 'Sent  ✓';
    btn.style.background = '#1a1a1a';
    btn.style.color      = 'var(--white)';
    // Reset after delay
    setTimeout(() => {
      btn.textContent      = 'Send Message →';
      btn.style.background = '';
      btn.style.color      = '';
      document.getElementById('cf-name').value    = '';
      document.getElementById('cf-email').value   = '';
      document.getElementById('cf-message').value = '';
    }, 3000);
  });
})();


/* ============================================================
   6. THREE.JS HERO CANVAS — Abstract Particles Flow (Monochrome)
   ============================================================ */
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  const cam   = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
  cam.position.z = 400;

  // Modern Particle System
  const count = 3000;
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count);
  const angles = new Float32Array(count);
  
  for(let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 800;     // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 800; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200; // z
    velocities[i] = 0.5 + Math.random() * 1.5;
    angles[i] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.2,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Mouse interaction
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.1;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.1;
  });

  function animate() {
    requestAnimationFrame(animate);
    
    const positions = geometry.attributes.position.array;
    for(let i = 0; i < count; i++) {
      // Gentle flow logic
      angles[i] += 0.01;
      positions[i * 3 + 1] += Math.sin(angles[i]) * 0.2 + velocities[i] * 0.2;
      positions[i * 3] += Math.cos(angles[i]) * 0.2;

      // Wrap around
      if (positions[i * 3 + 1] > 400) positions[i * 3 + 1] = -400;
      if (positions[i * 3] > 400) positions[i * 3] = -400;
      if (positions[i * 3] < -400) positions[i * 3] = 400;
    }
    
    geometry.attributes.position.needsUpdate = true;
    
    // Parallax
    points.rotation.y += (mouseX * 0.001 - points.rotation.y) * 0.05;
    points.rotation.x += (mouseY * 0.001 - points.rotation.x) * 0.05;

    renderer.render(scene, cam);
  }

  window.addEventListener('resize', () => {
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
})();


/* ============================================================
   7. THREE.JS MINI PROJECT CANVASES
   ============================================================ */
function miniScene(id, geoType) {
  const el = document.getElementById(id);
  if (!el || typeof THREE === 'undefined') return;

  const parent   = el.parentElement;
  const W        = parent.clientWidth || 600;
  const H        = parseInt(el.style.height) || 200;

  const renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W, H);

  const scene = new THREE.Scene();
  const cam   = new THREE.PerspectiveCamera(50, W / H, 0.1, 50);
  cam.position.z = 4.5;

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const d1 = new THREE.DirectionalLight(0xffffff, 1.8); d1.position.set(4, 5, 4);   scene.add(d1);
  const d2 = new THREE.DirectionalLight(0xffffff, 0.3); d2.position.set(-4, -3, 2); scene.add(d2);

  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.95, roughness: 0.05 });

  let geo;
  switch (geoType) {
    case 'ico': geo = new THREE.IcosahedronGeometry(1.1, 1); break;
    case 'oct': geo = new THREE.OctahedronGeometry(1.1, 0);  break;
    case 'tet': geo = new THREE.TetrahedronGeometry(1.2, 0); break;
    default:    geo = new THREE.TorusKnotGeometry(0.8, 0.18, 80, 10, 2, 3);
  }

  const mesh = new THREE.Mesh(geo, mat);
  const wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
    color: 0x2a2a2a, wireframe: true, transparent: true, opacity: 0.2
  }));
  scene.add(mesh);
  scene.add(wire);

  (function loop() {
    requestAnimationFrame(loop);
    mesh.rotation.x += 0.006;
    mesh.rotation.y += 0.009;
    wire.rotation.copy(mesh.rotation);
    renderer.render(scene, cam);
  })();
}

// Initialise mini canvases after first paint
requestAnimationFrame(() => setTimeout(() => {
  miniScene('c-featured', 'ico');
  miniScene('c2',         'oct');
  miniScene('c3',         'tet');
}, 200));
