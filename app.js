const products = [
  {id:1,name:'Oxford Linen Shirt',audience:'Men',category:'Shirts',price:5800,color:'Stone',image:'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80',new:true},
  {id:2,name:'Everyday Pleat Trouser',audience:'Men',category:'Bottoms',price:6900,color:'Charcoal',image:'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80'},
  {id:3,name:'Relaxed Utility Short',audience:'Men',category:'Bottoms',price:3900,color:'Washed black',image:'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=700&q=80'},
  {id:4,name:'Heavyweight Polo',audience:'Men',category:'Tops',price:4200,color:'Forest green',image:'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=700&q=80',new:true},
  {id:5,name:'The Essential Tee',audience:'Women',category:'Tops',price:2400,color:'Off-white',image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80'},
  {id:6,name:'Satin Slip Dress',audience:'Women',category:'Dresses',price:7600,color:'Terracotta',image:'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=80',new:true},
  {id:7,name:'Wide Leg Trouser',audience:'Women',category:'Bottoms',price:6400,color:'Ecru',image:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=80'},
  {id:8,name:'Canvas Carryall',audience:'Women',category:'Accessories',price:3200,color:'Natural',image:'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=700&q=80'},
  {id:9,name:'Mini Studio Hoodie',audience:'Children',category:'Tops',price:3200,color:'Oat',image:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80',new:true},
  {id:10,name:'Everyday Kids Jogger',audience:'Children',category:'Bottoms',price:2800,color:'Heather grey',image:'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=700&q=80'},
  {id:11,name:'The Daily Kids Cap',audience:'Children',category:'Accessories',price:1800,color:'Black',image:'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=700&q=80'},
  {id:12,name:'Playday Overshirt',audience:'Children',category:'Shirts',price:3600,color:'Olive',image:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=80'},
  {id:13,name:'Everyday Cotton Shirt',audience:'Men',category:'Shirts',price:4600,color:'White',image:'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=700&q=80'},
  {id:14,name:'Relaxed Poplin Blouse',audience:'Women',category:'Shirts',price:5200,color:'Sky blue',image:'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=700&q=80',new:true},
  {id:15,name:'Kids Camp Shirt',audience:'Children',category:'Shirts',price:2900,color:'Sage',image:'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=700&q=80'},
  {id:16,name:'Striped Resort Shirt',audience:'Men',category:'Shirts',price:5400,color:'Navy stripe',image:'https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&w=700&q=80',new:true}
];
let cart = JSON.parse(localStorage.getItem('hamzas-cart') || '[]');
let selectedCategory = 'All';
const grid = document.querySelector('[data-product-grid]');
const money = value => `Rs. ${value.toLocaleString('en-PK')}`;
function renderProducts(){
  const query = document.querySelector('[data-search-input]').value.toLowerCase();
  const sort = document.querySelector('[data-sort]').value;
  let visible = products.filter(product => (selectedCategory === 'All' || product.audience === selectedCategory || product.category === selectedCategory || (selectedCategory === 'New in' && product.new)) && `${product.name} ${product.color}`.toLowerCase().includes(query));
  if(sort === 'low') visible.sort((a,b)=>a.price-b.price);
  if(sort === 'high') visible.sort((a,b)=>b.price-a.price);
  document.querySelector('[data-no-results]').hidden = visible.length > 0;
  grid.innerHTML = visible.map(product => `<article class="product-card" data-product="${product.id}"><div class="product-image"><img src="${product.image}" alt="${product.audience}'s ${product.name}, ${product.color}" loading="lazy">${product.new ? '<span class="product-badge">New in</span>' : ''}<button class="quick-add" data-add="${product.id}">Add to bag +</button></div><div class="product-info"><div><p class="product-name">${product.name}</p><p class="product-meta">${product.audience} / ${product.color}</p></div><p class="product-price">${money(product.price)}</p></div></article>`).join('');
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
  if(productCard && !event.target.closest('[data-add]')) openProduct(Number(productCard.dataset.product));
  const category = event.target.closest('[data-category]');
  if(category){selectedCategory=category.dataset.category;document.querySelectorAll('[data-category]').forEach(tab=>tab.classList.toggle('active',tab===category));renderProducts()}
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
});
document.querySelector('[data-checkout-form]').addEventListener('submit', async event => {event.preventDefault();const form=event.target;const submit=form.querySelector('[type="submit"]');submit.disabled=true;submit.querySelector('span').textContent='…';const payload={name:form.name.value,phone:form.phone.value,address:form.address.value,payment:form.payment.value,items:cart.map(id=>({id}))};try{const response=location.protocol==='file:'?null:await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(response && !response.ok)throw new Error((await response.json()).error||'Order failed');const order=response?await response.json():{reference:`DEMO-${Date.now().toString().slice(-6)}`};document.querySelector('[data-order-reference]').textContent=order.reference;cart=[];renderCart();closeModals();openModal('[data-confirmation-modal]');form.reset()}catch(error){showToast(error.message)}finally{submit.disabled=false;submit.querySelector('span').textContent='↗'}});
document.querySelector('[data-search-input]').addEventListener('input',renderProducts);
document.querySelector('[data-sort]').addEventListener('change',renderProducts);
renderProducts();
renderCart();