(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Build city sections ---------- */
  const list = document.getElementById("city-list");
  const tabs = document.querySelector(".city-tabs");
  const attrs = (o = {}) =>
    `${o.decimals ? ` data-decimals="${o.decimals}"` : ""}${o.prefix ? ` data-prefix="${o.prefix}"` : ""}${o.suffix ? ` data-suffix="${o.suffix}"` : ""}`;

  const statsHTML = (stats) =>
    stats && stats.length
      ? `<ul class="city-stats">${stats.map(([v, l, o]) => `<li><b data-count="${v}"${attrs(o)}>0</b><span>${l}</span></li>`).join("")}</ul>`
      : "";
  const galleryHTML = (g) =>
    g && g.length ? `<div class="drop-gallery">${g.map(([src, alt]) => `<figure><img src="${src}" alt="${alt}" loading="lazy"><figcaption>${alt}</figcaption></figure>`).join("")}</div>` : "";
  const quoteHTML = (q) => (q ? `<blockquote class="city-quote">“${q[0]}”<cite>${q[1]}</cite></blockquote>` : "");
  function dropsHTML(c) {
    const m = (window.CITY_MORE || {})[c.id];
    if (!m) return "";
    let out = "";
    if (m.spotlight) {
      const s = m.spotlight;
      out += `<details class="drop spotlight reveal"><summary><span class="drop-label">Partner spotlight</span><span class="drop-title">${s.name}</span><span class="drop-icon" aria-hidden="true"></span></summary>
        <div class="drop-body">
          <h4>${s.title}</h4>
          ${s.img ? `<img class="drop-hero" src="${s.img[0]}" alt="${s.img[1]}" loading="lazy">` : ""}
          <p class="drop-intro">${s.intro}</p>
          ${statsHTML(s.stats)}
          ${s.body.map((p) => `<p>${p}</p>`).join("")}
          ${s.list ? `<ol class="drop-list">${s.list.map((x) => `<li>${x}</li>`).join("")}</ol>` : ""}
          ${quoteHTML(s.quote)}
          ${s.closing ? `<p class="drop-closing">${s.closing}</p>` : ""}
        </div></details>`;
    }
    out += `<details class="drop reveal"><summary><span class="drop-label">Read more</span><span class="drop-title">The full ${c.name} story</span><span class="drop-icon" aria-hidden="true"></span></summary>
      <div class="drop-body">
        ${galleryHTML(m.gallery)}
        ${statsHTML(m.stats)}
        ${(m.more || []).map((p) => `<p>${p}</p>`).join("")}
        ${m.closing ? `<p class="drop-closing">${m.closing}</p>` : ""}
      </div></details>`;
    return out;
  }

  (window.CITIES || []).forEach((c, i) => {
    const t = document.createElement("a");
    t.href = "#" + c.id;
    t.textContent = c.name;
    tabs.appendChild(t);

    const [hv, hs, hd, hl] = c.headline;
    const sec = document.createElement("article");
    sec.className = "city" + (i % 2 ? " flip" : "");
    sec.id = c.id;
    sec.innerHTML = `
      <div class="city-media reveal"><img src="${c.img}" alt="${c.alt}" loading="lazy"><span class="city-country">${c.country}</span></div>
      <div class="city-body">
        <p class="kicker reveal">${String(i + 1).padStart(2, "0")} · ${c.country}</p>
        <h3 class="city-name reveal">${c.name}</h3>
        <p class="city-tag reveal">${c.tagline}</p>
        <div class="city-head reveal"><span class="num" data-count="${hv}"${attrs({ decimals: hd, suffix: hs })}>0</span><span>${hl}</span></div>
        ${c.shift ? `<div class="shift reveal"><span>${c.shift[0]}</span><i>→</i><span class="pink">${c.shift[1]}</span><p>${c.shift[2]}</p></div>` : ""}
        <ul class="city-stats">${c.stats
          .map(([v, l, o]) => `<li class="reveal"><b data-count="${v}"${attrs(o)}>0</b><span>${l}</span></li>`)
          .join("")}</ul>
        ${c.body.map((p) => `<p class="reveal">${p}</p>`).join("")}
        ${c.quote ? `<blockquote class="city-quote reveal">“${c.quote[0]}”<cite>${c.quote[1]}</cite></blockquote>` : ""}
        <p class="eco reveal"><strong>Wider response:</strong> ${c.ecosystem} <em>These outcomes cannot be attributed directly to It's a Penalty.</em></p>
        ${dropsHTML(c)}
      </div>`;
    list.appendChild(sec);
  });

  /* ---------- Count-up numbers ---------- */
  const fmt = (n, d) => n.toLocaleString("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d });
  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = 1;
    const target = parseFloat(el.dataset.count);
    const d = parseInt(el.dataset.decimals || "0", 10);
    const pre = el.dataset.prefix || "";
    const suf = el.dataset.suffix || "";
    if (reduce) { el.textContent = pre + fmt(target, d) + suf; return; }
    const dur = Math.min(2200, 900 + Math.log10(target + 1) * 220);
    const t0 = performance.now();
    (function step(t) {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      el.textContent = pre + fmt(target * e, d) + suf;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ---------- Most numbers: show the figure, with a loading bar underneath ---------- */
  // Only the big headline figures (hero, city headlines, survey rings) still count up.
  document.querySelectorAll("[data-count]").forEach((el) => {
    if (el.closest(".hero-stat, .city-head, .ring")) return;
    const d = parseInt(el.dataset.decimals || "0", 10);
    const suf = el.dataset.suffix || "";
    const val = parseFloat(el.dataset.count);
    el.textContent = (el.dataset.prefix || "") + fmt(val, d) + suf;
    el.dataset.done = 1;
    el.classList.add("static-num");
    if (el.closest(".stat, .city-stats, .learn, .callout-stat")) {
      const bar = document.createElement("span");
      bar.className = "loadbar";
      // Percentages fill to their value; everything else loads to full.
      const fill = suf.trim().startsWith("%") ? Math.min(100, val) : 100;
      bar.innerHTML = `<i style="--fill:${fill}"></i>`;
      if (el.closest(".learn")) el.closest(".learn").appendChild(bar);
      else el.insertAdjacentElement("afterend", bar);
    }
  });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add("in");
        el.querySelectorAll("[data-count]").forEach(countUp);
        if (el.matches("[data-count]")) countUp(el);
        io.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
  );

  // stagger siblings within a group
  document.querySelectorAll(".reveal").forEach((el) => {
    const sibs = Array.from(el.parentElement.children).filter((s) => s.classList.contains("reveal"));
    const idx = sibs.indexOf(el);
    el.style.setProperty("--delay", Math.min(idx, 8) * 70 + "ms");
    io.observe(el);
  });
  document.querySelectorAll(".map, .uber, .compare, .hero-stat").forEach((el) => io.observe(el));

  /* ---------- Hero intro ---------- */
  requestAnimationFrame(() => document.body.classList.add("loaded"));

  /* ---------- Scroll progress, parallax, nav state ---------- */
  const bar = document.querySelector(".progress span");
  const heroBg = document.querySelector(".hero-bg");
  const nav = document.querySelector(".topnav");
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    if (!reduce && heroBg && y < innerHeight * 1.2) {
      heroBg.style.transform = `translate3d(0, ${y * 0.3}px, 0) scale(${1.08 + y * 0.0002})`;
    }
    nav.classList.toggle("solid", y > 40);
    ticking = false;
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- Finale: words light up as you scroll ---------- */
  const finale = document.querySelector(".finale-text");
  if (finale && !reduce) {
    const wrapWords = (node) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part.trim()) { frag.appendChild(document.createTextNode(part)); return; }
            const s = document.createElement("span"); s.className = "w"; s.textContent = part; frag.appendChild(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) wrapWords(n);
      });
    };
    wrapWords(finale);
    const words = finale.querySelectorAll(".w");
    const lightUp = () => {
      const r = finale.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35)));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle("on", i < n));
    };
    addEventListener("scroll", () => requestAnimationFrame(lightUp), { passive: true });
    lightUp();
  }

  /* ---------- Drop-ins: animate open, load bars inside ---------- */
  document.querySelectorAll("details.drop").forEach((d) => {
    d.addEventListener("toggle", () => {
      d.classList.toggle("opened", d.open);
      if (d.open) setTimeout(() => d.querySelector(".drop-body").classList.add("in"), 30);
    });
  });

  /* ---------- Highlight current city tab ---------- */
  const tabLinks = Array.from(tabs.querySelectorAll("a"));
  const cityIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          tabLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll(".city").forEach((c) => cityIo.observe(c));
})();
