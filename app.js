const app = document.getElementById('app');
const e = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const currentPath = (location.pathname.replace(/^\/checkme-demo/, '').replace(/\/$/, '') || '/');
const siteHref = route => route.startsWith('/checkme-demo') ? route : '/checkme-demo' + route;
const safeHref = href => /^\/[a-z0-9/-]*$/i.test(href) ? siteHref(href) : siteHref('/');
const requestedDesign = new URLSearchParams(location.search).get('design');
const design = ['alpine', 'mono'].includes(requestedDesign) ? requestedDesign : 'editorial';
const designSwitcher = () => `<div class="design-switcher" aria-label="Comparer les trois directions visuelles"><span class="design-switcher-label">TROIS DIRECTIONS / MÊMES TEXTES</span><a href="${siteHref(currentPath)}?design=editorial" class="${design === 'editorial' ? 'selected' : ''}">01 — Éditorial</a><a href="${siteHref(currentPath)}?design=alpine" class="${design === 'alpine' ? 'selected' : ''}">02 — Altitude</a><a href="${siteHref(currentPath)}?design=mono" class="${design === 'mono' ? 'selected' : ''}">03 — Noir & blanc</a></div>`;
let content;

// Original precision diagrams for the monochrome direction.
const sketchPaths = {
  heart: '<circle cx="50" cy="50" r="35"/><circle cx="50" cy="50" r="40" stroke-dasharray="2 7"/><path d="M17 51 H33 L39 39 L47 64 L54 31 L61 55 L67 47 H83"/><path d="M50 5 V16 M50 84 V95 M5 50 H16 M84 50 H95"/>',
  lens: '<circle cx="50" cy="50" r="31"/><circle cx="50" cy="50" r="20"/><circle cx="50" cy="50" r="6"/><path d="M50 6 V19 M50 81 V94 M6 50 H19 M81 50 H94 M25 25 L34 34 M66 66 L75 75"/><path d="M17 75 H33 M67 25 H83"/>',
  report: '<rect x="17" y="14" width="66" height="72" rx="2"/><path d="M17 30 H83 M28 22 H32 M37 22 H41 M46 22 H50 M27 65 H73 M27 74 H61"/><path d="M27 53 H36 L42 43 L49 58 L57 38 L63 50 H73"/><circle cx="69" cy="22" r="2"/>',
  pulse: '<circle cx="50" cy="50" r="36"/><path d="M14 50 H28 L35 39 L43 64 L51 28 L58 61 L65 44 L72 50 H86"/><path d="M26 18 V82 M50 14 V86 M74 18 V82 M18 27 H82 M14 74 H86" opacity=".35"/>',
  cells: '<circle cx="50" cy="50" r="31"/><circle cx="50" cy="50" r="9"/><circle cx="33" cy="35" r="4"/><circle cx="68" cy="35" r="4"/><circle cx="69" cy="67" r="4"/><circle cx="33" cy="68" r="4"/><path d="M37 37 L44 44 M56 44 L64 37 M57 56 L65 64 M43 57 L36 65 M50 10 V19 M50 81 V90 M10 50 H19 M81 50 H90"/>',
  compass: '<circle cx="50" cy="50" r="35"/><circle cx="50" cy="50" r="23"/><circle cx="50" cy="50" r="4"/><path d="M50 7 V31 M50 69 V93 M7 50 H31 M69 50 H93 M50 50 L66 34 M16 16 L23 23 M77 77 L84 84"/><path d="M57 24 A28 28 0 0 1 76 42"/>',
};
const sketch = (name, className = '') => `<svg class="sketch ${className}" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${sketchPaths[name]}</svg>`;

