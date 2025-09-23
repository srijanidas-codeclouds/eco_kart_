// /js/cart.js
(() => {
  // ====== Config ======
  const CART_KEY = 'cart';
  const CART_CONFIG = {
    shipping: {
      flatRate: 10, // $10 shipping
      freeThreshold: 100 // free if subtotal >= $100
    },
    taxRate: 0.08, // 8% tax
    coupons: {
      ECO10: { type: 'percent', value: 10 }, // 10% off subtotal
      FREESHIP: { type: 'shipping', value: 0 }, // free shipping
      SAVE20: { type: 'fixed', value: 20 } // $20 off subtotal
    }
  };


  let appliedCoupon = null; // store applied coupon code

  // ====== Helpers ======
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Safely find navbar cart button (tries id then href-based fallback)
  const navbarCartBtn =
    document.getElementById('cart-btn') ||
    document.querySelector('a[href*="cart"]') ||
    document.querySelector('.cart-btn') || null;

  // page containers (may be absent on product listing page)
  const cartContainer = document.getElementById('cart-container'); // cart page element where items render
  const cartSidebar = document.getElementById('cart-sidebar'); // optional sidebar
  const suggestedProducts = document.getElementById('suggested-products'); // optional suggestions

  // ====== State ======
  let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

  // ====== Parsers (robust for current HTML) ======
  function parsePriceFromCard(card) {
    // look for first text that includes a dollar sign
    const priceRx = /\$\s*([\d,]+(?:\.\d+)?)/;
    if (!card) return 0;
    const candidates = qsa('p,span,div', card);
    for (const el of candidates) {
      const txt = (el.innerText || '').trim();
      const m = txt.match(priceRx);
      if (m) return parseFloat(m[1].replace(/,/g, ''));
    }
    // fallback to data attribute if present
    if (card.dataset && card.dataset.price) return parseFloat(card.dataset.price);
    return 0;
  }

  function parseNameFromCard(card) {
    return (qs('h1, h2, h3, .title', card)?.innerText || '').trim();
  }

  function parseImageFromCard(card) {
    return qs('img', card)?.src || '';
  }

  function parseCategoryFromCard(card) {
    // prefer explicit .category, else first p that doesn't contain currency
    const cat = qs('.category', card);
    if (cat) return cat.innerText.trim();
    const priceRx = /\$\s*([\d,]+(?:\.\d+)?)/;
    const ps = qsa('p,span', card).map(x => x.innerText.trim()).filter(Boolean);
    for (const txt of ps) {
      if (!priceRx.test(txt) && /[A-Za-z]/.test(txt)) return txt;
    }
    return 'General';
  }

  function generateIdFromName(name) {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }

  // ====== Storage + state helpers ======
  function persistCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function getTotalItems() {
    return cart.reduce((s, it) => s + (it.quantity || 0), 0);
  }

  // ====== Badge UI ======
  function updateCartBadge() {
    if (!navbarCartBtn) return;
    let badge = document.getElementById('cart-badge');
    const total = getTotalItems();

    if (!badge) {
      badge = document.createElement('span');
      badge.id = 'cart-badge';
      // tailwind-friendly classes (adjust as you'd like)
      badge.className = 'absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 flex items-center justify-center';
      // ensure parent has position context
      if (!/relative/.test(getComputedStyle(navbarCartBtn).position)) {
        navbarCartBtn.classList.add('relative');
      }
      navbarCartBtn.appendChild(badge);
    }

    badge.textContent = total > 0 ? String(total) : '0';
    badge.style.display = total > 0 ? 'flex' : 'none';
  }

  // ====== Cart logic ======
  function addToCart(product) {
    const id = product.id || generateIdFromName(product.name || 'item');
    const existing = cart.find(it => it.id === id || it.name === product.name);
    if (existing) {
      // increment but cap at quantityAvailable if provided
      const cap = existing.quantityAvailable ?? product.quantityAvailable ?? 10;
      if ((existing.quantity ?? 0) < cap) {
        existing.quantity = (existing.quantity ?? 0) + 1;
      } // else ignore
    } else {
      cart.push({
        id,
        name: product.name || 'Product',
        price: product.price || 0,
        image: product.image || '',
        category: product.category || 'General',
        quantity: product.quantity || 1,
        quantityAvailable: product.quantityAvailable?.quantity || 9999
      });
    }
    persistCart();
    updateCartBadge();
    // if we are on cart page, re-render
    if (cartContainer) renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter(it => it.id !== id);
    persistCart();
    updateCartBadge();
    if (cartContainer) renderCart();
  }

  function updateQty(id, qty) {
    const item = cart.find(it => it.id === id);
    if (!item) return;
    item.quantity = qty <= 0 ? 1 : qty;
    persistCart();
    updateCartBadge();
    if (cartContainer) renderCart();
  }

  // ====== Cart rendering (cart page) ======
  function renderCart() {
    if (!cartContainer) return;
    cartContainer.innerHTML = '';
    if (!cart || cart.length === 0) {
      cartContainer.innerHTML = '<p class="text-center text-gray-500">Your cart is empty.</p>';
      if (cartSidebar) cartSidebar.style.display = 'none';
      if (suggestedProducts) suggestedProducts.classList.remove('hidden');
      updateCartTotals(0);
      return;
    }

    if (cartSidebar) cartSidebar.style.display = 'block';
    if (suggestedProducts) suggestedProducts.classList.add('hidden');

    let subtotal = 0;
    cart.forEach(item => {
      subtotal += (item.price || 0) * (item.quantity || 0);

      const wrap = document.createElement('div');
      wrap.className = 'flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-4';

      wrap.innerHTML = `
        <div class="flex items-center space-x-4">
          <img src="${item.image}" alt="${(item.name||'')}" class="w-20 h-20 object-cover border border-gray-200 rounded-md" />
          <div class="flex flex-col">
            <h3 class="text-lg font-semibold text-[#111518]">${item.name}</h3>
            <p class="text-sm text-gray-500">${item.category}</p>
            <p class="text-sm text-green-600 mt-1">$${(item.price || 0).toFixed(2)} each</p>
            <p class="text-xs text-gray-400">Stock: ${item.quantityAvailable}</p>
            <div class="flex items-center space-x-2 mt-2">
              <button class="decrease w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md text-lg font-bold">-</button>
              <span class="quantity min-w-[28px] text-center">${item.quantity}</span>
              <button class="increase w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md text-lg font-bold">+</button>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end space-y-2">
          <p class="text-lg font-semibold text-[#111518]">$${((item.price||0) * (item.quantity||0)).toFixed(2)}</p>
          <button class="remove flex items-center text-red-500 hover:text-red-700 text-sm">
            <i class="fa-solid fa-trash mr-1"></i> Remove
          </button>
        </div>
      `;

      // hooks
      wrap.querySelector('.increase').addEventListener('click', () => {
        const cap = item.quantityAvailable ?? 9999;
        if ((item.quantity || 0) < cap) {
          updateQty(item.id, (item.quantity || 0) + 1);
        } else {
          alert('No more stock available!');
        }
      });

      wrap.querySelector('.decrease').addEventListener('click', () => {
        if ((item.quantity || 0) > 1) {
          updateQty(item.id, (item.quantity || 0) - 1);
        } else if (confirm('Remove this item from cart?')) {
          removeFromCart(item.id);
        }
      });

      wrap.querySelector('.remove').addEventListener('click', () => {
        if (confirm('Remove this item from cart?')) removeFromCart(item.id);
      });

      cartContainer.appendChild(wrap);
    });

    updateCartTotals(subtotal);
  }

  function updateCartTotals(subtotal) {
    const subtotalEl = document.getElementById('cart-subtotal');
    const discountEl = document.getElementById('cart-discount');
    const shippingEl = document.getElementById('cart-shipping');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');


    let discount = 0;
    let shipping = CART_CONFIG.shipping.flatRate;


    // apply free shipping threshold
    if (subtotal >= CART_CONFIG.shipping.freeThreshold) {
    shipping = 0;
    }


    // apply coupon
    if (appliedCoupon && CART_CONFIG.coupons[appliedCoupon]) {
    const c = CART_CONFIG.coupons[appliedCoupon];
    if (c.type === 'percent') discount = subtotal * (c.value / 100);
    if (c.type === 'fixed') discount = c.value;
    if (c.type === 'shipping') shipping = 0;
  }


if (discount > subtotal) discount = subtotal; // cap discount


const taxedAmount = (subtotal - discount);
const tax = taxedAmount * CART_CONFIG.taxRate;
const total = taxedAmount + shipping + tax;


if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
if (discountEl) discountEl.textContent = `-$${discount.toFixed(2)}`;
if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)}`;
if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  }

  // ====== Attach add-to-cart handlers on product cards ======
  function setupAddToCartButtons() {
    // gather candidates: buttons or anchors that look like "Add to cart"
    const candidates = Array.from(document.querySelectorAll('button, a'));
    const addBtns = candidates.filter(el => {
      const t = (el.textContent || '').trim().toLowerCase();
      return el.classList.contains('add-to-cart') || t === 'add to cart' || t === 'add to cart ';
    });

    addBtns.forEach(btn => {
      // avoid double-binding
      if (btn.dataset.cartBound === '1') return;
      btn.dataset.cartBound = '1';

      btn.addEventListener('click', (e) => {
        e.preventDefault();

        // find product card root
        // prefer a close container that looks like your product card markup
        const card =
          btn.closest('.product-card') ||
          btn.closest('.border.rounded.overflow-hidden') ||
          btn.closest('div');

        if (!card) return;

        const name = parseNameFromCard(card) || 'Product';
        const price = parsePriceFromCard(card) || 0;
        const image = parseImageFromCard(card) || '';
        const category = parseCategoryFromCard(card) || 'General';
        const product = {
          id: card.dataset.productId || generateIdFromName(name),
          name,
          price,
          image,
          category,
          quantity: 1,
          quantityAvailable: parseInt(card.dataset.stock || card.dataset.quantityAvailable || 9999, 10) || 9999
        };

        addToCart(product);
        // lightweight feedback
        try {
          // small animation or UI toast could go here; simple alert:
          // alert(`${product.name} added to cart`);
          // but we avoid alert spam: flash badge

          const badge = document.getElementById('cart-badge');
          if (badge) {
            badge.classList.add('animate-pulse');
            setTimeout(() => badge.classList.remove('animate-pulse'), 350);
          }
        } catch (err) {}
      });
    });
  }

  // ====== Init on DOMContentLoaded ======
  document.addEventListener('DOMContentLoaded', () => {
    // ensure cart is fresh from storage
    cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    setupAddToCartButtons();
    renderCart();
    updateCartBadge();
  });

  // Coupon apply logic
  const couponBox = document.querySelector('#coupon input');
const couponApplyBtn = document.getElementById('apply-coupon');
const couponRemoveBtn = document.getElementById('remove-coupon');

if (couponApplyBtn) {
  couponApplyBtn.addEventListener('click', () => {
    const code = (couponBox?.value || '').trim().toUpperCase();
    if (CART_CONFIG.coupons[code]) {
      appliedCoupon = code;
      alert(`Coupon ${code} applied!`);
      couponApplyBtn.classList.add('hidden');
      couponRemoveBtn.classList.remove('hidden');
      renderCart();
    } else {
      alert('Invalid coupon code');
    }
  });
}

if (couponRemoveBtn) {
  couponRemoveBtn.addEventListener('click', () => {
    appliedCoupon = null;
    couponBox.value = '';
    alert('Coupon removed');
    couponRemoveBtn.classList.add('hidden');
    couponApplyBtn.classList.remove('hidden');
    renderCart();
  });
}


  // expose small API for debugging (optional)
  window.__ecokart = {
    getCart: () => JSON.parse(localStorage.getItem(CART_KEY) || '[]'),
    clearCart: () => {
      cart = [];
      persistCart();
      renderCart();
      updateCartBadge();
    }
  };
})();
