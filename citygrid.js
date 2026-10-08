// Optional "city boxes" layout. Off by default.
// Turn on for yourself with ?cities=grid in the address,
// or for everyone by adding data-cities="grid" to the <html> tag.
(function () {
  const params = new URLSearchParams(location.search);
  const mode = params.get("cities") || document.documentElement.dataset.cities || "";
  if (mode !== "grid" && mode !== "map") return;

  const cities = window.CITIES || [];
  const list = document.getElementById("city-list");
  const section = document.getElementById("cities");
  if (!list || !section || !cities.length) return;
  document.documentElement.classList.add("cities-grid", "cities-" + mode);

  /* ---- grid of square boxes ---- */
  const fmt = (v, d) => Number(v).toLocaleString("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d });
  // Pin positions (% across, % down) on img/map-big.png
  const PINS = {
    vancouver: [13.6, 13.6, "r"], boston: [84.1, 34.0, "r"], "new-york": [80.1, 38.4, "r"],
    "kansas-city": [52.2, 42.8, "l"], "los-angeles": [20.2, 55.7, "l"], atlanta: [66.1, 56.5, "l"],
    miami: [71.7, 75.3, "r"], monterrey: [44.5, 75.5, "l"], guadalajara: [40.4, 86.7, "l"], "mexico-city": [46.1, 89.4, "r"],
    mexico: [31, 66, "pill"]
  };
  let grid;
  if (mode === "map") {
    grid = document.createElement("div");
    grid.className = "city-map-wrap";
    const pins = cities
      .filter((c) => PINS[c.id])
      .map((c) => {
        const [x, y, side] = PINS[c.id];
        const [hv, hs, hd, hl] = c.headline;
        const cls = side === "pill" ? "map-pin pill" : "map-pin";
        const label = c.id === "mexico" ? "Mexico: Country overview" : c.name;
        return `<a class="${cls} tip-${x > 60 ? "left" : "right"} ${y > 70 ? "tip-up" : ""}" href="#${c.id}" style="--x:${x};--y:${y}" aria-label="Open ${c.name}">
          ${side === "pill" ? `<span class="pill-label">${label} →</span>` : `<span class="dot"></span>`}
          <span class="map-tip"><img src="${c.img}" alt="" loading="lazy"><span class="map-tip-body"><b>${c.name}</b><span><em>${fmt(hv, hd)}${hs}</em> ${hl}</span><i>Explore →</i></span></span>
        </a>`;
      })
      .join("");
    grid.innerHTML = `<p class="map-hint">Tap a city on the map to explore its story</p>
      <div class="city-map"><img src="img/map-big.png" alt="Map of It’s a Penalty’s FIFA World Cup 2026 host cities across Canada, the United States and Mexico" width="2400" height="1588">${pins}</div>
      <div class="map-list">${cities.map((c) => `<a href="#${c.id}">${c.name}</a>`).join("")}</div>`;
    list.before(grid);
  } else {
    grid = document.createElement("div");
  grid.className = "wrap city-grid";
  grid.innerHTML = cities
    .map((c) => {
      const [hv, hs, hd, hl] = c.headline;
      return `<a class="city-box" href="#${c.id}" aria-label="Open ${c.name}">
        <img src="${c.img}" alt="" loading="lazy">
        <span class="city-box-shade"></span>
        <span class="city-box-country">${c.country}</span>
        <span class="city-box-body">
          <span class="city-box-name">${c.name}</span>
          <span class="city-box-stat"><b>${fmt(hv, hd)}${hs}</b> ${hl}</span>
          <span class="city-box-cta">Explore <i aria-hidden="true">→</i></span>
        </span>
      </a>`;
    })
    .join("");
  list.before(grid);
  // fade the boxes in as they scroll into view
  const boxes = grid.querySelectorAll(".city-box");
  boxes.forEach((bx, k) => bx.style.setProperty("--d", (k % 4) * 70 + "ms"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("shown"); io.unobserve(en.target); } }), { threshold: 0.1 });
    boxes.forEach((bx) => io.observe(bx));
  } else boxes.forEach((bx) => bx.classList.add("shown"));

  }

  /* ---- city "page" overlay ---- */
  const modal = document.createElement("div");
  modal.className = "city-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `<div class="city-modal-bar">
      <button class="cm-back" type="button">← All cities</button>
      <span class="cm-title"></span>
      <span class="cm-nav"><button class="cm-prev" type="button" aria-label="Previous city">‹</button><button class="cm-next" type="button" aria-label="Next city">›</button><button class="cm-close" type="button" aria-label="Close">×</button></span>
    </div>
    <div class="city-modal-scroll"></div>`;
  document.body.appendChild(modal);
  const scroller = modal.querySelector(".city-modal-scroll");
  scroller.appendChild(list);
  const foot = document.createElement("div");
  foot.className = "city-modal-foot";
  foot.innerHTML = `<button class="cmf-prev" type="button"><i aria-hidden="true">←</i><span><small>Previous</small><b></b></span></button>
    <button class="cmf-next" type="button"><span><small>Next</small><b></b></span><i aria-hidden="true">→</i></button>`;
  scroller.appendChild(foot);
  const articles = Array.from(list.querySelectorAll(".city"));
  // Mexico's partner banner is prepended inside its article already.
  let current = -1;

  function show(i, push) {
    if (i < 0 || i >= articles.length) return;
    current = i;
    articles.forEach((a, k) => (a.hidden = k !== i));
    modal.querySelector(".cm-title").textContent = cities[i].name;
    const last = i === articles.length - 1;
    foot.querySelector(".cmf-prev").hidden = i === 0;
    if (i > 0) foot.querySelector(".cmf-prev b").textContent = cities[i - 1].name;
    foot.querySelector(".cmf-next small").textContent = last ? "Next section" : "Next city";
    foot.querySelector(".cmf-next b").textContent = last ? "Innovation in action" : cities[i + 1].name;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("modal-open");
    scroller.scrollTop = 0;
    // reveal everything in the opened city straight away
    articles[i].querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    articles[i].querySelectorAll("[data-count]").forEach((el) => {
      if (el.dataset.done) return;
      el.dataset.done = 1;
      const d = parseInt(el.dataset.decimals || "0", 10);
      el.textContent = (el.dataset.prefix || "") + fmt(parseFloat(el.dataset.count), d) + (el.dataset.suffix || "");
    });
    if (push) history.pushState(null, "", "#" + cities[i].id);
    modal.querySelector(".cm-back").focus({ preventScroll: true });
  }
  function close(push) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("modal-open");
    const box = current >= 0 ? grid.querySelector(`a[href="#${cities[current].id}"]`) : null;
    if (push) history.pushState(null, "", location.pathname + location.search + "#cities");
    if (box) box.focus({ preventScroll: true });
    current = -1;
  }
  function fromHash() {
    const id = location.hash.slice(1);
    const i = cities.findIndex((c) => c.id === id);
    if (i >= 0) show(i, false);
    else if (modal.classList.contains("open")) close(false);
  }

  grid.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='#']");
    if (!a) return;
    e.preventDefault();
    show(cities.findIndex((c) => "#" + c.id === a.getAttribute("href")), true);
  });
  foot.querySelector(".cmf-prev").onclick = () => show(current - 1, true);
  foot.querySelector(".cmf-next").onclick = () => {
    if (current < articles.length - 1) return show(current + 1, true);
    close(true);
    const nxt = document.getElementById("innovation");
    if (nxt) setTimeout(() => nxt.scrollIntoView({ behavior: "smooth" }), 60);
  };
  modal.querySelector(".cm-back").onclick = () => close(true);
  modal.querySelector(".cm-close").onclick = () => close(true);
  modal.querySelector(".cm-prev").onclick = () => show((current - 1 + articles.length) % articles.length, true);
  modal.querySelector(".cm-next").onclick = () => show((current + 1) % articles.length, true);
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") close(true);
    if (e.key === "ArrowRight") modal.querySelector(".cm-next").click();
    if (e.key === "ArrowLeft") modal.querySelector(".cm-prev").click();
  });
  addEventListener("popstate", fromHash);
  // keep ?cities=grid on in-page links
  fromHash();
})();
