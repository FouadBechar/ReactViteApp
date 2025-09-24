(function () {
  if ("serviceWorker" in navigator && "SyncManager" in window) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("SW registered");
      })
      .catch((err) => console.error("SW failed:", err));
  }
})();

(function () {
  /* ---------------------------
       Utilities
       --------------------------- */
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  function debounce(fn, wait = 80) {
    let t;
    return (...a) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...a), wait);
    };
  }
  function isFunction(x) {
    return typeof x === "function";
  }

  /* ---------------------------
       Media queries helpers
       --------------------------- */
  const mql = window.matchMedia("(min-width:768px)");
  const mqlMedium = window.matchMedia("(max-width:1024px)");
  const isDesktop = () => mql.matches;
  const isMediumScreen = () =>
    window.innerWidth >= 768 && window.innerWidth <= 1024;

  /* ---------------------------
       DOM references
       --------------------------- */

  // const navLinks = $("#navLinks");
  // const accountItem = $("#accountLink").closest("li");
  const menuBtn = $("#menuBtn");
  const closeBtn = $("#closeBtn");
  const navMenu = $("#navMenu");
  const overlay = $("#overlay");
  const searchToggleBtn = $("#searchToggleBtn");
  const searchBox = $("#searchBox");
  const searchInput = $("#searchInput");
  const clearBtn = $("#clearBtn");
  const navListItems = $$(".nav-menu > ul > li").length
    ? $$(".nav-menu > ul > li")
    : $$("#navLinks > li");
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const micBtn = $("#micBtn");
  const searchForm = document.querySelector(".search-form");
  micBtn.setAttribute("aria-live", "polite");
  micBtn.setAttribute("aria-label", "Listening...");
  /* ---------------------------
       Dropdown measurement cache + ResizeObserver
       --------------------------- */
  let ddCache = new WeakMap();
  const RO =
    window.ResizeObserver ||
    class {
      observe() {}
      disconnect() {}
    };
  const ro = new RO((entries) => {
    entries.forEach((e) => ddCache.delete(e.target));
  });

  function measureDropdownWidth(dropdown) {
    if (!dropdown) return 0;
    if (ddCache.has(dropdown)) return ddCache.get(dropdown);
    const clone = dropdown.cloneNode(true);
    clone.style.visibility = "hidden";
    clone.style.display = "block";
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    document.body.appendChild(clone);
    const w = Math.ceil(clone.getBoundingClientRect().width);
    document.body.removeChild(clone);
    ddCache.set(dropdown, w);
    return w;
  }

  function adjustDropdownPosition(li, force = false) {
    if (!isDesktop()) return;
    if (li.dataset.alignLocked === "true" && !force) return;
    const dropdown = li.querySelector(".dropdown");
    if (!dropdown) return;
    const ddWidth = measureDropdownWidth(dropdown);
    const liRect = li.getBoundingClientRect();
    const willOverflowRight = liRect.left + ddWidth > window.innerWidth - 12;
    dropdown.classList.toggle("align-right", willOverflowRight);
  }

  /* scheduleAdjust via rAF to avoid repeated layout thrash */
  const scheduled = new WeakMap();
  function scheduleAdjust(li, force = false) {
    if (!isDesktop()) return;
    if (li.dataset.alignLocked === "true" && !force) return;
    if (scheduled.get(li)) return;
    scheduled.set(li, true);
    requestAnimationFrame(() => {
      adjustDropdownPosition(li, force);
      scheduled.delete(li);
    });
  }

  /* observe dropdown elements and attach pointerenter/leave for alignment locking */
  navListItems.forEach((li) => {
    const dd = li.querySelector(".dropdown");
    if (dd) ro.observe(dd);

    li.addEventListener("pointerenter", () => {
      scheduleAdjust(li, true);
      li.dataset.alignLocked = "true";
    });
    li.addEventListener("pointerleave", () => {
      delete li.dataset.alignLocked;
    });

    const topLink = li.querySelector(".top-link");
    if (topLink) {
      topLink.addEventListener("focus", () => {
        scheduleAdjust(li, true);
        li.dataset.alignLocked = "true";
      });
      topLink.addEventListener("blur", () => {
        delete li.dataset.alignLocked;
      });
    }
  });

  window.addEventListener(
    "resize",
    debounce(() => {
      ddCache = new WeakMap();
      navListItems.forEach((li) => scheduleAdjust(li, true));
    }, 120)
  );
  navListItems.forEach((li) => scheduleAdjust(li, true));

  /* ---------------------------
       Menu (mobile) + Focus trap
       --------------------------- */
  let lastFocusedBeforeOpen = null;

  function trapFocus(e) {
    if (isDesktop() || !navMenu.classList.contains("open")) return;
    const focusable = navMenu.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function closeAllSubmenus() {
    $$(".nav-menu li.open").forEach((li) => {
      li.classList.remove("open");
      li.querySelector(".submenu-toggle")?.setAttribute(
        "aria-expanded",
        "false"
      );
      li.querySelector(".top-link")?.setAttribute("aria-expanded", "false");
    });
  }

  function openMenu() {
    if (navMenu.classList.contains("open")) return;
    lastFocusedBeforeOpen = document.activeElement;
    document.body.style.overflow = "hidden";
    navMenu.classList.add("open");
    overlay.classList.add("show");
    menuBtn.setAttribute("aria-expanded", "true");
    navMenu.setAttribute("aria-hidden", "false");
    // when menu acts as modal (mobile), set aria-modal true
    if (!isDesktop()) {
      navMenu.setAttribute("aria-modal", "true");
    } else {
      navMenu.setAttribute("aria-modal", "false");
    }
    closeBtn.focus();
    document.addEventListener("keydown", handleKeydown);
  }

  function closeMenu() {
    if (!navMenu.classList.contains("open")) return;
    document.body.style.overflow = "";
    navMenu.classList.remove("open");
    overlay.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
    navMenu.setAttribute("aria-hidden", "true");
    navMenu.setAttribute("aria-modal", "false");
    closeAllSubmenus();
    try {
      lastFocusedBeforeOpen?.focus();
    } catch (e) {}
    lastFocusedBeforeOpen = null;
    document.removeEventListener("keydown", handleKeydown);
  }

  function openSearch() {
    navMenu.classList.add("search-active");
    searchInput?.focus();
  }
  function closeSearch() {
    navMenu.classList.remove("search-active");
    searchToggleBtn?.focus();
  }

  function handleKeydown(e) {
    if (e.key === "Escape") {
      if (navMenu.classList.contains("search-active") && isMediumScreen())
        closeSearch();
      else closeMenu();
    } else {
      trapFocus(e);
    }
  }

  function toggleSubmenu(btn) {
    const parentLi = btn.closest("li");
    const isExpanded = parentLi.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isExpanded));
    parentLi
      .querySelector(".top-link")
      ?.setAttribute("aria-expanded", String(isExpanded));
    // close other open ones
    $$(".nav-menu li.open").forEach((li) => {
      if (li !== parentLi) {
        li.classList.remove("open");
        li.querySelector(".submenu-toggle")?.setAttribute(
          "aria-expanded",
          "false"
        );
        li.querySelector(".top-link")?.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* keyboard navigation for top links (open + move into dropdown) */
  $$(".top-link").forEach((link) => {
    link.addEventListener("keydown", (e) => {
      const li = link.closest("li");
      const dropdown = li.querySelector(".dropdown");
      if (!dropdown) return;
      const items = Array.from(dropdown.querySelectorAll("a"));
      if (!items.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!li.classList.contains("open")) {
          li.classList.add("open");
          link.setAttribute("aria-expanded", "true");
          li.querySelector(".submenu-toggle")?.setAttribute(
            "aria-expanded",
            "true"
          );
        }
        items[0].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!li.classList.contains("open")) {
          li.classList.add("open");
          link.setAttribute("aria-expanded", "true");
          li.querySelector(".submenu-toggle")?.setAttribute(
            "aria-expanded",
            "true"
          );
        }
        items[items.length - 1].focus();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const toggle = li.querySelector(".submenu-toggle");
        if (toggle) toggleSubmenu(toggle);
      } else if (e.key === "Escape") {
        li.classList.remove("open");
        link.setAttribute("aria-expanded", "false");
        li.querySelector(".submenu-toggle")?.setAttribute(
          "aria-expanded",
          "false"
        );
        link.focus();
      }
    });
  });

  /* dropdown items arrow nav */
  $$(".dropdown a").forEach((a) => {
    a.addEventListener("keydown", (e) => {
      const dropdown = a.closest(".dropdown");
      if (!dropdown) return;
      const items = Array.from(dropdown.querySelectorAll("a"));
      const idx = items.indexOf(a);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        items[(idx + 1) % items.length].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        items[(idx - 1 + items.length) % items.length].focus();
      } else if (e.key === "Escape") {
        const parentLi = dropdown.closest("li");
        parentLi.classList.remove("open");
        parentLi.querySelector(".top-link")?.focus();
      }
    });
  });

  /* event listeners (menu open/close) */
  menuBtn?.addEventListener("click", () => {
    if (navMenu.classList.contains("open")) closeMenu();
    else openMenu();
  });
  closeBtn?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);
  searchToggleBtn?.addEventListener("click", () => {
    if (navMenu.classList.contains("search-active")) closeSearch();
    else openSearch();
  });

  /* mobile: handle clicks inside nav for toggles */
  navMenu.addEventListener("click", (e) => {
    if (isDesktop()) return;
    const toggleButton = e.target.closest(".submenu-toggle");
    const topLink = e.target.closest(".top-link");
    if (toggleButton) {
      e.preventDefault();
      toggleSubmenu(toggleButton);
      return;
    }
    if (topLink && topLink.getAttribute("aria-haspopup") === "true") {
      e.preventDefault();
      const associatedToggleButton = topLink
        .closest(".item-row")
        ?.querySelector(".submenu-toggle");
      if (associatedToggleButton) toggleSubmenu(associatedToggleButton);
    }
  });

  /* Unified document click handler */
  const input = searchInput;
  const form = $(".search-form");
  const box = $("#suggestions");
  const announcer = $("#sr-announcer");

  document.addEventListener("click", (e) => {
    const insideNav = navMenu.contains(e.target) || menuBtn.contains(e.target);

    // Desktop dropdown toggling (Click-only + hover handled separately)
    if (isDesktop()) {
      const topLink = e.target.closest(
        ".nav-menu > ul > li.has-dropdown > .item-row > .top-link"
      );
      const toggleBtn = e.target.closest(
        ".nav-menu > ul > li.has-dropdown > .item-row > .submenu-toggle"
      );
      if (topLink || toggleBtn) {
        e.preventDefault();
        const li = (topLink || toggleBtn).closest("li");
        const isOpen = li.classList.contains("open");
        closeAllSubmenus();
        if (!isOpen) {
          li.classList.add("open");
          li.querySelector(".top-link")?.setAttribute("aria-expanded", "true");
          li.querySelector(".submenu-toggle")?.setAttribute(
            "aria-expanded",
            "true"
          );
        }
        return;
      }
    }

    // Click outside nav -> close submenus + close mobile menu if open
    if (!insideNav) {
      closeAllSubmenus();
      if (!isDesktop()) closeMenu();
    }

    // Medium screens: if search active and click outside nav, closeSearch
    if (
      isMediumScreen() &&
      navMenu.classList.contains("search-active") &&
      !navMenu.contains(e.target)
    ) {
      closeSearch();
    }

    // suggestions: close if clicked outside
    if (box && input && !box.contains(e.target) && e.target !== input) {
      box.style.display = "none";
      box.setAttribute("aria-expanded", "false");
      announcer.textContent = "";
    }
  });

  /* media query change handlers */
  mql.addEventListener("change", () => {
    if (isDesktop() && navMenu.classList.contains("open")) closeMenu();
    if (!isMediumScreen() && navMenu.classList.contains("search-active"))
      closeSearch();
  });
  mqlMedium.addEventListener("change", () => {
    if (!isMediumScreen() && navMenu.classList.contains("search-active"))
      closeSearch();
  });
  window.addEventListener("orientationchange", () => {
    closeMenu();
    closeSearch();
  });

  /* ---------------------------
       Hover support for desktop dropdowns
       (keeps click semantics but adds hover reveal)
       --------------------------- */
  $$(".nav-menu > ul > li.has-dropdown").forEach((li) => {
    let hoverTimeout;
    // pointerenter/leave already used above for measuring; add open/close for UX
    li.addEventListener("pointerenter", () => {
      if (!isDesktop()) return;
      clearTimeout(hoverTimeout);
      scheduleAdjust(li, true);
      // open subtly on hover
      li.classList.add("open2");
      li.querySelector(".top-link")?.setAttribute("aria-expanded", "true");
      li.querySelector(".submenu-toggle")?.setAttribute(
        "aria-expanded",
        "true"
      );
    });
    li.addEventListener("pointerleave", () => {
      if (!isDesktop()) return;
      hoverTimeout = setTimeout(() => {
        li.classList.remove("open2");
        li.querySelector(".top-link")?.setAttribute("aria-expanded", "false");
        li.querySelector(".submenu-toggle")?.setAttribute(
          "aria-expanded",
          "false"
        );
      }, 220);
    });
  });

  /* ---------------------------
       Search suggestions module with Smart Fallback
       --------------------------- */
  let siteIndex = [];
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    if (!Array.isArray(history)) history = [];
  } catch (e) {
    history = [];
  }
  const MAX_HISTORY = 6;

  // load index (pages.json) - professional: external file
  fetch("https://fouadbechar.x10.mx/p/pages.json")
    .then((r) => (r.ok ? r.json() : []))
    .then((data) => {
      if (Array.isArray(data)) siteIndex = data;
    })
    .catch(() => {
      /* fail silently */
    });

  function setHistory(arr) {
    history = arr;
    try {
      localStorage.setItem("searchHistory", JSON.stringify(history));
    } catch (e) {}
  }
  function addHistory(q) {
    const query = (q || "").trim().toLowerCase();
    if (!query) return;
    const next = [query, ...history.filter((h) => h !== query)].slice(
      0,
      MAX_HISTORY
    );
    setHistory(next);
  }

  function filterSite(q) {
    const s = q.toLowerCase();
    return siteIndex
      .filter((p) => (p.title || "").toLowerCase().includes(s))
      .slice(0, 6);
  }
  function filterHistory(q) {
    const s = q.toLowerCase();
    return history
      .filter((h) => h.startsWith(s))
      .slice(0, 4)
      .map((t) => ({ type: "history", text: t }));
  }

  let active = -1;
  let googlePending = null; // track jsonp script id

  function renderSuggestionsFromItems(items) {
    // items: array of {type:'page'|'history'|'google', text, url?}
    if (!box) return;
    box.innerHTML = "";
    active = -1;
    if (!items || !items.length) {
      box.style.display = "none";
      box.setAttribute("aria-expanded", "false");
      announcer.textContent = "";
      return;
    }
    const baseId = "suggest-" + Date.now();
    items.forEach((item, idx) => {
      const div = document.createElement("div");
      const itemId = baseId + "-" + idx;
      div.id = itemId;
      const cls =
        item.type === "page"
          ? "page"
          : item.type === "history"
          ? "history"
          : "google";
      div.className = "suggestion-item " + cls;
      div.setAttribute("role", "option");
      div.setAttribute("data-index", String(idx));
      div.dataset.type = item.type;
      div.dataset.text = item.text;
      if (item.url) div.dataset.url = item.url;

      const span = document.createElement("span");
      span.textContent = item.text;
      div.appendChild(span);

      if (item.type === "history") {
        const del = document.createElement("button");
        del.type = "button";
        del.className = "delete-btn";
        del.title = "Remove";
        del.setAttribute("aria-label", "Remove from history");
        del.innerHTML =
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        div.appendChild(del);
      }

      box.appendChild(div);
    });

    box.style.display = "block";
    box.setAttribute("aria-expanded", "true");
    box.setAttribute("aria-activedescendant", "");
    announcer.textContent = items.length + " suggestions available";
  }

  function renderSuggestions(value) {
    // Primary: local search
    if (!box) return;
    box.innerHTML = "";
    active = -1;
    const q = (value || "").trim();
    if (!q) {
      box.style.display = "none";
      box.setAttribute("aria-expanded", "false");
      announcer.textContent = "";
      return;
    }

    const siteMatches = filterSite(q).map((p) => ({
      type: "page",
      text: p.title,
      url: p.url,
    }));
    const siteTitles = new Set(siteMatches.map((m) => m.text.toLowerCase()));
    const histMatches = filterHistory(q).filter(
      (h) => !siteTitles.has(h.text.toLowerCase())
    );
    const combined = [...siteMatches, ...histMatches];

    if (combined.length) {
      // show local results (no Google call)
      renderSuggestionsFromItems(combined);
    } else {
      // fallback: call Google Smart Suggestions (JSONP)
      fetchGoogleSuggestions(q);
    }
  }

  /* ---------------------------
       Google JSONP suggestions (fallback)
       --------------------------- */
  // expose as global so JSONP callback can call it
  window.handleGoogleSuggestions = function (data) {
    // data format: [query, [suggestions...], ...]
    if (!Array.isArray(data) || !data[1] || !data[1].length) {
      renderSuggestionsFromItems([]); // nothing
      return;
    }
    // convert into items expected by renderSuggestionsFromItems
    const suggestions = data[1].map((s) => ({
      type: "google",
      text: String(s),
    }));
    renderSuggestionsFromItems(suggestions);
  };

  function fetchGoogleSuggestions(query) {
    // remove old if pending
    if (googlePending) {
      const old = document.getElementById(googlePending);
      if (old) old.remove();
      googlePending = null;
    }
    const id = "jsonp-g-" + Date.now();
    googlePending = id;
    const script = document.createElement("script");
    script.id = id;
    // callback param is 'callback' and must match global name above
    script.src = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(
      query
    )}&callback=handleGoogleSuggestions`;
    script.onerror = () => {
      renderSuggestionsFromItems([]);
    };
    document.body.appendChild(script);
    // auto-cleanup later
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.remove();
      if (googlePending === id) googlePending = null;
    }, 8000);
  }

  /* ---------------------------
       Selection / navigation logic
       --------------------------- */
  function selectItem(item) {
    if (!item) return;
    input.value = item.text;
    box.style.display = "none";
    box.setAttribute("aria-expanded", "false");
    addHistory(item.text);

    if (item.type === "page" && item.url) {
      window.location.href = item.url;
      return;
    }
    if (item.type === "google") {
      window.open(
        "https://www.google.com/search?q=" + encodeURIComponent(item.text),
        "_blank"
      );
      return;
    }
    // history or unknown: try local exact match then google
    const exact = siteIndex.find(
      (p) => (p.title || "").toLowerCase() === item.text.toLowerCase()
    );
    if (exact) {
      window.location.href = exact.url;
      return;
    }
    window.open(
      "https://www.google.com/search?q=" + encodeURIComponent(item.text),
      "_blank"
    );
  }

  function navigate(query, directUrl) {
    const q = (query || "").trim();
    if (!q) return;
    addHistory(q);
    if (directUrl) {
      window.location.href = directUrl;
      return;
    }
    const qLower = q.toLowerCase();
    const exact = siteIndex.find(
      (p) => (p.title || "").toLowerCase() === qLower
    );
    if (exact) {
      window.location.href = exact.url;
      return;
    }
    const included = siteIndex.find((p) =>
      (p.title || "").toLowerCase().includes(qLower)
    );
    if (included) {
      window.location.href = included.url;
      return;
    }
    window.open(
      "https://www.google.com/search?q=" + encodeURIComponent(q),
      "_blank"
    );
  }

  /* ---------------------------
       Wiring input / keyboard / delegation
       --------------------------- */
  // form submit: use navigate (local preferred, else google)
  const formEl = form;
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    box.style.display = "none";
    navigate(input.value);
  });

  const debouncedRender = debounce((v) => renderSuggestions(v), 90);
  input.addEventListener("input", (e) => debouncedRender(e.target.value));

  // keyboard navigation for suggestions
  input.addEventListener("keydown", (e) => {
    if (!box) return;
    const items = box.querySelectorAll(".suggestion-item");
    if (!items.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      active = (active + 1) % items.length;
      updateActive(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      active = (active - 1 + items.length) % items.length;
      updateActive(items);
    } else if (e.key === "Enter") {
      if (active > -1) {
        e.preventDefault();
        const el = items[active];
        const selText = el.dataset.text;
        const type = el.dataset.type;
        if (type === "page") {
          const page = siteIndex.find((p) => p.title === selText);
          if (page) selectItem({ type: "page", text: selText, url: page.url });
          else selectItem({ type: "page", text: selText });
        } else if (type === "google")
          selectItem({ type: "google", text: selText });
        else selectItem({ type: el.dataset.type, text: selText });
      } else {
        e.preventDefault();
        navigate(input.value);
      }
    } else if (e.key === "Escape") {
      box.style.display = "none";
      box.setAttribute("aria-expanded", "false");
      announcer.textContent = "";
    }
  });

  function updateActive(items) {
    items.forEach((el) => {
      el.removeAttribute("aria-selected");
    });
    if (active > -1) {
      const el = items[active];
      el.setAttribute("aria-selected", "true");
      box.setAttribute("aria-activedescendant", el.id);
      el.scrollIntoView({ block: "nearest" });
      announcer.textContent = el.textContent + " selected";
    } else {
      box.setAttribute("aria-activedescendant", "");
      announcer.textContent = "";
    }
  }

  // event delegation for suggestion clicks + delete
  box.addEventListener("mousedown", (ev) => {
    ev.preventDefault(); // prevents blur on input
    const item = ev.target.closest(".suggestion-item");
    if (!item) return;
    // delete button click
    if (ev.target.closest(".delete-btn")) {
      const text = item.dataset.text;
      setHistory(history.filter((h) => h !== text));
      renderSuggestions(input.value);
      return;
    }
    const type = item.dataset.type;
    const text = item.dataset.text;
    if (type === "page") {
      const page = siteIndex.find((p) => p.title === text);
      if (page) selectItem({ type: "page", text: text, url: page.url });
      else selectItem({ type: "page", text: text });
    } else if (type === "google") {
      selectItem({ type: "google", text });
    } else {
      selectItem({ type: "history", text });
    }
  });

  // Toggle mic/clear buttons based on input
  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim().length > 0) {
      searchBox.classList.add("show-clear");
    } else {
      searchBox.classList.remove("show-clear");
    }
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    searchBox.classList.remove("show-clear");
  });

  // Color the microphone according to the situation

  function setMicUIState(state) {
    micBtn.classList.remove("mic-granted", "mic-denied", "mic-prompt");
    if (state === "granted") {
      micBtn.classList.add("mic-granted");
    } else if (state === "denied") {
      micBtn.classList.add("mic-denied");
    } else {
      micBtn.classList.add("mic-prompt");
    }
  }

  async function probePermissionAPI() {
    if (!navigator.permissions) return false;
    try {
      const status = await navigator.permissions.query({ name: "microphone" });
      handlePermissionState(status.state);
      status.onchange = () => handlePermissionState(status.state);
      return true;
    } catch (err) {
      return false;
    }
  }

  function handlePermissionState(state) {
    if (state === "granted") setMicUIState("granted");
    else if (state === "denied") setMicUIState("denied");
    else setMicUIState("prompt");
  }

  micBtn.addEventListener("click", async () => {
    const current = micBtn.classList.contains("mic-granted");
    if (current) {
      return;
    }
    setMicUIState("prompt");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicUIState("granted");
      stream.getTracks().forEach((t) => t.stop());
    } catch (err) {
      setMicUIState("denied");
      console.warn("getUserMedia error:", err);
    }
  });

  (async function initMicState() {
    const ok = await probePermissionAPI();
    if (!ok) setMicUIState("prompt");
  })();

  // Voice search

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en";
    recognition.interimResults = false;

    micBtn.addEventListener("click", () => {
      if (micBtn.classList.contains("listening")) {
        recognition.stop();
        micBtn.classList.remove("listening");
      } else {
        recognition.start();
        micBtn.classList.add("listening");
      }
    });

    recognition.addEventListener("result", (e) => {
      const transcript = e.results[0][0].transcript;
      searchInput.value = transcript;
      searchInput.dispatchEvent(new Event("input"));

      // add

      // setTimeout(() => {
      //    searchForm.dispatchEvent(new Event('submit', { bubbles: true }));
      // }, 3000);
    });

    recognition.addEventListener("end", () => {
      micBtn.classList.remove("listening");
    });
  } else {
    micBtn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">' +
      '<path d="M12 1a3.5 3.5 0 0 0-3.5 3.5v6a3.5 3.5 0 0 0 7 0v-6A3.5 3.5 0 0 0 12 1z">' +
      '</path> +<path d="M19 11v1a7 7 0 0 1-14 0v-1">' +
      '</path> <path d="M12 19v4">' +
      "</path>" +
      '<line x1="4" y1="20" x2="20" y2="4" stroke="red" stroke-width="2"/>' +
      "</svg>";
    micBtn.disabled = true;
    micBtn.title = "⚠️ Voice search not supported on this browser";
    console.warn("🎤 Voice recognition not supported in this browser");
  }

  // expose small test helper
  window.__navRefactor = {
    renderSuggestions,
    siteIndex,
    history,
    ddCache,
  };
})();

(function () {
  const text1 = document.getElementById("text1");
  text1.innerHTML =
    "<section>" +
    "<h1 class='bb7'>" +
    "<a class='loadicon010101' href='https://www.greenmountainenergy.com/why-renewable-energy/protect-the-environment' target='_parent'>" +
    "12 ways you can protect the environment" +
    "</a>" +
    "</h1>" +
    "<img class='iiim' src='https://fouadbechar.x10.mx/p/m/image4.webp' alt='image' width='400px' height='224px'/>" +
    "<p class='b3'>" +
    "Most of the damage to our environment stems from consumption: what we consume, how much we consume and how often. Whether it’s gas,food, clothing, cars, furniture, water, toys, electronics, knick-knacks or other goods, we are all consumers. The key is not to stop consuming, but to start being mindful of our consumption habits and how each purchase or action affects the ecosystem. The good news is that it’s often not too difficult, expensive, or inconvenient to become more environmentally friendly. It can even be a fun challenge to implement among your family or coworkers. And though small changes at the individual level may seem trivial, just think how much cleaner the planet would be If everyone adopts behavior modification." +
    "<i class='i0i1'>" +
    "<a class='loadicon010101' href='https://www.greenmountainenergy.com/why-renewable-energy/protect-the-environment' target='_parent'>" +
    "(continued..)" +
    "</a>" +
    "</i>" +
    "</p>" +
    "</section>";

  const text2 = document.getElementById("text2");
  text2.innerHTML =
    "<section>" +
    "<h2 class='bb7'>" +
    "<a class='loadicon010101' href='https://www.un.org/en/climatechange/raising-ambition/renewable-energy' target='_parent'>" +
    "Renewable energy" +
    "</a>" +
    "</h2>" +
    "<img class='iiim' src='https://fouadbechar.x10.mx/p/m/enrg.webp' alt='image' width='400px' height='224px'/>" +
    "<p class='b3'>" +
    "Renewable energy is energy derived from natural sources that are replenished at a higher rate than they are consumed. Sunlight and wind, for example, are such sources that are constantly being replenished. Renewable energy sources are plentiful and all around us. Fossil fuels - coal, oil and gas - on the other hand, are non-renewable resources that take hundreds of millions of years to form. Fossil fuels, when burned to produce energy, cause harmful greenhouse gas emissions, such as carbon dioxide. Generating renewable energy creates far lower emissions than burning fossil fuels. Transitioning from fossil fuels, which currently account for the lion’s share of emissions, to renewable energy is key to addressing the climate crisis. Renewables are now cheaper in most countries, and generate three times more jobs than fossil fuels." +
    "<i class='i0i1'>" +
    "<a class='loadicon010101' href='https://www.un.org/en/climatechange/raising-ambition/renewable-energy' target='_parent'> (continued..) </a>" +
    "</i>" +
    "</p>" +
    "</section>";

  const text3 = document.getElementById("text3");
  text3.innerHTML =
    "<section>" +
    "<h1 class='bb7'>" +
    "<a class='loadicon010101' href='https://www.aroundrobin.com/importance-of-social-justice/' target='_parent'>" +
    "The importance of social justice" +
    "</a>" +
    "</h1>" +
    "<img class='iim' src='https://fouadbechar.x10.mx/p/m/image5.webp' alt='image' width='300px' height='192px'/>" +
    "<p class='b3'>" +
    "We are living in an era of contradictions. While we should focus on building a unified approach towards fighting a global pandemic, we are more divided than ever. We are more connected than ever before in human history, yet are unable to understand the plight of others. We see an evolution of human rights, but see no end to conflict. We are more willing to accept differences, yet discrimination is on the rise. We are living in an era where we have greater freedoms than ever before, yet we see no end to injustice. So where do we go from here? Is there a way to heal the world? Social justice may be the answer." +
    "<i class='i0i1'>" +
    "<a class='loadicon010101' href='https://www.aroundrobin.com/importance-of-social-justice/' target='_parent'>" +
    "(continued..)" +
    "</a>" +
    "</i>" +
    "</p>" +
    "</section>" +
    "<section>" +
    "<h2 class='bb7 animate0110'>" +
    "<a class='loadicon010101' href='https://womenshealth.gov/relationships-and-safety/domestic-violence/effects-domestic-violence-children' target='_parent'>" +
    "Effects of domestic violence on children" +
    "</a>" +
    "</h2>" +
    "<img class='iim animate0110' src='https://fouadbechar.x10.mx/p/m/image06.webp' alt='image' width='300px' height='200px'/>" +
    "<p  class='b3 animate0110'>" +
    "Many children exposed to violence in the home are also victims of physical abuse.One: Children who witness domestic violence or are victims of abuse themselves are at serious risk for long-term physical and mental health problems.two: Children who witness violence between parents may also be at greater risk of being violent in their future relationships. If you are a parent who is experiencing abuse, it can be difficult to know how to protect your child." +
    "<i class='i0i1'>" +
    "<a class='loadicon010101' href='https://womenshealth.gov/relationships-and-safety/domestic-violence/effects-domestic-violence-children' target='_parent'> (continued..) </a>" +
    "</i>" +
    "</p>" +
    "</section>";

  const text4 = document.getElementById("text4");
  text4.innerHTML =
    "<section>" +
    "<h1 class='bb7'>" +
    "<a class='loadicon010101' href='https://riseservicesinc.org/news/5-stages-child-development/#:~:text=Other%20scholars%20describe%20six%20stages,%2C%20school%20age%2C%20and%20adolescents.' target='_parent'>" +
    "What are the 5 stages of child development" +
    "</a>" +
    "</h1>" +
    "<img class='iim' src='https://fouadbechar.x10.mx/p/m/image7.webp' alt='image' width='300px' height='142px'/>" +
    "<p class='b3'>" +
    "Children change rapidly as they grow. Many of these changes are physical. Other changes are cognitive, which means the changes affect the way children think and learn. Child development often occurs in stages, with the majority of children hitting specific developmental landmarks by the time they reach a certain age." +
    "<i class='i0i1'>" +
    "<a class='loadicon010101' href='https://riseservicesinc.org/news/5-stages-child-development/#:~:text=Other%20scholars%20describe%20six%20stages,%2C%20school%20age%2C%20and%20adolescents.' target='_parent'>" +
    "(continued..)" +
    "</a>" +
    "</i>" +
    "</p>" +
    "</section>" +
    "<section>" +
    "<h2 class='bb7 animate0110'>" +
    "<a class='loadicon010101' href='https://caringforkids.cps.ca/handouts/mentalhealth/mental_health' target='_parent' >" +
    "Your child’s mental health" +
    "</a>" +
    "</h2>" +
    "<img class='iim animate0110' src='https://fouadbechar.x10.mx/p/m/image8.webp'  alt='image' width='300px' height='200px' />" +
    "<p class='b3 animate0110'>" +
    "Mental health affects the way people think, feel and act. Taking care of our mental health is just as important as having a healthy body. As a parent, you play an important role in your child's mental health. You can promote good mental health by the things you say and do, and through the environment you create at home. You can also learn about the early signs of mental health problems and know where to go for help." +
    "<i class='i0i1'>" +
    "<a class='loadicon010101' href='https://caringforkids.cps.ca/handouts/mentalhealth/mental_health' target='_parent'>" +
    "(continued..)" +
    "</a>" +
    "</i>" +
    "</p>" +
    "</section>";

  const text5 = document.getElementById("text5");
  text5.innerHTML =
    "<a class='loadicon010101' href='https://a.co/d/b9zan5D' target='_parent' >" +
    "<img src='https://fouadbechar.x10.mx/p/m/book.webp' alt='Description of Image' class='image208 animate0110' width='100px' height='160px'/>" +
    "</a>" +
    "<div class='text208 animate0110'>" +
    "<h2 class='h208'>" +
    "<a class='loadicon010101' href='https://a.co/d/b9zan5D' target='_parent'>" +
    "Quantum computing" +
    "</a>" +
    "</h2>" +
    "<p class='p208'>A short book about quantum computing." +
    "</p>" +
    "</div>";

  const text6 = document.getElementById("text6");
  text6.innerHTML =
    "<section>" +
    "<h2 class='bb7 animate0110'>" +
    "<a class='loadicon010101' href='https://x10hosting.com/' target='_parent'>" +
    "Free Web hosting" +
    "</a>" +
    "</h2>" +
    "<img class='iiim0 animate0110' src='https://fouadbechar.x10.mx/p/m/x10.webp' alt='image' width='400px' height='100px'/>" +
    "<p class='b3 animate0110'> 10+ Years Industry Veteran We've been around for a long time and we're here to stay. Rest assured that we know how to provide a stable, high-performance web hosting service that isn't going to close overnight. We believe that hosting should be accessible to all, and that's precisely why we offer free hosting for everyone. We even give you unmetered bandwidth and disk space? allowing your site to grow without fear of ridiculously low limits like our other free hosting competitors! You won't find many companies doing that free of charge." +
    "<i>" +
    "to visit the official website click here" +
    "</i>" +
    "<i class='i0i1'>" +
    "<a class='loadicon010101' href='https://x10hosting.com/' title='https://x10hosting.com/' target='_parent'>" +
    "x10hosting" +
    "</a>" +
    "</i>" +
    "</p>" +
    "</section>";

  const text7 = document.getElementById("text7");
  text7.innerHTML =
    "<section>" +
    "<h2 class='bb7'>" +
    "<a class='loadicon010101' href='https://youtu.be/nWkAatonIdk' target='_parent'>" +
    "Artificial Intelligence" +
    "</a>" +
    "</h2>" +
    "<a class='loadicon010101' href='https://youtu.be/nWkAatonIdk' target='_parent'>" +
    "<img class='iiim' src='https://fouadbechar.x10.mx/p/m/AI.webp' alt='image' width='400px' height='224px'/>" +
    "</a>" +
    "<div class='container010101 loadicon010101'>" +
    "<h2 class='h2010101'>" +
    "Defining Artificial Intelligence" +
    "</h2>" +
    "<p class='p010101'>" +
    "Artificial intelligence (AI) is a broad field of computer science that aims to create systems capable of performing tasks that typically require human intelligence. This includes activities like:" +
    "</p>" +
    "<ul class='ul010101'>" +
    "<li>" +
    "<strong>Learning:" +
    "</strong>" +
    "Acquiring new information and rules for using it." +
    "</li>" +
    "<li>" +
    "<strong>Reasoning:" +
    "</strong>" +
    "Using rules to reach approximate or definite conclusions." +
    "</li>" +
    "<li>" +
    "<strong>" +
    "Problem-solving:" +
    "</strong>" +
    "Finding solutions to complex challenges." +
    "</li>" +
    "<li>" +
    "<strong>Perception:" +
    "</strong>" +
    "Interpreting sensory information (like images or sound)." +
    "</li>" +
    "<li>" +
    "<strong>Natural language understanding:" +
    "</strong>" +
    "Communicating and interacting with humans through language." +
    "</li>" +
    "</ul>" +
    "<h2 class='h20101012'>" +
    "Key Concepts in AI" +
    "</h2>" +
    "<ul class='ul010101'>" +
    "<li>" +
    "<strong>" +
    "Machine Learning:" +
    "</strong>" +
    "A subset of AI that focuses on algorithms that allow computers to learn from data without explicit programming. This includes techniques like:" +
    "<ul>" +
    "<li>" +
    "<strong>" +
    "Supervised learning:" +
    "</strong>" +
    "Training models on labeled data (e.g., classifying images)." +
    "</li>" +
    "<li>" +
    "<strong>" +
    "Unsupervised learning:" +
    "</strong>" +
    "Finding patterns and structures in unlabeled data (e.g., customer segmentation)." +
    "</li>" +
    "<li>" +
    "<strong>" +
    "Reinforcement learning:" +
    "</strong>" +
    "Training agents to make decisions by rewarding desired behaviors." +
    "</li>" +
    "</ul>" +
    "</li>" +
    "<li>" +
    "<strong>" +
    "Deep Learning: " +
    "</strong>" +
    "A type of machine learning that uses artificial neural networks with multiple layers to analyze complex patterns in data. Deep learning has revolutionized fields like image recognition, natural language processing, and speech recognition." +
    "</li>" +
    "<li>" +
    "<strong>" +
    "Natural Language Processing (NLP):" +
    "</strong>" +
    "The ability of computers to understand, interpret, and generate human language. This includes tasks like:" +
    "<ul>" +
    "<li>" +
    "<strong>" +
    "Translation:" +
    "</strong>" +
    "Converting text from one language to another." +
    "</li>" +
    "<li>" +
    "<strong>" +
    "Sentiment analysis:" +
    "</strong>" +
    "Determining the emotional tone of text." +
    "</li>" +
    "<li>" +
    "<strong>" +
    "Chatbots:" +
    "</strong>" +
    "Interacting with users through conversation." +
    "</li>" +
    "</ul>" +
    "</li>" +
    "</ul>" +
    "<h2 class='h20101012'>" +
    "Applications of AI" +
    "</h2>" +
    "<p class='p010101'>" +
    "AI is rapidly transforming various sectors:" +
    "</p>" +
    "<ul class='ul010101'>" +
    "<li>" +
    "<strong>" +
    "Healthcare:" +
    "</strong>" +
    "Diagnosing diseases, developing new drugs, personalizing treatment plans." +
    "</li>" +
    "<li>" +
    "<strong>" +
    "Finance:" +
    "</strong>" +
    "Fraud detection, algorithmic trading, credit scoring." +
    "</li>" +
    "<li>" +
    "<strong>" +
    "Transportation:" +
    "</strong>" +
    "Self-driving cars, traffic optimization, logistics." +
    "</li>" +
    "<li>" +
    "<strong>" +
    "Customer service:" +
    "</strong>" +
    "Chatbots, virtual assistants, personalized recommendations." +
    "</li>" +
    "<li>" +
    "<strong>" +
    "Entertainment:" +
    "</strong>" +
    "Game development, content creation, personalized streaming." +
    "</li>" +
    "</ul>" +
    "<h2 class='h20101012 animate0110'>" +
    "The Future of AI" +
    "</h2>" +
    "<p class='p010101'>" +
    "AI is an evolving field with significant potential. Continued research and development will likely lead to even more sophisticated AI systems with broader applications. However, it's crucial to address ethical considerations, such as bias, job displacement, and the responsible use of AI." +
    "</p>" +
    "</div>" +
    "</section>";

  const text8 = document.getElementById("text8");
  text8.innerHTML =
    "<div class='mySlides fade'>" +
    "<div class='numbertext'>" +
    "1 / 3" +
    "</div>" +
    "<img class='imgslideshow' src='https://fouadbechar.x10.mx/p/m/image1ss.webp' alt='image' />" +
    "<div class='text'>" +
    "<p>" +
    "<a class='i0i2 loadicon010101' href='https://breathingtravel.com/best-islands-to-visit-in-indonesia/' target='_parent'>" +
    "Bali Island" +
    "</a>" +
    "is one of the most beautiful tourist places in Indonesia, because of its rich natural beauty and ancient history and heritage that makes it one of the best cities in the world." +
    "</p>" +
    "</div>" +
    "</div>" +
    "<div class='mySlides fade'>" +
    "<div class='numbertext'>" +
    "2 / 3" +
    "</div>" +
    "<img class='imgslideshow' src='https://fouadbechar.x10.mx/p/m/image2ss.webp' alt='image' />" +
    "<div class='text'>" +
    "<p>" +
    "<a class='i0i2 loadicon010101' href='https://www.tripadvisor.fr/Tourism-g298566-Osaka_Osaka_Prefecture_Kinki-Vacations.html' target='_parent'>" +
    "Osaka" +
    "</a>" +
    "the second largest and richest city in Japan, and one of the most beautiful tourism cities in Japan and in the world as a whole, due to its long history that extends back to before the 16th century." +
    "</p>" +
    "</div>" +
    "</div>" +
    "<div class='mySlides fade'>" +
    "<div class='numbertext'>" +
    "3 / 3" +
    "</div>" +
    "<img class='imgslideshow' src='https://fouadbechar.x10.mx/p/m/image3ss.webp' alt='image' />" +
    "<div class='text'>" +
    "<p>" +
    "<a class='i0i2 loadicon010101' href='https://www.routard.com/guide/code_dest/new_york.htm' target='_parent'>" +
    "New York" +
    "</a>" +
    "is famous for its world-renowned shopping and fine restaurants around the most important tourist places such as the Statue of Liberty, its historical neighborhoods and museums." +
    "</p>" +
    "</div>" +
    "</div>" +
    "<span class='prev'>" +
    " &lt;" +
    "</span>" +
    "<span class='next'>" +
    " &gt; " +
    "</span>";

  const text9 = document.getElementById("text9");
  text9.innerHTML =
    "<span class='dot' onclick='currentSlide(1)'>" +
    "</span>" +
    "<span class='dot' onclick='currentSlide(2)'>" +
    "</span>" +
    "<span class='dot' onclick='currentSlide(3)'>" +
    "</span>";

  const text10 = document.getElementById("text10");
  text10.innerHTML =
    "<div class='ai-card'>" +
    "<img src='https://fouadbechar.x10.mx/p/m/gpt01.webp' alt='ChatGPT Logo' width='50px' height='50px'/>" +
    "<h3>" +
    "ChatGPT" +
    "</h3>" +
    "<p>" +
    "Smart assistant for programming, writing, and imaginative ideas." +
    "</p>" +
    "<a href='https://chat.openai.com/' target='_parent'>" +
    "Try it now" +
    "</a>" +
    "</div>" +
    "<div class='ai-card'>" +
    "<img src='https://fouadbechar.x10.mx/p/m/gemini01.webp' alt='Gemini Logo' width='50px' height='50px'/>" +
    "<h3>" +
    "Gemini" +
    "</h3>" +
    "<p>" +
    "Artificial intelligence for creativity, search, and images from Google." +
    "</p>" +
    "<a href='https://gemini.google.com/' target='_parent'>" +
    "Try it now" +
    "</a>" +
    "</div>" +
    "<div class='ai-card'>" +
    "<img src='https://fouadbechar.x10.mx/p/m/copilot01.webp' alt='Copilot Logo' width='50px' height='50px'/>" +
    "<h3>" +
    "Copilot" +
    "</h3>" +
    "<p>" +
    "Intelligent assistant in Windows and Office, from Microsoft." +
    "</p>" +
    "<a href='https://copilot.microsoft.com/' target='_parent'>" +
    "Try it now" +
    "</a>" +
    "</div>";

  const text11 = document.getElementById("text11");
  text11.innerHTML =
    "<center>" +
    "<span>" +
    "<a class='loadicon010101' href='https://www.facebook.com/FouadBechar2' target='_parent'>" +
    "<img class='img321' src='https://fouadbechar.x10.mx/p/m/image0104.webp' alt='image0102' width='30px' height='30px'/>" +
    "</a>" +
    "<a class='loadicon010101' href='https://x.com/FouadBechar' target='_parent'>" +
    "<img class='im0im1' src='https://fouadbechar.x10.mx/p/m/image0105.webp' alt='image0105' width='30px' height='30px' />" +
    "</a>" +
    "<a class='loadicon010101' href='https://www.youtube.com/channel/UCi3RVanUvgW2o1Ld5lt7EjA' target='_parent'>" +
    "<img class='im0im2' src='https://fouadbechar.x10.mx/p/m/youtb.webp' alt='image0105' width='43px' height='30px' />" +
    "</a>" +
    "<img  id='open-btn' src='https://fouadbechar.x10.mx/p/m/ml.webp' alt='email' width='30px' height='30px' />" +
    "</span>" +
    "<div class='pr0101'>" +
    "<a href='p/v/pr' target='_parent'>" +
    "Privacy Policy" +
    "</a>" +
    "</div>" +
    "</center>";
})();

(function () {
  var ua = navigator.userAgent || "";

  var isIE = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
  var noAddEvent = !("addEventListener" in window);

  var isOldWin = /(Windows XP|Windows Vista|Windows NT 6\.0)/i.test(ua);
  var isOldAndroid = /Android [0-4]\./i.test(ua);
  var isOldIOS = /(iPhone OS [0-9]_|\biPad; CPU OS [0-9]_)/i.test(ua);
  var isOldMac = /\bMac OS X 10_[0-9]\b/i.test(ua);

  var isLinux = /Linux/i.test(ua);
  var isVeryOldFirefox = /Firefox\/([0-2]?\d|3\d)\./i.test(ua); // 0–39
  var isVeryOldChrome = /(Chrome|Chromium)\/([0-2]?\d|3\d)\./i.test(ua); // 0–39
  var isVeryOldGecko = /rv:[0-4]\./i.test(ua);
  var isVeryOldOpera = /(Opera\/(9|10)|OPR\/(1\d|2\d))/i.test(ua);
  var isOldLinux =
    isLinux &&
    (isVeryOldFirefox || isVeryOldChrome || isVeryOldGecko || isVeryOldOpera);

  var isOldOS = isOldWin || isOldAndroid || isOldIOS || isOldMac || isOldLinux;

  var hasModern =
    "querySelector" in document &&
    "addEventListener" in window &&
    "localStorage" in window &&
    "JSON" in window &&
    "Promise" in window &&
    "fetch" in window;

  var isOldBrowser = !hasModern;

  var docEl = document.documentElement || {};
  var docDir = (docEl.dir || "").toLowerCase();
  var lang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  var isArabic = docDir === "rtl" || lang.indexOf("ar") === 0;

  var STR = isArabic
    ? {
        title: "تنبيه مهم",
        desc: "يبدو أن متصفحك أو نظام التشغيل لديك قديم، وقد لا يعرض هذا الموقع بالشكل الصحيح. للحصول على أفضل أداء وأمان، يرجى تحديث المتصفح.",
        btn: "كيفية تحديث المتصفح",
        dir: "rtl",
      }
    : {
        title: "Important notice",
        desc: "Your browser or operating system appears to be outdated and may not display this site correctly. For best performance and security, please update your browser.",
        btn: "How to update your browser",
        dir: "ltr",
      };

  var GUIDE =
    "https://www.whatismybrowser.com/guides/how-to-update-your-browser/";

  function baseCSS() {
    return (
      "" +
      "body{margin:0;padding:0}" +
      ".full-warning{position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;" +
      "display:flex;flex-direction:column;justify-content:center;align-items:center;" +
      "background:#111;color:#eee;text-align:center;padding:24px;z-index:9999999;direction:" +
      STR.dir +
      "}" +
      ".full-warning .fw-inner{max-width:760px;margin:0 16px;background:#1a1a1a;padding:20px 18px;" +
      "border:1px solid #2a2a2a;/* older IE ignores radius/shadow */border-radius:10px}" +
      ".full-warning h1{font-size:26px;margin:0 0 10px;font-family:Arial,Helvetica,sans-serif}" +
      ".full-warning p{font-size:15px;line-height:1.65;margin:0 0 16px;font-family:Arial,Helvetica,sans-serif}" +
      ".full-warning .actions{margin-top:8px;display:flex;gap:12px;flex-wrap:wrap;justify-content:center}" +
      ".full-warning a.btn{display:inline-block;background:#3a86ff;color:#fff;text-decoration:none;" +
      "padding:10px 14px;border-radius:8px;font-size:14px;font-family:Arial,Helvetica,sans-serif}" +
      ".full-warning a.btn:focus{outline:2px solid #fff;outline-offset:2px}"
    );
  }

  function writeOverlayWithDocumentWrite() {
    var html =
      "<style>" +
      baseCSS() +
      "</style>" +
      '<div class="full-warning">' +
      '<div class="fw-inner">' +
      "<h1>" +
      STR.title +
      "</h1>" +
      "<p>" +
      STR.desc +
      "</p>" +
      '<div class="actions">' +
      '<a class="btn" href="' +
      GUIDE +
      '" target="_blank" rel="noopener">' +
      STR.btn +
      "</a>" +
      "</div>" +
      "</div>" +
      "</div>";
    document.write(html);
  }

  function injectOverlay() {
    var style = document.createElement("style");
    style.type = "text/css";
    var css = baseCSS();
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    (
      document.head ||
      document.getElementsByTagName("head")[0] ||
      document.documentElement
    ).appendChild(style);

    var box = document.createElement("div");
    box.className = "full-warning";
    box.innerHTML =
      '<div class="fw-inner">' +
      "<h1>" +
      STR.title +
      "</h1>" +
      "<p>" +
      STR.desc +
      "</p>" +
      '<div class="actions">' +
      '<a class="btn" href="' +
      GUIDE +
      '" target="_blank" rel="noopener">' +
      STR.btn +
      "</a>" +
      "</div>" +
      "</div>";

    var append = function () {
      if (document.body) {
        document.body.appendChild(box);
      } else {
        document.documentElement.appendChild(box);
      }
    };
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      append();
    } else if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", append, false);
    } else if (document.attachEvent) {
      document.attachEvent("onreadystatechange", function () {
        if (document.readyState === "complete") append();
      });
    } else {
      setTimeout(append, 50);
    }
  }

  if (isIE || noAddEvent) {
    if (document.readyState === "loading") {
      writeOverlayWithDocumentWrite();
    } else {
      injectOverlay();
    }
  } else if (isOldOS || isOldBrowser) {
    injectOverlay();
  }
})();

(function () {
  document.addEventListener("scroll", function () {
    const elements = document.querySelectorAll(".animate0110");
    const windowHeight = window.innerHeight;

    elements.forEach((element) => {
      const position = element.getBoundingClientRect().top;

      if (position < windowHeight) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  });
})();

(function () {
  const messages = {
    ar: {
      text: "يستخدم هذا الموقع ملفات تعريف الارتباط لتحسين تجربتك.",
      accept: "أوافق",
      decline: "أرفض",
    },
    en: {
      text: "This site uses cookies to enhance your experience.",
      accept: "Accept",
      decline: "Decline",
    },
  };

  const lang = document.documentElement.lang.startsWith("ar") ? "ar" : "en";
  const cookieConsent = document.getElementById("cookie-consent");
  const msg = messages[lang];

  document.getElementById("cookie-message").textContent = msg.text;
  document.getElementById("accept").textContent = msg.accept;
  document.getElementById("decline").textContent = msg.decline;

  function getCookie(name) {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  }

  function setCookie(name, value, days) {
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value}; max-age=${maxAge}; path=/; SameSite=Lax; Secure`;
  }

  if (!getCookie("consent")) {
    cookieConsent.style.display = "block";
    cookieConsent.classList.add("show2");
  }

  document.getElementById("accept").addEventListener("click", () => {
    setCookie("consent", "accepted", 30);
    closeConsent();
  });

  document.getElementById("decline").addEventListener("click", () => {
    setCookie("consent", "declined", 30);
    closeConsent();
  });

  function closeConsent() {
    cookieConsent.classList.remove("show2");
    cookieConsent.classList.add("hide");
    setTimeout(() => cookieConsent.remove(), 500);
  }
})();

