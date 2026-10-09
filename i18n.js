/* EN / ES language switch.
   Text is swapped block by block: each element that directly holds words is looked up
   by its English HTML in window.I18N_ES and replaced with the Spanish HTML.
   Preview-only until approved: the switch shows when ?lang=es or ?lang=en is in the URL
   (or the reader has already picked Spanish). Set I18N_PUBLIC = true to show it to everyone. */
(function () {
  var I18N_PUBLIC = false;
  var KEY = "iap-lang";
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, SVG: 1, svg: 1, TEMPLATE: 1 };
  var LETTER = /[A-Za-zÀ-ÿ]/;
  var norm = function (s) { return s.replace(/\s+/g, " ").trim(); };

  function hasOwnWords(el) {
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3 && LETTER.test(n.nodeValue)) return true;
    }
    return false;
  }
  // Elements that directly contain words, outermost first (their inline markup travels with them)
  function collect(root, out) {
    out = out || [];
    if (!root || root.nodeType !== 1 || SKIP[root.nodeName]) return out;
    if (root.hasAttribute && root.hasAttribute("data-no-i18n")) return out;
    if (hasOwnWords(root)) { out.push(root); return out; }
    for (var c = root.firstElementChild; c; c = c.nextElementSibling) collect(c, out);
    return out;
  }
  window.__i18nCollect = function () {
    return collect(document.body).map(function (el) { return norm(el.innerHTML); });
  };

  var params = new URLSearchParams(location.search);
  var qp = params.get("lang");
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (qp === "es" || qp === "en") { try { localStorage.setItem(KEY, qp); } catch (e) {} }
  var lang = qp || stored || "en";
  var showSwitch = I18N_PUBLIC || !!qp || stored === "es";

  var dict = {};
  var ATTRS = ["aria-label", "alt", "title"];
  function translate(root) {
    collect(root).forEach(function (el) {
      var k = norm(el.innerHTML);
      if (dict[k] && dict[k] !== k) el.innerHTML = dict[k];
    });
    var scope = root.querySelectorAll ? [root].concat([].slice.call(root.querySelectorAll("[aria-label],[alt],[title]"))) : [];
    scope.forEach(function (el) {
      if (!el.getAttribute) return;
      ATTRS.forEach(function (a) {
        var v = el.getAttribute(a);
        if (v && dict[norm(v)]) el.setAttribute(a, dict[norm(v)]);
      });
    });
  }

  // Spanish text is only downloaded for readers who choose Spanish
  window.__i18nApply = function () {
    dict = window.I18N_ES || {};
    document.documentElement.lang = "es";
    if (dict[norm(document.title)]) document.title = dict[norm(document.title)];
    translate(document.body);
    new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        if (m.type === "childList") {
          m.addedNodes.forEach(function (n) {
            if (n.nodeType === 1) translate(n);
            else if (n.nodeType === 3 && n.parentElement) translate(n.parentElement);
          });
        }
      });
    }).observe(document.body, { childList: true, subtree: true });
  };
  if (lang === "es") {
    var me = document.currentScript && document.currentScript.src;
    var v = me && me.indexOf("?") > -1 ? me.slice(me.indexOf("?")) : "";
    document.write('<script src="i18n-es.js' + v + '"><\/script><script>window.__i18nApply()<\/script>');
  }

  if (!showSwitch) return;
  var nav = document.querySelector(".topnav");
  if (!nav) return;
  var sw = document.createElement("div");
  sw.className = "lang-switch";
  sw.setAttribute("data-no-i18n", "");
  sw.setAttribute("role", "group");
  sw.setAttribute("aria-label", "Language / Idioma");
  ["en", "es"].forEach(function (l) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = l.toUpperCase();
    b.setAttribute("aria-pressed", l === lang ? "true" : "false");
    b.addEventListener("click", function () {
      if (l === lang) return;
      try { localStorage.setItem(KEY, l); sessionStorage.setItem("iap-scroll", String(window.scrollY)); } catch (e) {}
      var u = new URL(location.href);
      u.searchParams.set("lang", l);
      location.replace(u.toString());
    });
    sw.appendChild(b);
  });
  nav.appendChild(sw);

  // Return to the same place after switching
  try {
    var y = sessionStorage.getItem("iap-scroll");
    if (y !== null) {
      sessionStorage.removeItem("iap-scroll");
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      var go = function () {
        var n = 0, t = setInterval(function () {
          window.scrollTo({ top: +y, behavior: "instant" });
          if (++n > 6 || Math.abs(window.scrollY - y) < 2) clearInterval(t);
        }, 80);
      };
      if (document.readyState === "complete") go(); else window.addEventListener("load", go);
    }
  } catch (e) {}
})();
