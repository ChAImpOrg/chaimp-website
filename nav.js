/*
 * Shared site navigation — single source of truth.
 *
 * Each page carries an empty <nav id="site-nav" aria-label="Primary"></nav> placeholder
 * followed by <script src="nav.js"></script>. This script fills it, so the nav markup
 * lives in exactly one place and can never drift between pages again.
 *
 * To change a link, edit NAV_ITEMS below — every page updates at once.
 */
(function () {
  // The one list. `href` beginning with '#' is an in-page anchor on index.html;
  // on other pages it is rewritten to index.html#anchor so it still resolves.
  var NAV_ITEMS = [
    { href: '#services',    label: 'What We Do' },
    { href: 'saas.html',    label: 'Our Solutions' },
    { href: '#serve',       label: 'Who We Serve' },
    { href: '#casestudies', label: 'Case Studies' },
    { href: '#founder',     label: 'About' },
    { href: '#board',       label: 'Board' },
    { href: '#contact',     label: 'Get in Touch', cta: true }
  ];

  // Current page filename ('' when served as a directory index → treat as home).
  var page = location.pathname.split('/').pop() || 'index.html';
  var isIndex = page === '' || page === 'index.html';

  // Fixed active section for the standalone pages; index uses scroll-spy (below).
  var pageActive = null;
  if (page === 'saas.html') pageActive = 'saas.html';
  else if (page === 'board.html') pageActive = '#board';

  function anchorId(href) {
    return href.charAt(0) === '#' ? href.slice(1) : null; // 'services' | null
  }

  function resolveHref(href) {
    if (href.charAt(0) !== '#') return href;          // page link, leave as-is
    return isIndex ? href : 'index.html' + href;      // anchor → absolute off-index
  }

  var links = NAV_ITEMS.map(function (item) {
    var cls = [];
    if (item.cta) cls.push('nav-cta');
    if (!item.cta && pageActive === item.href) cls.push('active');
    var classAttr = cls.length ? ' class="' + cls.join(' ') + '"' : '';
    var aria = (pageActive === item.href) ? ' aria-current="page"' : '';
    var idAttr = anchorId(item.href) ? ' data-nav-anchor="' + anchorId(item.href) + '"' : '';
    return '<li><a href="' + resolveHref(item.href) + '"' + classAttr + aria + idAttr + '>' +
      item.label + '</a></li>';
  }).join('');

  var logoHref = isIndex ? '#' : 'index.html';

  var markup =
    '<a href="' + logoHref + '" class="nav-logo">' +
      '<img src="ChAImp_Logo.png" alt="ChAImp logo" />' +
      '<span class="nav-wordmark" aria-label="ChAImp, pronounced Champ" title="/tʃæmp/">Ch<span>AI</span>mp</span>' +
      '<span class="nav-pron" aria-hidden="true">("Champ")</span>' +
    '</a>' +
    '<ul class="nav-links">' + links + '</ul>';

  // Active-state style injected once, so it lives here too (single source).
  if (!document.getElementById('site-nav-style')) {
    var st = document.createElement('style');
    st.id = 'site-nav-style';
    st.textContent = '.nav-links a.active{color:var(--teal);font-weight:700;}';
    document.head.appendChild(st);
  }

  var nav = document.getElementById('site-nav');
  if (!nav) return;
  nav.innerHTML = markup;

  // Scroll-spy: on the home page, highlight the section currently in view.
  // This script runs inline near the top of <body>, so the sections it needs
  // are not parsed yet — wait for the full DOM before wiring the observer.
  function initScrollSpy() {
    if (!isIndex || !('IntersectionObserver' in window)) return;
    var byId = {};
    nav.querySelectorAll('a[data-nav-anchor]').forEach(function (a) {
      byId[a.getAttribute('data-nav-anchor')] = a;
    });
    var order = Object.keys(byId);          // document order of the anchors
    var visible = {};                       // id -> currently crossing the line
    var current = null;
    function setActive(a) {
      if (a === current) return;
      if (current) { current.classList.remove('active'); current.removeAttribute('aria-current'); }
      current = a;
      if (a) { a.classList.add('active'); a.setAttribute('aria-current', 'true'); }
    }
    function refresh() {
      // When several short sections straddle the line, the lowest in document
      // order is the one actually scrolled into — pick that, deterministically.
      var pick = null;
      order.forEach(function (id) { if (visible[id]) pick = id; });
      setActive(pick ? byId[pick] : null);
    }
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      refresh();
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    order.forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollSpy);
  } else {
    initScrollSpy();
  }
})();
