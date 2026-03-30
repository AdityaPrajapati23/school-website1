/* =============================================================
   app.js — Main Application Entry Point
   Boots everything up when the page loads.
   ============================================================= */

const Utils = (() => {

  /* ----------------------------------------------------------
     Toast Notifications
     ---------------------------------------------------------- */
  function showToast(msg, type = "info", duration = 3500) {
    const icons = { success: "✅", error: "❌", info: "ℹ️", warning: "⚠️" };
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || "ℹ️"}</span>
      <span class="toast-msg">${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity   = "0";
      toast.style.transform = "translateX(40px)";
      toast.style.transition = "all .35s ease";
      setTimeout(() => toast.remove(), 380);
    }, duration);
  }

  /* ----------------------------------------------------------
     Form Field Validation
     ---------------------------------------------------------- */
  function validateField(inputId, errId, validator) {
    const inp = document.getElementById(inputId);
    const err = document.getElementById(errId);
    if (!inp || !err) return true;
    const valid = validator(inp.value.trim());
    inp.classList.toggle("error", !valid);
    err.classList.toggle("show", !valid);
    return valid;
  }

  /* Validator helpers */
  const isEmail  = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isPhone  = v => /^[6-9]\d{9}$/.test(v.replace(/\s/g, ""));
  const minLen   = n => v => v.length >= n;
  const notEmpty = v => v.length > 0;

  /* ----------------------------------------------------------
     Smooth Scroll to Section
     ---------------------------------------------------------- */
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    /* Close mobile menu if open */
    document.getElementById("mobile-menu")?.classList.remove("open");
    document.getElementById("hamburger")?.classList.remove("open");
  }

  /* ----------------------------------------------------------
     Date Helpers
     ---------------------------------------------------------- */
  function getMonthDay(dateStr) {
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      mon: d.toLocaleString("en-IN", { month: "short" }).toUpperCase()
    };
  }

  /* ----------------------------------------------------------
     Animated Counter (for hero stats)
     ---------------------------------------------------------- */
  function animateCounter(el, target, suffix = "+") {
    let count = 0;
    const step  = Math.ceil(target / 80);
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + suffix;
      if (count >= target) clearInterval(timer);
    }, 20);
  }

  /* ----------------------------------------------------------
     Hero Floating Particles
     ---------------------------------------------------------- */
  function createParticles() {
    const container = document.getElementById("hero-particles");
    if (!container) return;
    for (let i = 0; i < 18; i++) {
      const p    = document.createElement("div");
      p.className = "particle";
      const size  = Math.random() * 40 + 10;
      p.style.cssText =
        `width:${size}px; height:${size}px; left:${Math.random() * 100}%;` +
        `animation-duration:${Math.random() * 12 + 8}s;` +
        `animation-delay:${Math.random() * 8}s`;
      container.appendChild(p);
    }
  }

  /* ----------------------------------------------------------
     Intersection Observer — Fade-In Animations
     ---------------------------------------------------------- */
  function observeFadeElements() {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-up, .fade-left, .fade-right")
            .forEach(el => obs.observe(el));
  }

  return {
    showToast, validateField, isEmail, isPhone, minLen, notEmpty,
    scrollToSection, getMonthDay, animateCounter, createParticles,
    observeFadeElements
  };

})();

/* Global shortcut functions used inside HTML onclick="" */
function showToast(m, t, d)  { Utils.showToast(m, t, d);      }
function scrollToSection(id) { Utils.scrollToSection(id);      }


/* =============================================================
   APP BOOT
   ============================================================= */
document.addEventListener("DOMContentLoaded", () => {

  /* 1. Render all dynamic content from DB */
  UI.renderTicker();
  UI.renderClasses();
  UI.renderSubjects();
  UI.renderCalendar();
  UI.renderFeeTable();
  UI.renderGallery("all");
  UI.renderNotices();
  UI.renderUpcomingEvents();

  /* 2. Init forms */
  Forms.initAdmissionForm();
  Forms.initContactForm();

  /* 3. Init admin panel */
  Admin.init();

  /* 4. Hero particles */
  Utils.createParticles();

  /* 5. Navbar scroll spy */
  _initNavScrollSpy();

  /* 6. Hero counter animations */
  _initCounters();

  /* 7. Mobile hamburger menu */
  _initMobileMenu();

  /* 8. Gallery category filter buttons */
  _initGalleryFilter();

  /* 9. Back-to-top button */
  _initBackToTop();

  /* 10. Fade animations */
  Utils.observeFadeElements();

  /* 11. Smooth scroll for all anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const href = a.getAttribute("href");
      if (href && href.length > 1) {
        e.preventDefault();
        Utils.scrollToSection(href.slice(1));
      }
    });
  });

  /* -----------------------------------------------------------
     HELPER: Navbar Active Link on Scroll
     ----------------------------------------------------------- */
  function _initNavScrollSpy() {
    const sections = ["home","about","academics","admissions","gallery","notices","contact"];
    const navLinks = document.querySelectorAll(".nav-links a:not(.nav-admin-btn)");

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(a =>
            a.classList.toggle("active", a.getAttribute("href") === "#" + id)
          );
        }
      });
    }, { threshold: 0.3, rootMargin: "-80px 0px -60% 0px" });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }

  /* -----------------------------------------------------------
     HELPER: Animated Hero Stats Counters
     ----------------------------------------------------------- */
  function _initCounters() {
    const counters = document.querySelectorAll(".hero-stat .num[data-target]");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || "+";
          Utils.animateCounter(el, target, suffix);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => obs.observe(el));
  }

  /* -----------------------------------------------------------
     HELPER: Mobile Hamburger Menu
     ----------------------------------------------------------- */
  function _initMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const menu      = document.getElementById("mobile-menu");
    hamburger?.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      menu.classList.toggle("open");
    });
    menu?.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        hamburger?.classList.remove("open");
        menu.classList.remove("open");
      });
    });
  }

  /* -----------------------------------------------------------
     HELPER: Gallery Filter Buttons
     ----------------------------------------------------------- */
  function _initGalleryFilter() {
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        UI.renderGallery(btn.dataset.cat);
      });
    });
  }

  /* -----------------------------------------------------------
     HELPER: Back-to-Top Button
     ----------------------------------------------------------- */
  function _initBackToTop() {
    const btn = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
      btn?.classList.toggle("show", window.scrollY > 400);
    });
    btn?.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }
  // After UI.renderUpcomingEvents(); add:
UI.renderFaculty("all");

// Add Faculty filter buttons init
_initFacultyFilter();

// Add this helper function inside DOMContentLoaded:
function _initFacultyFilter() {
  document.querySelectorAll(".faculty-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".faculty-filter-btn")
              .forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      UI.renderFaculty(btn.dataset.type);
    });
  });
}

});