(function () {
  let slideIndex = 1;
  let slideInterval;
  let isPaused = false;

  function plusSlides(n) {
    if (!isPaused) {
      clearInterval(slideInterval);
      showSlides((slideIndex += n));
      slideInterval = setInterval(() => showSlides((slideIndex += 1)), 10000);
    }
  }

  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  prevButton.addEventListener("click", () => plusSlides(-1));
  nextButton.addEventListener("click", () => plusSlides(1));

  function currentSlide(n) {
    if (!isPaused) {
      clearInterval(slideInterval);
      showSlides((slideIndex = n));
      slideInterval = setInterval(() => showSlides((slideIndex += 1)), 10000);
    }
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }

  document.addEventListener("DOMContentLoaded", (event) => {
    showSlides(slideIndex);
    slideInterval = setInterval(() => showSlides((slideIndex += 1)), 10000);
  });

  document.querySelectorAll(".mySlides").forEach((img) => {
    img.addEventListener("mouseover", () => {
      clearInterval(slideInterval);
      isPaused = true;
    });

    img.addEventListener("mouseout", () => {
      isPaused = false;
      slideInterval = setInterval(() => showSlides((slideIndex += 1)), 10000);
    });
  });
})();

(function () {
  var vido;
  var clo;
  var im00;
  var aaa001;
  var divvv12;

  function video() {
    vido = document.getElementById("vid");
    clo = document.getElementById("cl");
    im00 = document.getElementById("im0");
    aaa001 = document.getElementById("aa001");
    divvv12 = document.getElementById("divv12");
    vido.src =
      "https://res.cloudinary.com/dougpslkv/video/upload/v1708992004/WWF.mp4";
    clo.style.display = "block";
    vido.style.display = "block";
    aaa001.style.display = "block";
    im00.style.display = "none";
    divvv12.style.display = "none";
  }

  function closse() {
    vido = document.getElementById("vid");
    clo = document.getElementById("cl");
    clo.style.display = "none";
    vido.style.display = "none";
    aaa001.style.display = "none";
    im00.style.display = "block";
    divvv12.style.display = "block";
    vido.src = "";
  }
})();

