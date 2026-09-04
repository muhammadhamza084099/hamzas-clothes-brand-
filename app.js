const products = window.HAMZAS_PRODUCTS;
let cart = JSON.parse(localStorage.getItem('hamzas-cart') || '[]');
let selectedCategory = 'All';
const grid = document.querySelector('[data-product-grid]');
const money = value => `Rs. ${value.toLocaleString('en-PK')}`;
const heroSlides = [
  {eyebrow:'The everyday edit / 2026',title:'Wear your<br><em>point of view.</em>',lede:'Thoughtful layers, easy silhouettes and the small details that make a look yours.',caption:'New season silhouettes',image:'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&fm=webp&q=85',alt:'Man wearing a relaxed neutral fashion look'},
  {eyebrow:'Built for the everyday',title:'Good clothes<br><em>go places.</em>',lede:'Relaxed tailoring, considered fabric and a little more room to move through the day.',caption:'Easy structure / soft confidence',image:'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&fm=webp&q=85',alt:'Man wearing a relaxed linen shirt'},
  {eyebrow:'The new uniform',title:'Make room<br><em>for more.</em>',lede:'Versatile layers designed to work hard, wear well and keep your point of view intact.',caption:'The layers edit',image:'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&fm=webp&q=85',alt:'Man wearing a forest green polo shirt'},
  {eyebrow:'Hamzas / Made locally',title:'Find your<br><em>everyday.</em>',lede:'Pieces with an honest feel, made for real routines and the life that happens between plans.',caption:'Made for movement',image:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&fm=webp&q=85',alt:'Relaxed fashion layers in olive'}
];
let heroIndex = 0;
function applyTheme(theme){document.documentElement.dataset.theme=theme;localStorage.setItem('hamzas-theme',theme);const dark=theme==='dark';document.querySelector('[data-theme-toggle]').setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');document.querySelector('[data-theme-icon]').textContent=dark?'☼':'◐'}
function renderHero(){const slide=heroSlides[heroIndex];document.querySelector('[data-hero-eyebrow]').textContent=slide.eyebrow;document.querySelector('[data-hero-title]').innerHTML=slide.title;document.querySelector('[data-hero-lede]').textContent=slide.lede;const image=document.querySelector('[data-hero-image]');image.classList.add('is-changing');setTimeout(()=>{image.src=slide.image;image.alt=slide.alt;image.classList.remove('is-changing')},180);document.querySelector('[data-hero-count]').textContent=`${String(heroIndex+1).padStart(2,'0')} / ${String(heroSlides.length).padStart(2,'0')}`;document.querySelector('[data-hero-caption]').textContent=slide.caption;document.querySelector('[data-hero-dots]').innerHTML=heroSlides.map((_,index)=>`<button class="hero-dot${index===heroIndex?' active':''}" data-hero-slide="${index}" aria-label="Show hero slide ${index+1}"></button>`).join('')}
function changeHero(direction){heroIndex=(heroIndex+direction+heroSlides.length)%heroSlides.length;renderHero()}
function renderProducts(){
  const query = document.querySelector('[data-search-input]').value.toLowerCase();
  const sort = document.querySelector('[data-sort]').value;
  let visible = products.filter(product => (selectedCategory === 'All' || product.audience === selectedCategory || product.category === selectedCategory || (selectedCategory === 'New in' && product.new)) && `${product.name} ${product.color}`.toLowerCase().includes(query));
  if(sort === 'low') visible.sort((a,b)=>a.price-b.price);
  if(sort === 'high') visible.sort((a,b)=>b.price-a.price);
  document.querySelector('[data-no-results]').hidden = visible.length > 0;
  grid.innerHTML = visible.map(product => `<article class="product-card" data-product="${product.id}"><div class="product-image"><img src="${product.image}" alt="${product.audience}'s ${product.name}, ${product.color}" loading="lazy">${product.new ? '<span class="product-badge">New in</span>' : ''}<button class="quick-add" data-add="${product.id}">Add to bag +</button></div><div class="product-info"><div><p class="product-name">${product.name}</p><p class="product-meta">${product.audience} / ${product.color}</p><a class="product-detail-link" href="/products/${product.slug}">View details</a></div><p class="product-price">${money(product.price)}</p></div></article>`).join('');
}
function renderCart(){
  const items = cart.map(id => products.find(product => product.id === id)).filter(Boolean);
  document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = items.length);
  document.querySelector('[data-cart-items]').innerHTML = items.map(item => `<div class="cart-item"><img src="${item.image}" alt="${item.name}"><div><h3>${item.name}</h3><p>${item.color}</p><p>${money(item.price)}</p></div><button class="remove-item" data-remove="${item.id}" aria-label="Remove ${item.name}">×</button></div>`).join('');
  document.querySelector('[data-cart-empty]').style.display = items.length ? 'none' : 'block';
  document.querySelector('[data-cart-footer]').style.display = items.length ? 'block' : 'none';
  document.querySelector('[data-cart-total]').textContent = money(items.reduce((sum,item)=>sum+item.price,0));
  localStorage.setItem('hamzas-cart', JSON.stringify(cart));
}
function toggleCart(){const drawer=document.querySelector('[data-cart-drawer]');drawer.classList.toggle('open');drawer.setAttribute('aria-hidden',!drawer.classList.contains('open'));document.querySelector('[data-overlay]').classList.toggle('show',drawer.classList.contains('open'));}
function showToast(message){const toast=document.querySelector('[data-toast]');toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)}
function openModal(selector){const modal=document.querySelector(selector);modal.classList.add('open');modal.setAttribute('aria-hidden','false')}
function closeModals(){document.querySelectorAll('.modal-shell.open').forEach(modal=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')})}
function openProduct(id){const product=products.find(item=>item.id===id);if(!product)return;document.querySelector('[data-modal-image]').src=product.image;document.querySelector('[data-modal-image]').alt=product.name;document.querySelector('[data-modal-category]').textContent=`${product.category} / ${product.color}`;document.querySelector('[data-modal-name]').textContent=product.name;document.querySelector('[data-modal-price]').textContent=money(product.price);document.querySelector('[data-modal-add]').dataset.add=product.id;openModal('[data-product-modal]')}
function openCheckout(){if(!cart.length){showToast('Add a piece before checking out');return}const items=cart.map(id=>products.find(product=>product.id===id)).filter(Boolean);document.querySelector('[data-checkout-items]').innerHTML=items.map(item=>`<div class="summary-row"><span>${item.name}</span><strong>${money(item.price)}</strong></div>`).join('');document.querySelector('[data-checkout-total]').textContent=money(items.reduce((sum,item)=>sum+item.price,0));openModal('[data-checkout-modal]')}
document.addEventListener('click', event => {
  const productCard = event.target.closest('[data-product]');
  if(productCard && !event.target.closest('[data-add]') && !event.target.closest('.product-detail-link')) openProduct(Number(productCard.dataset.product));
  const category = event.target.closest('[data-category]');
  if(category){selectedCategory=category.dataset.category;document.querySelectorAll('[data-category]').forEach(tab=>tab.classList.toggle('active',tab===category));renderProducts()}
  const categoryLink = event.target.closest('[data-category-link]');
  if(categoryLink){selectedCategory=categoryLink.dataset.category;document.querySelectorAll('[data-category]').forEach(tab=>tab.classList.toggle('active',tab.dataset.category===selectedCategory));renderProducts()}
  const add = event.target.closest('[data-add]');
  if(add){const id=Number(add.dataset.add);if(!cart.includes(id)){cart.push(id);renderCart();showToast('Added to your bag')}else showToast('Already in your bag')}
  const remove = event.target.closest('[data-remove]');
  if(remove){cart=cart.filter(id=>id!==Number(remove.dataset.remove));renderCart()}
  if(event.target.closest('[data-cart-toggle]')) toggleCart();
  if(event.target.matches('[data-overlay]')) toggleCart();
  if(event.target.closest('[data-menu-toggle]')) document.querySelector('[data-mobile-menu]').classList.toggle('open');
  if(event.target.closest('[data-search-toggle]')){const panel=document.querySelector('[data-search-panel]');panel.classList.toggle('open');if(panel.classList.contains('open'))document.querySelector('[data-search-input]').focus()}
  if(event.target.closest('[data-checkout]')){toggleCart();openCheckout()}
  if(event.target.closest('[data-close-modal]')) closeModals();
  const modalAdd = event.target.closest('[data-modal-add]');
  if(modalAdd){const id=Number(modalAdd.dataset.add);if(!cart.includes(id)){cart.push(id);renderCart();showToast('Added to your bag')}else showToast('Already in your bag');closeModals()}
  const size = event.target.closest('[data-size-options] button');
  if(size){document.querySelectorAll('[data-size-options] button').forEach(button=>button.classList.toggle('selected',button===size))}
  if(event.target.closest('[data-hero-prev]')) changeHero(-1);
  if(event.target.closest('[data-hero-next]')) changeHero(1);
  const heroSlide = event.target.closest('[data-hero-slide]');
  if(heroSlide){heroIndex=Number(heroSlide.dataset.heroSlide);renderHero()}
  if(event.target.closest('[data-theme-toggle]')) applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');
});
document.querySelector('[data-checkout-form]').addEventListener('submit', async event => {event.preventDefault();const form=event.target;const submit=form.querySelector('[type="submit"]');submit.disabled=true;submit.querySelector('span').textContent='…';const payload={name:form.name.value,phone:form.phone.value,email:form.email.value,city:form.city.value,address:form.address.value,payment:form.payment.value,idempotencyKey:crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random()}`,items:cart.map(id=>({id,quantity:1}))};try{const response=location.protocol==='file:'?null:await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(response && !response.ok)throw new Error((await response.json()).error||'Order failed');const order=response?await response.json():{reference:`DEMO-${Date.now().toString().slice(-6)}`};document.querySelector('[data-order-reference]').textContent=order.reference;cart=[];renderCart();closeModals();openModal('[data-confirmation-modal]');form.reset()}catch(error){showToast(error.message)}finally{submit.disabled=false;submit.querySelector('span').textContent='↗'}});
document.querySelector('[data-search-input]').addEventListener('input',renderProducts);
document.querySelector('[data-sort]').addEventListener('change',renderProducts);
renderProducts();
renderCart();
renderHero();
applyTheme(localStorage.getItem('hamzas-theme') || 'light');
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(()=>changeHero(1),5000);