const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navbar = document.getElementById("navbar");
const scrollProgress = document.getElementById("scrollProgress");
const toTop = document.getElementById("toTop");
const navLinks = document.querySelectorAll(".nav-menu a");

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

toTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

menuBtn?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");
  menuBtn.classList.toggle("active", isOpen);
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuBtn?.classList.remove("active");
    menuBtn?.setAttribute("aria-expanded", "false");
  });
});

const updateScroll = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

  scrollProgress.style.width = `${progress}%`;
  navbar.classList.toggle("scrolled", window.scrollY > 12);
  toTop?.classList.toggle("show", window.scrollY > 480);

  const current = [...document.querySelectorAll("section[id]")].findLast((section) => {
    return window.scrollY >= section.offsetTop - 160;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
  });
};

window.addEventListener("scroll", updateScroll, { passive: true });
updateScroll();

document.querySelectorAll(".project-thumb img").forEach((img) => {
  const markEmpty = () => img.closest(".project-thumb")?.classList.add("is-empty");
  img.addEventListener("error", markEmpty);
  if (img.complete && img.naturalWidth === 0) markEmpty();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 180)}ms`;
  revealObserver.observe(element);
});