(function () {
  document.querySelectorAll(".link010101").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .getElementById("loading-icon010101")
        .classList.remove("hidden010101");

      fetch(e.target.href)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((data) => {
          document
            .getElementById("loading-icon010101")
            .classList.add("hidden010101");
          window.location.href = e.target.href;
        })
        .catch((error) => {
          console.error("Error:", error);
          document
            .getElementById("loading-icon010101")
            .classList.add("hidden010101");
          window.location.href = "/";
        });
    });
  });
})();

(function () {
  document.querySelectorAll(".loadicon010101").forEach((link) => {
    link.addEventListener("click", function () {
      document.getElementById("loadingIcon01010").style.display = "block";

      setTimeout(() => {
        loadingIcon01010.style.display = "none";
      }, 3000);
    });
  });
})();

(function () {
  const formContainer = document.getElementById("form-container");
  const form = document.getElementById("my-form");
  const closeBtn2 = document.getElementById("close-btn2");
  const openBtn = document.getElementById("open-btn");
  const fileInput = document.getElementById("file-input");
  const filePreview = document.getElementById("file-preview");
  const responseMsg = document.getElementById("responseMessage");

  let isClosing = false;

  openBtn.addEventListener("click", () => {
    form.classList.remove("fade-out");
    void form.offsetWidth;
    form.classList.add("bounce-in");
    formContainer.style.display = "flex";
    openBtn.style.display = "none";
  });

  closeBtn2.addEventListener("click", () => {
    if (isClosing) return;
    isClosing = true;
    form.classList.remove("bounce-in");
    form.classList.add("fade-out");
    setTimeout(() => {
      formContainer.style.display = "none";
      responseMsg.textContent = "";
      responseMsg.style.padding = "0px";
      openBtn.style.display = "inline-block";
      isClosing = false;
    }, 600);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch("https://fouadbechar.x10.mx/p/api05", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        responseMsg.textContent = data.message;
        responseMsg.style.color = data.status === "success" ? "green" : "red";
        responseMsg.style.padding = data.status === "success" ? "4px" : "4px";

        if (data.status === "success") {
          form.reset();
          filePreview.textContent = "";
        }
      })
      .catch((err) => {
        responseMsg.textContent = "Error: " + err;
        responseMsg.style.color = "red";
      });
  });

  fileInput.addEventListener("change", function () {
    if (this.files[0] && this.files[0].size > 5 * 1024 * 1024) {
      alert("File too large (max 5MB)");
      this.value = "";
      filePreview.textContent = "";
    } else {
      filePreview.textContent =
        this.files.length > 0 ? "Selected: " + this.files[0].name : "";
    }
  });
})();

