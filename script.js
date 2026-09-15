/* Portofolio Muhammad Rafiq Amin — tahun kolofon, saringan status, kemunculan entri. */
(function () {
  "use strict";

  var doc = document;
  var year = doc.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var chips = Array.prototype.slice.call(doc.querySelectorAll(".chip[data-filter]"));
  var releases = Array.prototype.slice.call(doc.querySelectorAll(".release[data-status]"));
  var months = Array.prototype.slice.call(doc.querySelectorAll(".month"));
  var empty = doc.querySelector(".log-empty");

  /* Saringan status: tanpa JS semua entri tampil; dengan JS chip menyembunyikan
     entri yang statusnya tidak cocok dan bulan yang jadi kosong. */
  function applyFilter(filter) {
    releases.forEach(function (release) {
      release.hidden = !(filter === "all" || release.getAttribute("data-status") === filter);
    });
    var anyVisible = false;
    months.forEach(function (month) {
      var visible = month.querySelector(".release:not([hidden])");
      month.hidden = !visible;
      if (visible) anyVisible = true;
    });
    if (empty) empty.hidden = anyVisible;
    chips.forEach(function (chip) {
      chip.setAttribute("aria-pressed", chip.getAttribute("data-filter") === filter ? "true" : "false");
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      applyFilter(chip.getAttribute("data-filter"));
    });
  });

  /* Tautan bukti (#ownertech dan sebagainya) harus selalu sampai, walau
     saringan sedang menyembunyikan entrinya. */
  function revealTarget() {
    var id = location.hash ? location.hash.slice(1) : "";
    if (!id) return;
    var target = doc.getElementById(id);
    if (target && target.classList.contains("release") && target.hidden) {
      applyFilter("all");
      target.scrollIntoView();
    }
  }
  window.addEventListener("hashchange", revealTarget);
  revealTarget();

  /* Kemunculan entri saat tiba di viewport. Entri yang sudah terlihat diberi
     kelas "in" sebelum kelas "reveal" dipasang, jadi tidak ada kedipan. */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  var viewportHeight = window.innerHeight;
  releases.forEach(function (release) {
    if (release.getBoundingClientRect().top < viewportHeight + 40) release.classList.add("in");
  });
  doc.documentElement.classList.add("reveal");

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px" });

  releases.forEach(function (release) {
    if (!release.classList.contains("in")) observer.observe(release);
  });
})();
