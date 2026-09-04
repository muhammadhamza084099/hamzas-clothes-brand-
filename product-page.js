const slug = new URLSearchParams(location.search).get('slug') || location.pathname.split('/').filter(Boolean).pop();
const product = window.HAMZAS_PRODUCTS.find(item => item.slug === slug);
const root = document.querySelector('[data-product-page]');
const money = value => `Rs. ${value.toLocaleString('en-PK')}`;
if (!product) {
  root.innerHTML = '<div class="content-page"><p class="eyebrow">Not found</p><h1>This piece is <em>unavailable.</em></h1><a class="button button-dark" href="/">Back to the collection <span>↗</span></a></div>';
  document.title = 'Product not found | Hamzas Brand Shop';
} else {
  document.title = `${product.name} | HAMZAS`;
  document.querySelector('meta[name="description"]').content = `${product.name} in ${product.color}, from Hamzas Brand Shop in Peshawar.`;
  root.innerHTML = `<div class="product-detail-page"><div class="product-detail-image"><img src="${product.image}" alt="${product.audience}'s ${product.name}, ${product.color}"></div><div class="product-detail-copy"><p class="eyebrow">${product.audience} / ${product.category}</p><h1>${product.name}</h1><strong class="detail-price">${money(product.price)}</strong><p class="detail-description">A considered ${product.category.toLowerCase()} piece in ${product.color.toLowerCase()}, presented from the current Hamzas collection.</p><label class="option-label" for="product-size">Size</label><select id="product-size" class="detail-select"><option>S</option><option>M</option><option>L</option><option>XL</option></select><button class="button button-dark" data-add-detail>Add to bag <span>+</span></button><a class="text-link" href="/">← Continue shopping</a></div></div>`;
  document.querySelector('[data-add-detail]').addEventListener('click', () => {const cart=JSON.parse(localStorage.getItem('hamzas-cart')||'[]');if(!cart.includes(product.id))cart.push(product.id);localStorage.setItem('hamzas-cart',JSON.stringify(cart));location.href='/#shop';});
}