const arrow = '<span aria-hidden="true">↗</span>';
const button = (label, href, style = 'dark') => `<a class="btn btn-${style}" href="${safeHref(href)}">${e(label)} ${arrow}</a>`;
const heading = (eyebrow, title, intro = '') => `<div class="section-heading reveal"><p class="eyebrow"><span class="eyebrow-line"></span>${e(eyebrow)}</p><h2>${e(title)}</h2>${intro ? `<p class="section-intro">${e(intro)}</p>` : ''}</div>`;
const visual = name => `<div class="image-wrap"><img src="/checkme-demo/assets/${name}" alt="Espace de consultation contemporain CheckMe"></div>`;
const nav = c => `<header class="site-header"><a class="brand" href="/" aria-label="CheckMe, accueil"><span class="brand-mark"><i></i><i></i><i></i><i></i></span>${e(c.brand.name)}<span class="brand-period">.</span></a><button class="menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false"><span></span><span></span></button><nav class="main-nav" aria-label="Navigation principale">${c.nav.map(item => `<a href="${safeHref(item.href)}" class="${currentPath === item.href ? 'active' : ''}">${e(item.label)}</a>`).join('')}<a class="nav-contact" href="/contact">Nous contacter ${arrow}</a></nav></header>`;
const footer = c => `<footer class="footer"><div class="footer-top"><div><a class="brand brand-footer" href="/"><span class="brand-mark"><i></i><i></i><i></i><i></i></span>${e(c.brand.name)}<span class="brand-period">.</span></a><p>${e(c.footer.line)}</p></div><div class="footer-links">${c.nav.map(item => `<a href="${safeHref(item.href)}">${e(item.label)}</a>`).join('')}<a href="/contact">Contact</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} CheckMe</span><span>${e(c.footer.legal)}</span></div></footer>`;
const notice = c => `<div class="preview-notice"><span class="pulse-dot"></span>${e(c.brand.notice)}</div>`;
const steps = c => `<section class="section section-steps"><div class="container">${heading(c.journey.eyebrow, c.journey.title, c.journey.intro)}<div class="steps-grid">${c.journey.steps.map((s, i) => `<article class="step-card reveal" style="--delay:${i * 90}ms"><span class="step-number">${e(s.number)}</span>${sketch(['report', 'lens', 'pulse'][i % 3], 'step-sketch')}<div class="step-rule"></div><h3>${e(s.title)}</h3><p>${e(s.body)}</p></article>`).join('')}</div></div></section>`;
const offerCards = c => `<section class="section section-offers"><div class="container">${heading(c.offers.eyebrow, c.offers.title, c.offers.intro)}<div class="offer-grid">${c.offers.items.map((o, i) => `<article class="offer-card reveal" style="--delay:${i * 100}ms"><div class="offer-top"><span>${e(o.number)} / 03</span><span class="offer-arrow">↗</span></div>${sketch(['heart', 'cells', 'compass'][i % 3], 'offer-sketch')}<div><p class="offer-tag">${e(o.tag)}</p><h3>${e(o.name)}</h3><p class="offer-description">${e(o.description)}</p></div><div class="offer-bottom"><span>${e(o.detail)}</span><span class="offer-plus">+</span></div></article>`).join('')}</div></div></section>`;
const faqList = c => `<section class="section section-faq"><div class="container faq-layout">${heading(c.faq.eyebrow, c.faq.title)}<div class="faq-list">${c.faq.items.map((f, i) => `<details class="faq-item reveal" ${i === 0 ? 'open' : ''}><summary><span class="faq-index">0${i + 1}</span><span>${e(f.question)}</span><span class="faq-plus">+</span></summary><p>${e(f.answer)}</p></details>`).join('')}</div></div></section>`;
const closing = c => `<section class="closing"><div class="container closing-inner"><div><p class="eyebrow">${e(c.home.closingEyebrow)}</p><h2>${e(c.home.closingTitle)}</h2></div>${button(c.home.closingCta, '/contact', 'light')}</div></section>`;
const founderSection = (c, showLink = true) => `<section class="section founder-section"><div class="container founder-grid"><figure class="founder-portrait reveal"><img src="/checkme-demo/assets/guillaume-richalet.jpg" alt="Portrait du Dr Guillaume Richalet"><figcaption>${e(c.founder.portraitCredit)}</figcaption></figure><div class="founder-copy reveal"><p class="eyebrow"><span class="eyebrow-line"></span>${e(c.founder.eyebrow)}</p><h2>${e(c.founder.title)}</h2><p class="founder-intro">${e(c.founder.intro)}</p><p>${e(c.founder.bio)}</p><p>${e(c.founder.vision)}</p><div class="founder-credentials"><span>${e(c.founder.credentialOne)}</span><span>${e(c.founder.credentialTwo)}</span><span>${e(c.founder.credentialThree)}</span></div>${showLink ? '<a class="text-link" href="/histoire">Notre histoire <span>↗</span></a>' : ''}</div></div></section>`;

