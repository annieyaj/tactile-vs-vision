// Project page behavior: media placeholders, lazy video loading, comparison sync,
// hero play/pause, active nav link, and BibTeX copy.

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Placeholders --------------------------------------------------------
  // Any .media whose image/video fails to load shows a neutral "coming soon"
  // box; hover it to see the expected path. Dropping the file in is all that's needed.

  function markMissing(media, path) {
    if (media.classList.contains("is-missing")) return;
    media.classList.add("is-missing");
    const ph = document.createElement("div");
    ph.className = "ph";
    const isVideo = /\.(mp4|webm|mov)$/i.test(path);
    ph.innerHTML =
      '<div class="ph-icon">' + (isVideo ? "▶" : "▧") + "</div>" +
      '<div class="ph-label"></div><div class="ph-path"></div>';
    ph.querySelector(".ph-label").textContent = media.dataset.label || (isVideo ? "Video" : "Image");
    ph.querySelector(".ph-path").textContent = "Coming soon";
    media.title = path;
    media.appendChild(ph);
  }

  document.querySelectorAll(".media > img").forEach((img) => {
    const media = img.parentElement;
    const path = img.getAttribute("src");
    if (img.complete && img.naturalWidth === 0) markMissing(media, path);
    img.addEventListener("error", () => markMissing(media, path));
  });

  // ---- Videos --------------------------------------------------------------
  // Videos use data-src and only load when near the viewport (or immediately
  // with data-eager). Looping clips play while visible and pause offscreen.

  const videos = Array.from(document.querySelectorAll("video[data-src]"));

  function loadVideo(video) {
    if (video.dataset.loaded) return;
    video.dataset.loaded = "1";
    const media = video.closest(".media");
    const path = video.dataset.src;
    video.addEventListener("error", () => markMissing(media, path));
    video.src = path;
    if (reduceMotion) {
      video.removeAttribute("autoplay");
      video.controls = true;
    }
  }

  function tryPlay(video) {
    if (reduceMotion || video.dataset.userPaused) return;
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
  }

  if ("IntersectionObserver" in window) {
    const loader = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { loadVideo(e.target); loader.unobserve(e.target); }
      });
    }, { rootMargin: "300px 0px" });

    const player = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.target.dataset.loaded) return;
        if (e.isIntersecting) tryPlay(e.target); else e.target.pause();
      });
    }, { threshold: 0.25 });

    videos.forEach((v) => {
      if (v.hasAttribute("data-eager")) loadVideo(v); else loader.observe(v);
      player.observe(v);
    });
  } else {
    videos.forEach((v) => { loadVideo(v); tryPlay(v); });
  }

  // ---- Hero play / pause ---------------------------------------------------

  document.querySelectorAll(".play-toggle").forEach((btn) => {
    const video = btn.parentElement.querySelector("video");
    const sync = () => {
      const paused = video.paused;
      btn.textContent = paused ? "Play" : "Pause";
      btn.setAttribute("aria-label", paused ? "Play video" : "Pause video");
    };
    btn.addEventListener("click", () => {
      if (video.paused) { delete video.dataset.userPaused; video.play(); }
      else { video.dataset.userPaused = "1"; video.pause(); }
    });
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    if (reduceMotion) btn.hidden = true;
  });

  // ---- Comparison sync -----------------------------------------------------
  // Restart both clips of a pair from 0 at the same moment.

  document.querySelectorAll("[data-compare]").forEach((block) => {
    const btn = block.querySelector(".sync-btn");
    const pair = Array.from(block.querySelectorAll("video"));
    if (!btn) return;
    btn.addEventListener("click", () => {
      pair.forEach((v) => { loadVideo(v); delete v.dataset.userPaused; v.pause(); v.currentTime = 0; });
      pair.forEach((v) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); });
    });
  });

  // ---- Active nav link -----------------------------------------------------

  const links = new Map();
  document.querySelectorAll('.topnav ul a[href^="#"]').forEach((a) => {
    const section = document.querySelector(a.getAttribute("href"));
    if (section) links.set(section, a);
  });

  if ("IntersectionObserver" in window && links.size) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.remove("active"));
        links.get(e.target).classList.add("active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((_, section) => navObserver.observe(section));
  }

  // ---- Copy BibTeX ---------------------------------------------------------

  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const target = document.querySelector(btn.dataset.copy);
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.textContent);
        btn.textContent = "Copied";
      } catch (_) {
        btn.textContent = "Select & copy";
      }
      setTimeout(() => { btn.textContent = "Copy"; }, 1600);
    });
  });
})();
