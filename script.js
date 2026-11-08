'use strict';

const WHATSAPP_NUMBER = '5514997074108';
const INSTAGRAM_URL = 'https://www.instagram.com/claucianamarsola/';
const messages = {
  geral: 'Olá, Clauciana! 😊 Conheci seu site e gostaria de fazer uma encomenda. Podemos conversar?',
  bolos: 'Olá, Clauciana! 🎂 Vi seus bolos no site e gostaria de saber sobre encomendas, sabores e valores.',
  doces: 'Olá, Clauciana! 🍬 Vi seus doces finos no site e gostaria de saber as opções e valores para uma encomenda.',
  pascoa: 'Olá, Clauciana! 🐰 Vi suas criações de Páscoa no site. Quais opções e disponibilidades você tem?',
  galeria: 'Olá, Clauciana! 💗 Adorei as fotos do seu trabalho no site e gostaria de encomendar algo parecido. Podemos conversar?',
  presente: 'Olá, Clauciana! 🎁 Vi seus doces no site e queria saber as opções para presentear alguém especial.'
};
const whatsUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
function linkWhatsApps(root = document) {
  root.querySelectorAll('.whatsapp-link').forEach(link => {
    link.href = whatsUrl(messages[link.dataset.message] || messages.geral);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}
linkWhatsApps();

// Todas as fotos são verdadeiras e vieram do material enviado para o site.
const photos = [
  { file: 'bolo-morango.webp', title: 'Bolo de chocolate com morangos', type: 'bolos', alt: 'Bolo artesanal de brigadeiro com morangos frescos' },
  { file: 'doces-flor.webp', title: 'Docinhos em flor', type: 'doces', alt: 'Doces finos em forma de flor, com detalhe de chocolate' },
  { file: 'docinhos-dourados.webp', title: 'Um presente delicado', type: 'doces', alt: 'Caixa repleta de docinhos dourados artesanais' },
  { file: 'bolo-artesanal.webp', title: 'Bolo feito com carinho', type: 'bolos', alt: 'Bolo artesanal recheado decorado com brigadeiros' },
  { file: 'mesa-casamento.webp', title: 'Uma mesa para celebrar', type: 'festas', alt: 'Mesa de doces finos com arranjo de flores' },
  { file: 'brigadeiros.webp', title: 'Brigadeiros especiais', type: 'doces', alt: 'Brigadeiros com granulado em forminhas verdes' },
  { file: 'bolo-rosa.webp', title: 'Delicadeza em rosa', type: 'bolos', alt: 'Bolo rosa decorado para uma celebração' },
  { file: 'ovo-ferrero.webp', title: 'Páscoa caprichada', type: 'pascoa', alt: 'Ovo de Páscoa de colher com chocolate e bombons' },
  { file: 'doces-lacinhos.webp', title: 'Laços e sabores', type: 'doces', alt: 'Docinhos finos brancos e verdes alinhados com lacinhos' },
  { file: 'bolo-chocolate.webp', title: 'Muito chocolate', type: 'bolos', alt: 'Bolo de chocolate decorado com cobertura artesanal' },
  { file: 'ovo-dois-brigadeiros.webp', title: 'Um carinho de Páscoa', type: 'pascoa', alt: 'Ovo de Páscoa com dois brigadeiros e raspas de chocolate' },
  { file: 'mesa-festa.webp', title: 'Momentos inesquecíveis', type: 'festas', alt: 'Mesa de aniversário com bolo e doces decorados em rosa' },
  { file: 'doces-conchinhas.webp', title: 'Pequenas preciosidades', type: 'doces', alt: 'Doces finos delicados em formato de concha' },
  { file: 'bolo-classico.webp', title: 'Um clássico delicado', type: 'bolos', alt: 'Bolo branco com decoração e morangos' },
  { file: 'ovo-trufado.webp', title: 'Chocolate em cada detalhe', type: 'pascoa', alt: 'Ovo de chocolate trufado artesanal' },
  { file: 'doces-bandeja.webp', title: 'Feitos um a um', type: 'doces', alt: 'Doces finos variados em uma bandeja' },
  { file: 'bolo-festa.webp', title: 'Para adoçar a festa', type: 'bolos', alt: 'Bolo de chocolate com brigadeiros e confeitos coloridos' },
  { file: 'pascua-infantil.webp', title: 'Páscoa divertida', type: 'pascoa', alt: 'Caixa de chocolates de Páscoa com desenhos divertidos' },
  { file: 'doces-verdes.webp', title: 'Delicadeza artesanal', type: 'doces', alt: 'Doces em forminhas verdes feitos à mão' },
  { file: 'ovo-chocolate.webp', title: 'Colheradas de felicidade', type: 'pascoa', alt: 'Ovo recheado com pedacinhos de chocolate' },
  { file: 'mesa-casamento.webp', title: 'Celebração especial', type: 'festas', alt: 'Mesa de doces finos preparada para evento' },
  { file: 'bolo-floral.webp', title: 'Flores e afeto', type: 'bolos', alt: 'Bolo de aniversário decorado com flores em tons rosados' },
  { file: 'ovo-especial.webp', title: 'Um presente cheio de sabor', type: 'pascoa', alt: 'Ovo de Páscoa de colher com chocolate' },
  { file: 'bombons-presente.webp', title: 'Caixinhas de felicidade', type: 'doces', alt: 'Bombons finos em pequenas caixinhas brancas' }
];
const categoryNames = {bolos: 'Bolos artesanais', doces: 'Doces finos', pascoa: 'Especial de Páscoa', festas: 'Celebrações'};
const grid = document.getElementById('gallery-grid');
const filterButtons = [...document.querySelectorAll('.filter-btn')];
let activeFilter = 'todos';
let visiblePhotos = [];
let openedIndex = 0;
const imagePath = (item) => `assets/${item.file}`;

function renderGallery(filter = 'todos') {
  activeFilter = filter;
  visiblePhotos = filter === 'todos' ? photos.slice(0, 12) : photos.filter(p => p.type === filter);
  filterButtons.forEach(button => {
    const current = button.dataset.filter === filter;
    button.classList.toggle('active', current);
    button.setAttribute('aria-pressed', String(current));
  });
  grid.innerHTML = visiblePhotos.map((photo, index) => `
    <button class="gallery-item" type="button" data-photo-index="${index}" aria-label="Ampliar foto: ${photo.title}">
      <img src="${imagePath(photo)}" alt="${photo.alt}" loading="lazy" decoding="async" />
      <span class="gallery-overlay"><span><small>${categoryNames[photo.type]}</small><strong>${photo.title}</strong></span><span class="gallery-expand" aria-hidden="true">↗</span></span>
    </button>`).join('');
}
filterButtons.forEach(b => b.addEventListener('click', () => renderGallery(b.dataset.filter)));
renderGallery();

// Lightbox acessível com Escape e setas do teclado.
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightboxButton = lightbox.querySelector('.lightbox-close');
let lastFocusedElement = null;
function showPhoto(index) {
  openedIndex = (index + visiblePhotos.length) % visiblePhotos.length;
  const photo = visiblePhotos[openedIndex];
  lightboxImg.src = imagePath(photo);
  lightboxImg.alt = photo.alt;
  lightboxCaption.textContent = photo.title;
  // A mensagem também leva o nome da foto que o visitante escolheu.
  document.getElementById('lightbox-order').href = whatsUrl(`Olá, Clauciana! 💗 Vi a foto “${photo.title}” no seu site e gostaria de saber sobre uma encomenda parecida.`);
}
function openLightbox(index) {
  lastFocusedElement = document.activeElement;
  showPhoto(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  closeLightboxButton.focus();
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
  lightboxImg.src='';
  if (lastFocusedElement && document.contains(lastFocusedElement)) lastFocusedElement.focus();
}
grid.addEventListener('click', e => {
  const item = e.target.closest('.gallery-item');
  if (item) openLightbox(Number(item.dataset.photoIndex));
});
closeLightboxButton.addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(openedIndex-1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(openedIndex+1));
lightbox.addEventListener('click', e => {if (e.target === lightbox) closeLightbox();});
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPhoto(openedIndex-1);
  if (e.key === 'ArrowRight') showPhoto(openedIndex+1);
  if (e.key === 'Tab') {
    const focusable = [...lightbox.querySelectorAll('button,a')].filter(el => el.offsetParent !== null);
    if (!focusable.length) return;
    if (e.shiftKey && document.activeElement === focusable[0]) {e.preventDefault(); focusable.at(-1).focus();}
    else if (!e.shiftKey && document.activeElement === focusable.at(-1)) {e.preventDefault(); focusable[0].focus();}
  }
});

// Menu móvel.
const toggle = document.querySelector('.menu-toggle');
const mainNav = document.getElementById('main-nav');
function closeMenu() {toggle.setAttribute('aria-expanded','false'); mainNav.classList.remove('open');}
toggle.addEventListener('click', () => {
  const opening = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded',String(opening));
  mainNav.classList.toggle('open',opening);
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('click', e => {if (!e.target.closest('.nav-inner')) closeMenu();});

// Revelar seções apenas quando aparecem, sem bloquear conteúdo sem JS.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {if (entry.isIntersecting) {entry.target.classList.add('visible'); revealObserver.unobserve(entry.target);}});
  }, {threshold:.08,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
} else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

// Foto em movimento com perspectiva 3D, sem bibliotecas pesadas.
const heroArt = document.getElementById('hero-art');
if (heroArt && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
  let updateHandle=0;
  heroArt.addEventListener('pointermove',e=>{
    const rect=heroArt.getBoundingClientRect();
    const nx=((e.clientX-rect.left)/rect.width-.5)*2;
    const ny=((e.clientY-rect.top)/rect.height-.5)*2;
    cancelAnimationFrame(updateHandle);
    updateHandle=requestAnimationFrame(()=>{
      heroArt.style.setProperty('--mouse-x',`${nx*12}deg`);
      heroArt.style.setProperty('--mouse-y',`${-ny*10}deg`);
      heroArt.style.setProperty('--drift-x',`${nx*14}px`);
      heroArt.style.setProperty('--drift-y',`${ny*14}px`);
    });
  });
  heroArt.addEventListener('pointerleave',()=>{
    heroArt.style.setProperty('--mouse-x','0deg'); heroArt.style.setProperty('--mouse-y','0deg');
    heroArt.style.setProperty('--drift-x','0px'); heroArt.style.setProperty('--drift-y','0px');
  });
  document.querySelectorAll('.contact-card.tilt-card').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();const x=((e.clientX-r.left)/r.width-.5)*10;
      const y=((e.clientY-r.top)/r.height-.5)*-10;
      card.style.transform=`rotateY(${x}deg) rotateX(${y}deg)`;
    });
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
}

const header = document.querySelector('.site-header');
let scrollScheduled = false;
function syncScroll() {header.classList.toggle('scrolled',window.scrollY>40);scrollScheduled=false;}
window.addEventListener('scroll',()=>{if (!scrollScheduled){scrollScheduled=true;requestAnimationFrame(syncScroll);}}, {passive:true});
syncScroll();
document.getElementById('current-year').textContent = new Date().getFullYear();
window.addEventListener('load',()=>document.querySelector('.site-loader')?.classList.add('loaded'));
// Evita uma tela branca se a fonte externa demorar a responder.
setTimeout(()=>document.querySelector('.site-loader')?.classList.add('loaded'),900);