function home(c) {
  const heroTitle = design === 'editorial' ? e(c.home.title) : e(c.home.title).replace('. ', '.<br> ');
  return `<section class="hero"><div class="hero-copy"><div class="hero-copy-inner"><p class="eyebrow hero-eyebrow"><span class="eyebrow-line"></span>${e(c.home.eyebrow)}</p><h1>${heroTitle}</h1><p class="hero-intro">${e(c.home.intro)}</p><div class="hero-actions">${button(c.home.primaryCta, '/parcours')}${button(c.home.secondaryCta, '/bilans', 'outline')}</div><div class="hero-foot"><span class="hero-scroll-line"></span>FAITES DÉFILER POUR DÉCOUVRIR</div></div></div><div class="hero-visual"><img src="/checkme-demo/assets/${design === 'mono' ? 'grenoble-checkup.png' : 'center-hero.png'}" alt="${design === 'mono' ? 'Projection d’un espace de consultation avec vue sur les montagnes grenobloises' : 'Espace de consultation lumineux et contemporain'}"><div class="hero-image-label"><span class="label-icon">✳</span> Votre santé, votre point de départ</div></div><div class="hero-side-word">CHECKME / 001</div></section>
  <section class="manifesto section"><div class="container manifesto-grid"><div class="manifesto-lead reveal"><p class="eyebrow"><span class="eyebrow-line"></span>${e(c.home.manifestoEyebrow)}</p><h2>${e(c.home.manifestoTitle)}</h2><div class="asterisk">✳</div></div><div class="manifesto-detail reveal"><p>${e(c.home.manifestoBody)}</p><a class="text-link" href="/approche">Notre approche <span>↗</span></a></div></div></section>
  ${steps(c)}${offerCards(c)}<section class="image-statement"><div class="image-statement-image">${visual('consultation.png')}</div><div class="image-statement-copy"><p class="eyebrow">NOTRE CONVICTION</p><blockquote>“${e(c.home.quote)}”</blockquote><span class="statement-rule"></span><p>${e(c.home.quoteBy)} — ${e(c.home.quoteRole)}</p></div></section>${founderSection(c)}${faqList(c)}${closing(c)}`;
}
function pageHero(eyebrow, title, intro, image = '') {
  return `<section class="page-hero ${image ? 'page-hero-image' : ''}"><div class="container page-hero-inner"><div><p class="eyebrow"><span class="eyebrow-line"></span>${e(eyebrow)}</p><h1>${e(title)}</h1><p>${e(intro)}</p></div>${image ? `<img src="/checkme-demo/assets/${image}" alt="Ambiance CheckMe">` : '<div class="page-hero-star">✳</div>'}</div></section>`;
}
function journey(c) { return pageHero(c.journey.eyebrow, c.journey.title, c.journey.intro, design === 'alpine' ? 'alpine-hero.png' : 'center-hero.png') + steps(c) + `<section class="section center-note"><div class="container"><p class="eyebrow">${e(c.journey.noteEyebrow)}</p><h2>${e(c.journey.noteTitle)}<br><em>${e(c.journey.noteEmphasis)}</em></h2><p>${e(c.journey.noteBody)}</p></div></section>` + closing(c); }
function offers(c) { return pageHero(c.offers.eyebrow, c.offers.title, c.offers.intro) + offerCards(c) + `<section class="section center-note"><div class="container"><p class="eyebrow">${e(c.offers.noteEyebrow)}</p><h2>${e(c.offers.noteTitle)}<br><em>${e(c.offers.noteEmphasis)}</em></h2><p>${e(c.offers.noteBody)}</p></div></section>` + closing(c); }
function approach(c) { return pageHero(c.approach.eyebrow, c.approach.title, c.approach.intro, 'consultation.png') + `<section class="section approach-section"><div class="container">${heading(c.approach.pillarsEyebrow, c.approach.pillarsTitle)}<div class="pillars">${c.approach.pillars.map((p,i) => `<article class="pillar reveal"><span>0${i+1}</span>${sketch(['heart', 'cells', 'compass'][i % 3], 'pillar-sketch')}<h3>${e(p.title)}</h3><p>${e(p.body)}</p><span class="pillar-symbol">✳</span></article>`).join('')}</div></div></section>` + steps(c) + closing(c); }
function story(c) { return pageHero(c.founder.eyebrow, c.founder.title, c.founder.intro, design === 'mono' ? 'grenoble-checkup.png' : 'center-hero.png') + founderSection(c, false) + closing(c); }
function business(c) { return pageHero(c.business.eyebrow, c.business.title, c.business.intro, 'center-hero.png') + `<section class="section business-section"><div class="container business-card reveal"><span>${e(c.business.cardLabel)}</span><h2>${e(c.business.cardTitle)}</h2><p>${e(c.business.cardBody)}</p>${button(c.business.cta, '/contact')}</div></section>` + closing(c); }
function contact(c) { return pageHero(c.contact.eyebrow, c.contact.title, c.contact.intro) + `<section class="section contact-section"><div class="container contact-grid"><div class="contact-symbol">✳</div><div class="contact-info"><p class="eyebrow">${e(c.contact.infoEyebrow)}</p><h2>${e(c.contact.infoTitle)}</h2><div class="contact-line"><span>EMAIL</span><strong>${c.contact.email ? `<a href="mailto:${e(c.contact.email)}">${e(c.contact.email)}</a>` : 'Adresse en préparation'}</strong></div><div class="contact-line"><span>ADRESSE</span><strong>${e(c.contact.address || 'Lieu à confirmer')}</strong></div><div class="contact-line"><span>HORAIRES</span><strong>${e(c.contact.hours || 'À venir')}</strong></div><p class="contact-caution">${e(c.contact.caution)}</p></div></div></section>`; }
function render() {
  const c = content;
  document.documentElement.dataset.design = design === 'mono' ? 'alpine' : design;
  document.documentElement.dataset.variant = design;
  const routes = { '/': home, '/parcours': journey, '/bilans': offers, '/approche': approach, '/histoire': story, '/entreprises': business, '/faq': x => pageHero(x.faq.eyebrow, x.faq.title, x.faq.pageIntro) + faqList(x) + closing(x), '/contact': contact };
  const page = routes[currentPath] || routes['/'];
  app.innerHTML = `${designSwitcher()}${notice(c)}${nav(c)}<main id="main">${page(c)}</main>${footer(c)}`;
  const editMode = new URLSearchParams(location.search).get('edit') === '1';
  document.querySelectorAll('a[href^="/"]').forEach(link => {
    if (link.getAttribute('href') === '/admin') return;
    const url = new URL(link.href); if (!url.pathname.startsWith('/checkme-demo/')) url.pathname = siteHref(url.pathname);
    if (design !== 'editorial' && !url.searchParams.has('design')) url.searchParams.set('design', design);
    if (editMode) url.searchParams.set('edit', '1');
    link.href = `${url.pathname}${url.search}`;
  });
  document.title = `${currentPath === '/' ? c.brand.strapline : (currentPath === '/bilans' ? 'Nos bilans' : currentPath.slice(1).charAt(0).toUpperCase() + currentPath.slice(2))} — CheckMe`;
  document.querySelector('.menu-toggle')?.addEventListener('click', event => {
    const open = document.body.classList.toggle('menu-open');
    event.currentTarget.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => document.body.classList.remove('menu-open')));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.09 });
  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
  window.dispatchEvent(new Event('checkme:rendered'));
}
fetch('/checkme-demo/content.json').then(response => response.json()).then(data => { content = data; render(); }).catch(() => { app.innerHTML = '<p class="load-error">Le site est temporairement indisponible.</p>'; });