(function () {
  const openPop11 = document.querySelector(".open01");
  const closePop11 = document.querySelector(".close");
  const wrapper = document.querySelector(".wrapper");
  const vividd1 = document.querySelector(".vividd");
  openPop11.addEventListener("click", () => {
    wrapper.classList.add("active");
    vividd1.src =
      "https://res.cloudinary.com/dgi9vyjff/video/upload/v1729979577/WWF.mp4";
  });
  closePop11.addEventListener("click", () => {
    wrapper.classList.remove("active");
    vividd1.src = "";
  });
})();

(function () {
  function myFunction1(url) {
    window.open(url, "_blank");
  }
  function myFunction2(url) {
    window.open(url, "_parent");
  }
})();

(function () {
  const chatBox = document.getElementById("chat-box");
  const chatToggle = document.getElementById("chat-toggle");
  const closeBtn = document.getElementById("close-btn");
  const clearBtn2 = document.getElementById("clear-btn");
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const chatMessages = document.getElementById("chat-messages");

  const i18n = {
    en: {
      tooLong: "Your message is too long. Please shorten it.",
      fetchErr: (err) => `🤖 Error while connecting: ${err}`,
      defaultReply: "🤖 ...",
      emptyMsg: "⚠️ Message is empty. Please say something.",
    },
    ar: {
      tooLong: "رسالتك طويلة جدًا. قصّرها شوية من فضلك.",
      fetchErr: (err) => `🤖 حدث خطأ أثناء الاتصال: ${err}`,
      defaultReply: "🤖 ...",
      emptyMsg: "⚠️ الرسالة فارغة. أرسل شيئًا مفيدًا",
    },
    fr: {
      tooLong: "Votre message est trop long. Veuillez le raccourcir.",
      fetchErr: (err) => `🤖 Erreur de connexion : ${err}`,
      defaultReply: "🤖 ...",
      emptyMsg: "⚠️ Le message est vide. Écrivez quelque chose.",
    },
  };

  function detectLanguage(text) {
    if (/[؀-ۿ]/.test(text)) return "ar";
    if (/[éèêàâùûôçïü]/i.test(text)) return "fr";
    return "en";
  }

  const STORAGE_KEY = "chatHistory";
  let messagesHistory = [];

  function saveToHistory(text, role) {
    try {
      const hist = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      hist.push({ text, role });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(hist));
    } catch (_) {}
  }

  function loadHistory() {
    try {
      const hist = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      hist.forEach((msg) => appendMessage(msg.text, msg.role, false));
    } catch (_) {}
  }

  function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
    messagesHistory = [];
    chatMessages.innerHTML = "";
  }

  function appendMessage(content, role, save = true) {
    const messageElement = createMessageElement(content, role);
    chatMessages.appendChild(messageElement);
    messageElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    if (save) saveMessage(content, role);
    scrollToBottom();
    return messageElement;
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function createMessageElement(content, role) {
    const msg = document.createElement("div");
    msg.className = `bubble ${role}`;
    msg.style.animation = "fadeInUp 0.4s ease-out";

    const inner = document.createElement("div");
    inner.className = "bubble-content";

    if (typeof content === "string") {
      inner.innerHTML = sanitizeLinks(content);
    } else {
      inner.appendChild(content);
    }

    msg.appendChild(inner);
    return msg;
  }

  function sanitizeLinks(text) {
    const escaped = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return escaped.replace(/(https?:\/\/[^\s]+)/g, (url) => {
      if (!/^https?:\/\//i.test(url)) return url;
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  }

  function saveMessage(content, role) {
    try {
      const cleanText =
        typeof content === "string" ? content : content.textContent;
      saveToHistory(cleanText, role);
    } catch (err) {
      console.warn("⚠️ Failed to save message:", err);
    }
  }

  function showTyping() {
    const dots = document.createElement("span");
    dots.className = "typing-dots";
    dots.innerHTML = "<span>.</span><span>.</span><span>.</span>";
    return appendMessage(dots, "bot", false);
  }

  chatToggle.addEventListener("click", () => {
    chatBox.classList.remove("fade-out");
    void chatBox.offsetWidth;
    chatBox.classList.add("bounce-in");
    chatBox.style.display = "flex";
    chatToggle.style.display = "none";
  });

  closeBtn.addEventListener("click", () => {
    chatBox.classList.remove("bounce-in");
    chatBox.classList.add("fade-out");
    chatBox.style.display = "none";
    chatToggle.style.display = "block";
  });

  clearBtn2.addEventListener("click", clearHistory);

  async function sendMessage() {
    const message = userInput.value.trim();
    const lang = detectLanguage(message);

    if (!message) {
      appendMessage(i18n[lang].emptyMsg, "bot");
      return;
    }

    if (message.length > 300) {
      appendMessage(i18n[lang].tooLong, "bot");
      return;
    }

    appendMessage(message, "user");
    userInput.value = "";
    messagesHistory.push({ role: "user", content: message });

    const typingPlaceholder = showTyping();
    try {
      sendBtn.disabled = true;
      const res = await fetch("https://chat-779e.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesHistory }),
      });

      const data = await res.json();
      if (!res.ok || !data.reply?.trim())
        throw new Error("No valid response from the bot.");

      typingPlaceholder.remove();
      appendMessage(data.reply, "bot");
      messagesHistory.push({ role: "assistant", content: data.reply });
      saveToHistory(data.reply, "bot");
    } catch (err) {
      typingPlaceholder.remove();
      appendMessage(i18n[lang].fetchErr(err.message), "bot");
    } finally {
      sendBtn.disabled = false;
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Warm-up connection when the page loads
  async function warmUpConnection() {
    try {
      await fetch("https://chat-779e.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "system", content: "warmup" }],
        }),
      });
      console.log("🔥 Chat server warmed up!");
    } catch (err) {
      console.warn("⚠️ Warm-up failed:", err.message);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadHistory();
    if (messagesHistory.length === 0) {
      appendMessage("Hello! How can I assist you today?", "bot", false);
    }
    warmUpConnection();
  });
})();
