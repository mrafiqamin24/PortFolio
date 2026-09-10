// Portofolio Muhammad Rafiq Amin — perilaku halaman.
// Tanpa dependensi. Tiga tugas: tahun di kolofon, penanda lembar aktif di
// daftar gambar, dan pemicu ulang animasi linework saat lembar 1 terlihat.

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Penanda "sekarang": lembar yang sedang dibaca disorot di daftar gambar.
const indexLinks = [...document.querySelectorAll("#sheetIndex a")];
const sheets = [...document.querySelectorAll("main .sheet[id]")];

const setActive = (id) => {
  indexLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "true");
      link.scrollIntoView({ block: "nearest", inline: "nearest" });
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

if ("IntersectionObserver" in window && sheets.length) {
  const visible = new Map();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => visible.set(entry.target.id, entry.intersectionRatio));
      const top = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
      if (top && top[1] > 0) setActive(top[0]);
    },
    { rootMargin: "-56px 0px -40% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
  );
  sheets.forEach((sheet) => observer.observe(sheet));
} else if (sheets.length) {
  setActive(sheets[0].id);
}

// Linework lembar 1 digambar sekali saat font siap, supaya label tidak
// muncul dengan huruf pengganti lalu berganti bentuk.
const marks = document.querySelector(".elevation-marks");
if (marks && document.fonts && document.fonts.ready) {
  marks.style.visibility = "hidden";
  document.fonts.ready.then(() => {
    marks.style.visibility = "";
  });
}

// Momen pembuka sampul: nama, peran, aksi, lalu daftar lembar baris demi
// baris, dengan Motion (penerus Framer Motion, di-host sendiri). Tanpa Motion
// atau dengan preferensi gerak dikurangi, semuanya langsung tampil.
(() => {
  const els = [...document.querySelectorAll(".cover [data-enter]")];
  if (!els.length) return;
  const show = () => els.forEach((el) => el.classList.add("is-in"));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const Mo = window.Motion;
  if (reduced || !Mo || typeof Mo.animate !== "function" || typeof Mo.stagger !== "function") {
    show();
    return;
  }
  const safety = setTimeout(show, 2600);
  try {
    const run = Mo.animate(
      els,
      { opacity: [0, 1], y: [18, 0] },
      { duration: 0.85, delay: Mo.stagger(0.065, { startDelay: 0.12 }), ease: [0.16, 1, 0.3, 1] }
    );
    Promise.resolve(run && run.finished).then(show, show).finally(() => clearTimeout(safety));
  } catch (e) {
    show();
  }
})();

// Linework lembar 1 baru digambar saat lembarnya tiba di layar, bukan saat
// halaman dimuat: sejak ada sampul, lembar 1 mulai di bawah lipatan.
if (marks) {
  const drawn = () => marks.classList.add("in");
  if ("IntersectionObserver" in window) {
    const watch = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      drawn();
      watch.disconnect();
    }, { threshold: 0.35 });
    watch.observe(marks);
    const late = setTimeout(drawn, 12000);
    marks.addEventListener("animationstart", () => clearTimeout(late), { once: true });
  } else {
    drawn();
  }
}
