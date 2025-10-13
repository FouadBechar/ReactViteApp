import React, { useEffect } from 'react';
import logo from '/src/assets/images/incon01.png';

export default function NavBar() {
  useEffect(() => {
    const $ = (s, ctx = document) => ctx.querySelector(s);
    const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
    function debounce(fn, wait = 80) {
      let t;
      return (...a) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...a), wait);
      };
    }
    // ...existing utility functions

    const mql = window.matchMedia('(min-width:768px)');
    const mqlMedium = window.matchMedia('(max-width:1024px)');
    const isDesktop = () => mql.matches;
    const isMediumScreen = () => window.innerWidth >= 768 && window.innerWidth <= 1024;

    const menuBtn = $('#menuBtn');
    const closeBtn = $('#closeBtn');
    const navMenu = $('#navMenu');
    const overlay = $('#overlay');
    const searchToggleBtn = $('#searchToggleBtn');
    const searchBox = $('#searchBox');
    const searchInput = $('#searchInput');
    const clearBtn = $('#clearBtn');
    const navListItems = $$('.nav-menu > ul > li').length
      ? $$('.nav-menu > ul > li')
      : $$('#navLinks > li');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const micBtn = $('#micBtn');
    if (micBtn) {
      micBtn.setAttribute('aria-live', 'polite');
      micBtn.setAttribute('aria-label', 'Listening...');
    }

    let ddCache = new WeakMap();
    const RO =
      window.ResizeObserver ||
      class {
        observe() {}
        disconnect() {}
      };
    const ro = new RO(entries => {
      entries.forEach(e => ddCache.delete(e.target));
    });

    function measureDropdownWidth(dropdown) {
      if (!dropdown) return 0;
      if (ddCache.has(dropdown)) return ddCache.get(dropdown);
      const clone = dropdown.cloneNode(true);
      clone.style.visibility = 'hidden';
      clone.style.display = 'block';
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      document.body.appendChild(clone);
      const w = Math.ceil(clone.getBoundingClientRect().width);
      document.body.removeChild(clone);
      ddCache.set(dropdown, w);
      return w;
    }

    function adjustDropdownPosition(li, force = false) {
      if (!isDesktop()) return;
      if (li.dataset.alignLocked === 'true' && !force) return;
      const dropdown = li.querySelector('.dropdown');
      if (!dropdown) return;
      const ddWidth = measureDropdownWidth(dropdown);
      const liRect = li.getBoundingClientRect();
      const willOverflowRight = liRect.left + ddWidth > window.innerWidth - 12;
      dropdown.classList.toggle('align-right', willOverflowRight);
    }

    const scheduled = new WeakMap();
    function scheduleAdjust(li, force = false) {
      if (!isDesktop()) return;
      if (li.dataset.alignLocked === 'true' && !force) return;
      if (scheduled.get(li)) return;
      scheduled.set(li, true);
      requestAnimationFrame(() => {
        adjustDropdownPosition(li, force);
        scheduled.delete(li);
      });
    }

    navListItems.forEach(li => {
      const dd = li.querySelector('.dropdown');
      if (dd) ro.observe(dd);

      li.addEventListener('pointerenter', () => {
        scheduleAdjust(li, true);
        li.dataset.alignLocked = 'true';
      });
      li.addEventListener('pointerleave', () => {
        delete li.dataset.alignLocked;
      });

      const topLink = li.querySelector('.top-link');
      if (topLink) {
        topLink.addEventListener('focus', () => {
          scheduleAdjust(li, true);
          li.dataset.alignLocked = 'true';
        });
        topLink.addEventListener('blur', () => {
          delete li.dataset.alignLocked;
        });
      }
    });

    window.addEventListener(
      'resize',
      debounce(() => {
        ddCache = new WeakMap();
        navListItems.forEach(li => scheduleAdjust(li, true));
      }, 120)
    );
    navListItems.forEach(li => scheduleAdjust(li, true));

    let lastFocusedBeforeOpen = null;

    function trapFocus(e) {
      if (isDesktop() || !navMenu.classList.contains('open')) return;
      const focusable = navMenu.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
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
      $$('.nav-menu li.open').forEach(li => {
        li.classList.remove('open');
        li.querySelector('.submenu-toggle')?.setAttribute('aria-expanded', 'false');
        li.querySelector('.top-link')?.setAttribute('aria-expanded', 'false');
      });
    }

    function openMenu() {
      if (navMenu.classList.contains('open')) return;
      lastFocusedBeforeOpen = document.activeElement;
      document.body.style.overflow = 'hidden';
      navMenu.classList.add('open');
      overlay.classList.add('show');
      menuBtn.setAttribute('aria-expanded', 'true');
      navMenu.setAttribute('aria-hidden', 'false');
      if (!isDesktop()) {
        navMenu.setAttribute('aria-modal', 'true');
      } else {
        navMenu.setAttribute('aria-modal', 'false');
      }
      closeBtn.focus();
      document.addEventListener('keydown', handleKeydown);
    }

    function closeMenu() {
      if (!navMenu.classList.contains('open')) return;
      document.body.style.overflow = '';
      navMenu.classList.remove('open');
      overlay.classList.remove('show');
      menuBtn.setAttribute('aria-expanded', 'false');
      navMenu.setAttribute('aria-hidden', 'true');
      navMenu.setAttribute('aria-modal', 'false');
      closeAllSubmenus();
      try {
        lastFocusedBeforeOpen?.focus();
      } catch (err) {
        console.debug('NavBar focus restore error', err);
      }
      lastFocusedBeforeOpen = null;
      document.removeEventListener('keydown', handleKeydown);
    }

    function openSearch() {
      navMenu.classList.add('search-active');
      searchInput?.focus();
    }
    function closeSearch() {
      navMenu.classList.remove('search-active');
      searchToggleBtn?.focus();
    }

    function handleKeydown(e) {
      if (e.key === 'Escape') {
        if (navMenu.classList.contains('search-active') && isMediumScreen()) closeSearch();
        else closeMenu();
      } else {
        trapFocus(e);
      }
    }

    function toggleSubmenu(btn) {
      const parentLi = btn.closest('li');
      const isExpanded = parentLi.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isExpanded));
      parentLi.querySelector('.top-link')?.setAttribute('aria-expanded', String(isExpanded));
      $$('.nav-menu li.open').forEach(li => {
        if (li !== parentLi) {
          li.classList.remove('open');
          li.querySelector('.submenu-toggle')?.setAttribute('aria-expanded', 'false');
          li.querySelector('.top-link')?.setAttribute('aria-expanded', 'false');
        }
      });
    }

    $$('.top-link').forEach(link => {
      link.addEventListener('keydown', e => {
        const li = link.closest('li');
        const dropdown = li.querySelector('.dropdown');
        if (!dropdown) return;
        const items = Array.from(dropdown.querySelectorAll('a'));
        if (!items.length) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (!li.classList.contains('open')) {
            li.classList.add('open');
            link.setAttribute('aria-expanded', 'true');
            li.querySelector('.submenu-toggle')?.setAttribute('aria-expanded', 'true');
          }
          items[0].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (!li.classList.contains('open')) {
            li.classList.add('open');
            link.setAttribute('aria-expanded', 'true');
            li.querySelector('.submenu-toggle')?.setAttribute('aria-expanded', 'true');
          }
          items[items.length - 1].focus();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const toggle = li.querySelector('.submenu-toggle');
          if (toggle) toggleSubmenu(toggle);
        } else if (e.key === 'Escape') {
          li.classList.remove('open');
          link.setAttribute('aria-expanded', 'false');
          li.querySelector('.submenu-toggle')?.setAttribute('aria-expanded', 'false');
          link.focus();
        }
      });
    });

    $$('.dropdown a').forEach(a => {
      a.addEventListener('keydown', e => {
        const dropdown = a.closest('.dropdown');
        if (!dropdown) return;
        const items = Array.from(dropdown.querySelectorAll('a'));
        const idx = items.indexOf(a);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          items[(idx + 1) % items.length].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          items[(idx - 1 + items.length) % items.length].focus();
        } else if (e.key === 'Escape') {
          const parentLi = dropdown.closest('li');
          parentLi.classList.remove('open');
          parentLi.querySelector('.top-link')?.focus();
        }
      });
    });

    menuBtn?.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) closeMenu();
      else openMenu();
    });
    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);
    searchToggleBtn?.addEventListener('click', () => {
      if (navMenu.classList.contains('search-active')) closeSearch();
      else openSearch();
    });

    navMenu.addEventListener('click', e => {
      if (isDesktop()) return;
      const toggleButton = e.target.closest('.submenu-toggle');
      const topLink = e.target.closest('.top-link');
      if (toggleButton) {
        e.preventDefault();
        toggleSubmenu(toggleButton);
        return;
      }
      if (topLink && topLink.getAttribute('aria-haspopup') === 'true') {
        e.preventDefault();
        const associatedToggleButton = topLink
          .closest('.item-row')
          ?.querySelector('.submenu-toggle');
        if (associatedToggleButton) toggleSubmenu(associatedToggleButton);
      }
    });

    const input = searchInput;
    const form = $('.search-form');
    const box = $('#suggestions');
    const announcer = $('#sr-announcer');

    document.addEventListener('click', e => {
      const insideNav = navMenu.contains(e.target) || menuBtn.contains(e.target);

      if (isDesktop()) {
        const topLink = e.target.closest(
          '.nav-menu > ul > li.has-dropdown > .item-row > .top-link'
        );
        const toggleBtn = e.target.closest(
          '.nav-menu > ul > li.has-dropdown > .item-row > .submenu-toggle'
        );
        if (topLink || toggleBtn) {
          e.preventDefault();
          const li = (topLink || toggleBtn).closest('li');
          const isOpen = li.classList.contains('open');
          closeAllSubmenus();
          if (!isOpen) {
            li.classList.add('open');
            li.querySelector('.top-link')?.setAttribute('aria-expanded', 'true');
            li.querySelector('.submenu-toggle')?.setAttribute('aria-expanded', 'true');
          }
          return;
        }
      }

      if (!insideNav) {
        closeAllSubmenus();
        if (!isDesktop()) closeMenu();
      }

      if (
        isMediumScreen() &&
        navMenu.classList.contains('search-active') &&
        !navMenu.contains(e.target)
      ) {
        closeSearch();
      }

      if (box && input && !box.contains(e.target) && e.target !== input) {
        box.style.display = 'none';
        box.setAttribute('aria-expanded', 'false');
        announcer.textContent = '';
      }
    });

    mql.addEventListener('change', () => {
      if (isDesktop() && navMenu.classList.contains('open')) closeMenu();
      if (!isMediumScreen() && navMenu.classList.contains('search-active')) closeSearch();
    });
    mqlMedium.addEventListener('change', () => {
      if (!isMediumScreen() && navMenu.classList.contains('search-active')) closeSearch();
    });
    window.addEventListener('orientationchange', () => {
      closeMenu();
      closeSearch();
    });

    $$('.nav-menu > ul > li.has-dropdown').forEach(li => {
      let hoverTimeout;
      li.addEventListener('pointerenter', () => {
        if (!isDesktop()) return;
        clearTimeout(hoverTimeout);
        scheduleAdjust(li, true);
        li.classList.add('open2');
        li.querySelector('.top-link')?.setAttribute('aria-expanded', 'true');
        li.querySelector('.submenu-toggle')?.setAttribute('aria-expanded', 'true');
      });
      li.addEventListener('pointerleave', () => {
        if (!isDesktop()) return;
        hoverTimeout = setTimeout(() => {
          li.classList.remove('open2');
          li.querySelector('.top-link')?.setAttribute('aria-expanded', 'false');
          li.querySelector('.submenu-toggle')?.setAttribute('aria-expanded', 'false');
        }, 220);
      });
    });

    let siteIndex = [];
    let history = [];
    try {
      history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      if (!Array.isArray(history)) history = [];
    } catch (err) {
      history = [];
      console.debug('NavBar load history error', err);
    }
    const MAX_HISTORY = 6;

    fetch('/pages.json')
      .then(r => (r.ok ? r.json() : []))
      .then(data => {
        if (Array.isArray(data)) siteIndex = data;
      })
      .catch(err => {
        console.debug('NavBar fetch pages.json error', err);
      });

    function setHistory(arr) {
      history = arr;
      try {
        localStorage.setItem('searchHistory', JSON.stringify(history));
      } catch (err) {
        console.debug('NavBar setHistory persist error', err);
      }
    }
    function addHistory(q) {
      const query = (q || '').trim().toLowerCase();
      if (!query) return;
      const next = [query, ...history.filter(h => h !== query)].slice(0, MAX_HISTORY);
      setHistory(next);
    }

    function filterSite(q) {
      const s = q.toLowerCase();
      return siteIndex.filter(p => (p.title || '').toLowerCase().includes(s)).slice(0, 6);
    }
    function filterHistory(q) {
      const s = q.toLowerCase();
      return history
        .filter(h => h.startsWith(s))
        .slice(0, 4)
        .map(t => ({ type: 'history', text: t }));
    }

    let active = -1;
    let googlePending = null;

    function renderSuggestionsFromItems(items) {
      if (!box) return;
      box.innerHTML = '';
      active = -1;
      if (!items || !items.length) {
        box.style.display = 'none';
        box.setAttribute('aria-expanded', 'false');
        announcer.textContent = '';
        return;
      }
      const baseId = 'suggest-' + Date.now();
      items.forEach((item, idx) => {
        const div = document.createElement('div');
        const itemId = baseId + '-' + idx;
        div.id = itemId;
        const cls = item.type === 'page' ? 'page' : item.type === 'history' ? 'history' : 'google';
        div.className = 'suggestion-item ' + cls;
        div.setAttribute('role', 'option');
        div.setAttribute('data-index', String(idx));
        div.dataset.type = item.type;
        div.dataset.text = item.text;
        if (item.url) div.dataset.url = item.url;

        const span = document.createElement('span');
        span.textContent = item.text;
        div.appendChild(span);

        if (item.type === 'history') {
          const del = document.createElement('button');
          del.type = 'button';
          del.className = 'delete-btn';
          del.title = 'Remove';
          del.setAttribute('aria-label', 'Remove from history');
          del.innerHTML =
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
          div.appendChild(del);
        }

        box.appendChild(div);
      });

      box.style.display = 'block';
      box.setAttribute('aria-expanded', 'true');
      box.setAttribute('aria-activedescendant', '');
      announcer.textContent = items.length + ' suggestions available';
    }

    function renderSuggestions(value) {
      // Primary: local search
      if (!box) return;
      box.innerHTML = '';
      active = -1;
      const q = (value || '').trim();
      if (!q) {
        box.style.display = 'none';
        box.setAttribute('aria-expanded', 'false');
        announcer.textContent = '';
        return;
      }

      const siteMatches = filterSite(q).map(p => ({
        type: 'page',
        text: p.title,
        url: p.url,
      }));
      const siteTitles = new Set(siteMatches.map(m => m.text.toLowerCase()));
      const histMatches = filterHistory(q).filter(h => !siteTitles.has(h.text.toLowerCase()));
      const combined = [...siteMatches, ...histMatches];

      if (combined.length) {
        renderSuggestionsFromItems(combined);
      } else {
        fetchGoogleSuggestions(q);
      }
    }

    window.handleGoogleSuggestions = function (data) {
      if (!Array.isArray(data) || !data[1] || !data[1].length) {
        renderSuggestionsFromItems([]); // nothing
        return;
      }
      const suggestions = data[1].map(s => ({
        type: 'google',
        text: String(s),
      }));
      renderSuggestionsFromItems(suggestions);
    };

    function fetchGoogleSuggestions(query) {
      if (googlePending) {
        const old = document.getElementById(googlePending);
        if (old) old.remove();
        googlePending = null;
      }
      const id = 'jsonp-g-' + Date.now();
      googlePending = id;
      const script = document.createElement('script');
      script.id = id;
      script.src = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(
        query
      )}&callback=handleGoogleSuggestions`;
      script.onerror = () => {
        renderSuggestionsFromItems([]);
      };
      document.body.appendChild(script);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.remove();
        if (googlePending === id) googlePending = null;
      }, 8000);
    }

    function selectItem(item) {
      if (!item) return;
      input.value = item.text;
      box.style.display = 'none';
      box.setAttribute('aria-expanded', 'false');
      addHistory(item.text);

      if (item.type === 'page' && item.url) {
        window.location.href = item.url;
        return;
      }
      if (item.type === 'google') {
        window.open('https://www.google.com/search?q=' + encodeURIComponent(item.text), '_blank');
        return;
      }
      const exact = siteIndex.find(p => (p.title || '').toLowerCase() === item.text.toLowerCase());
      if (exact) {
        window.location.href = exact.url;
        return;
      }
      window.open('https://www.google.com/search?q=' + encodeURIComponent(item.text), '_blank');
    }

    function navigate(query, directUrl) {
      const q = (query || '').trim();
      if (!q) return;
      addHistory(q);
      if (directUrl) {
        window.location.href = directUrl;
        return;
      }
      const qLower = q.toLowerCase();
      const exact = siteIndex.find(p => (p.title || '').toLowerCase() === qLower);
      if (exact) {
        window.location.href = exact.url;
        return;
      }
      const included = siteIndex.find(p => (p.title || '').toLowerCase().includes(qLower));
      if (included) {
        window.location.href = included.url;
        return;
      }
      window.open('https://www.google.com/search?q=' + encodeURIComponent(q), '_blank');
    }

    const formEl = form;
    formEl.addEventListener('submit', e => {
      e.preventDefault();
      box.style.display = 'none';
      navigate(input.value);
    });

    const debouncedRender = debounce(v => renderSuggestions(v), 90);
    input.addEventListener('input', e => debouncedRender(e.target.value));

    input.addEventListener('keydown', e => {
      if (!box) return;
      const items = box.querySelectorAll('.suggestion-item');
      if (!items.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        active = (active + 1) % items.length;
        updateActive(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        active = (active - 1 + items.length) % items.length;
        updateActive(items);
      } else if (e.key === 'Enter') {
        if (active > -1) {
          e.preventDefault();
          const el = items[active];
          const selText = el.dataset.text;
          const type = el.dataset.type;
          if (type === 'page') {
            const page = siteIndex.find(p => p.title === selText);
            if (page) selectItem({ type: 'page', text: selText, url: page.url });
            else selectItem({ type: 'page', text: selText });
          } else if (type === 'google') selectItem({ type: 'google', text: selText });
          else selectItem({ type: el.dataset.type, text: selText });
        } else {
          e.preventDefault();
          navigate(input.value);
        }
      } else if (e.key === 'Escape') {
        box.style.display = 'none';
        box.setAttribute('aria-expanded', 'false');
        announcer.textContent = '';
      }
    });

    function updateActive(items) {
      items.forEach(el => {
        el.removeAttribute('aria-selected');
      });
      if (active > -1) {
        const el = items[active];
        el.setAttribute('aria-selected', 'true');
        box.setAttribute('aria-activedescendant', el.id);
        el.scrollIntoView({ block: 'nearest' });
        announcer.textContent = el.textContent + ' selected';
      } else {
        box.setAttribute('aria-activedescendant', '');
        announcer.textContent = '';
      }
    }

    box.addEventListener('mousedown', ev => {
      ev.preventDefault();
      const item = ev.target.closest('.suggestion-item');
      if (!item) return;
      if (ev.target.closest('.delete-btn')) {
        const text = item.dataset.text;
        setHistory(history.filter(h => h !== text));
        renderSuggestions(input.value);
        return;
      }
      const type = item.dataset.type;
      const text = item.dataset.text;
      if (type === 'page') {
        const page = siteIndex.find(p => p.title === text);
        if (page) selectItem({ type: 'page', text: text, url: page.url });
        else selectItem({ type: 'page', text: text });
      } else if (type === 'google') {
        selectItem({ type: 'google', text });
      } else {
        selectItem({ type: 'history', text });
      }
    });

    searchInput.addEventListener('input', () => {
      if (searchInput.value.trim().length > 0) {
        searchBox.classList.add('show-clear');
      } else {
        searchBox.classList.remove('show-clear');
      }
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      searchBox.classList.remove('show-clear');
    });

    function setMicUIState(state) {
      if (!micBtn) return;
      micBtn.classList.remove('mic-granted', 'mic-denied', 'mic-prompt');
      if (state === 'granted') {
        micBtn.classList.add('mic-granted');
      } else if (state === 'denied') {
        micBtn.classList.add('mic-denied');
      } else {
        micBtn.classList.add('mic-prompt');
      }
    }

    async function probePermissionAPI() {
      if (!navigator.permissions) return false;
      try {
        const status = await navigator.permissions.query({
          name: 'microphone',
        });
        handlePermissionState(status.state);
        status.onchange = () => handlePermissionState(status.state);
        return true;
      } catch (err) {
        return false;
      }
    }

    function handlePermissionState(state) {
      if (state === 'granted') setMicUIState('granted');
      else if (state === 'denied') setMicUIState('denied');
      else setMicUIState('prompt');
    }

    if (micBtn) {
      micBtn.addEventListener('click', async () => {
        const current = micBtn.classList.contains('mic-granted');
        if (current) {
          return;
        }
        setMicUIState('prompt');
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          setMicUIState('granted');
          stream.getTracks().forEach(t => t.stop());
        } catch (err) {
          setMicUIState('denied');
          console.warn('getUserMedia error:', err);
        }
      });
    }

    (async function initMicState() {
      const ok = await probePermissionAPI();
      if (!ok) setMicUIState('prompt');
    })();

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en';
      recognition.interimResults = false;

      micBtn.addEventListener('click', () => {
        if (micBtn.classList.contains('listening')) {
          recognition.stop();
          micBtn.classList.remove('listening');
        } else {
          recognition.start();
          micBtn.classList.add('listening');
        }
      });

      recognition.addEventListener('result', e => {
        const transcript = e.results[0][0].transcript;
        searchInput.value = transcript;
        searchInput.dispatchEvent(new Event('input'));
      });

      recognition.addEventListener('end', () => {
        micBtn.classList.remove('listening');
      });
    } else {
      if (micBtn) {
        micBtn.innerHTML =
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">' +
          '<path d="M12 1a3.5 3.5 0 0 0-3.5 3.5v6a3.5 3.5 0 0 0 7 0v-6A3.5 3.5 0 0 0 12 1z"></path>' +
          '<path d="M19 11v1a7 7 0 0 1-14 0v-1"></path>' +
          '<path d="M12 19v4"></path>' +
          '<line x1="4" y1="20" x2="20" y2="4" stroke="red" stroke-width="2"/>' +
          '</svg>';
        micBtn.disabled = true;
        micBtn.title = '⚠️ Voice search not supported on this browser';
      }
      console.warn('🎤 Voice recognition not supported in this browser');
    }

    window.__navRefactor = {
      renderSuggestions,
      siteIndex,
      history,
      ddCache,
    };

    return () => {
      try {
        if (window.__navRefactor) delete window.__navRefactor;
      } catch (err) {
        console.debug('NavBar cleanup __navRefactor error', err);
      }
      try {
        if (window.handleGoogleSuggestions) delete window.handleGoogleSuggestions;
      } catch (err) {
        console.debug('NavBar cleanup handleGoogleSuggestions error', err);
      }
    };
  }, []);

  return (
    <nav role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <div className="logo" aria-label="Logos">
          <a href="/" aria-label="FouadBechar">
            <img src={logo} alt="Fouad Bechar logo" />
          </a>
        </div>

        <button
          className="menu-btn"
          id="menuBtn"
          aria-expanded="false"
          aria-controls="navMenu"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div
          className="nav-menu"
          id="navMenu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="menuTitle"
        >
          <h2 id="menuTitle" className="visually-hidden">
            Main Menu
          </h2>

          <button className="close-btn" id="closeBtn" aria-label="Close menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <ul id="navLinks">
            <li className="has-dropdown">
              <div className="item-row">
                <button
                  type="button"
                  className="top-link"
                  id="orgLink"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Organizations
                </button>
                <button className="submenu-toggle" aria-expanded="false" aria-controls="orgMenu">
                  ▾
                </button>
              </div>
              <div className="dropdown" id="orgMenu" role="group" aria-labelledby="orgLink">
                <ul>
                  <li>
                    <a href="https://www.iucn.org/">IUCN</a>
                  </li>
                  <li>
                    <a href="https://www.worldwildlife.org/">WWF</a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="has-dropdown">
              <div className="item-row">
                <button
                  type="button"
                  className="top-link"
                  id="cultureLink"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Culture
                </button>
                <button
                  className="submenu-toggle"
                  aria-expanded="false"
                  aria-controls="cultureMenu"
                >
                  ▾
                </button>
              </div>
              <div className="dropdown" id="cultureMenu" role="group" aria-labelledby="cultureLink">
                <ul>
                  <li>
                    <a href="https://techcrunch.com/">Sciences</a>
                  </li>
                  <li>
                    <a href="https://alalbani.info/">Islam</a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="has-dropdown">
              <div className="item-row">
                <button
                  type="button"
                  className="top-link"
                  id="compLink"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Computer
                </button>
                <button className="submenu-toggle" aria-expanded="false" aria-controls="compMenu">
                  ▾
                </button>
              </div>
              <div className="dropdown" id="compMenu" role="group" aria-labelledby="compLink">
                <ul>
                  <li>
                    <a href="https://www.virustotal.com/gui/home/upload">Online scan</a>
                  </li>
                  <li>
                    <a href="https://www.totalav.com/free-antivirus-software-2">Protect PC</a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="has-dropdown">
              <div className="item-row">
                <button
                  type="button"
                  className="top-link"
                  id="gamesLink"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Games
                </button>
                <button className="submenu-toggle" aria-expanded="false" aria-controls="gamesMenu">
                  ▾
                </button>
              </div>
              <div className="dropdown" id="gamesMenu" role="group" aria-labelledby="gamesLink">
                <ul>
                  <li>
                    <a href="https://www.combatsiege.com/">Combat Siege</a>
                  </li>
                  <li>
                    <a href="https://www.hero-wars.com/">Hero Wars</a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="has-dropdown account-item">
              <div className="item-row">
                <a href="https://fouadbechar-platform.vercel.app">
                  <button
                    type="button"
                    className="top-link"
                    id="accountLink"
                    aria-haspopup="true"
                    aria-expanded="false"
                    title="Register"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      fill="#e5e7eb"
                    >
                      <g fill="none">
                        <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                        <path
                          fill="#e5e7eb"
                          d="M6 7a5 5 0 1 1 10 0A5 5 0 0 1 6 7Zm-1.178 7.671C6.425 13.694 8.605 13 11 13c.447 0 .887.024 1.316.07a1 1 0 0 1 .72 1.557A5.968 5.968 0 0 0 12 18c0 .92.207 1.79.575 2.567a1 1 0 0 1-.89 1.428L11 22c-2.229 0-4.335-.14-5.913-.558c-.785-.208-1.524-.506-2.084-.956C2.41 20.01 2 19.345 2 18.5c0-.787.358-1.523.844-2.139c.494-.625 1.177-1.2 1.978-1.69ZM18 14a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1Z"
                        />
                      </g>
                    </svg>
                  </button>
                </a>
                <button
                  type="button"
                  className="submenu-toggle"
                  aria-expanded="false"
                  aria-controls="accountMenu"
                >
                  ▾
                </button>
              </div>

              {/* <div
                className="dropdown"
                id="accountMenu"
                role="group"
                aria-labelledby="accountLink"
              >
                <ul>
                  <li>
                    <a href="/login">Sign in</a>
                  </li>
                  <li>
                    <a href="/register">Register</a>
                  </li>
                </ul>
              </div> */}
            </li>
          </ul>

          <button className="search-toggle-btn" id="searchToggleBtn" aria-label="Open search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <div className="search-box" id="searchBox" role="search">
            <form className="search-form" role="search" onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                id="searchInput"
                placeholder="Search..."
                aria-label="Search"
                aria-autocomplete="list"
                aria-controls="suggestions"
                autoComplete="off"
              />
              <button
                type="button"
                className="mic-btn"
                id="micBtn"
                aria-label="Voice search"
                title="Voice search"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 1a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              </button>
              <button type="button" className="clear-btn" id="clearBtn" aria-label="Delete">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <button type="submit" aria-label="Submit search" title="Search">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>

            <div
              id="suggestions"
              className="results-dropdown"
              role="listbox"
              aria-label="Search suggestions"
              aria-expanded="false"
              aria-activedescendant=""
              tabIndex={0}
            ></div>
            <div
              id="sr-announcer"
              className="visually-hidden"
              aria-live="polite"
              aria-atomic="true"
            ></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
