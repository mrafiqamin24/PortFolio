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

// Linework lembar 1 baru digambar saat lembarnya tiba di layar, bukan saat
// halaman dimuat, supaya gerakannya terlihat pembaca.
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
