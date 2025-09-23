// ====== Data ======
const allProducts = [
  // Clothing
  { id: 21, name: "Organic Cotton Socks", category: "Clothing", price: 12, image: "assets/products/socks.png", rating: 5, quantityAvailable: 100, material: "Organic Cotton", size: "S-XL", description: "Comfortable socks made from organic cotton." },
  { id: 22, name: "Recycled Polyester Jacket", category: "Clothing", price: 75, image: "assets/products/jacket.png", rating: 4.7, quantityAvailable: 50, material: "Recycled Polyester", size: "M-L", description: "Warm jacket made from recycled polyester fibers." },

  // Home Decor
  { id: 23, name: "Bamboo Plant Pot", category: "Home Decor", price: 15, image: "assets/products/plantpot.png", rating: 5, quantityAvailable: 80, material: "Bamboo", size: "15cm", description: "Eco-friendly plant pot made from bamboo." },
  { id: 24, name: "Eco Wall Clock", category: "Home Decor", price: 40, image: "assets/products/clock.png", rating: 4.6, quantityAvailable: 30, material: "Recycled Wood & Glass", size: "30x30cm", description: "Stylish wall clock made from sustainable materials." },

  // Electronics
  { id: 25, name: "Solar Desk Lamp", category: "Electronics", price: 35, image: "assets/products/solarlamp.png", rating: 5, quantityAvailable: 40, material: "Plastic & Solar Cells", size: "Medium", description: "Eco-friendly desk lamp powered by solar energy." },
  { id: 26, name: "Eco Laptop Stand", category: "Electronics", price: 45, image: "assets/products/laptopstand.png", rating: 4.8, quantityAvailable: 25, material: "Recycled Wood", size: "Adjustable", description: "Sustainable laptop stand made from recycled wood." },

  // Skincare
  { id: 27, name: "Organic Shampoo Bar", category: "Skincare", price: 14, image: "assets/products/shampoobar.png", rating: 4.9, quantityAvailable: 120, material: "Organic Oils", size: "50g", description: "Eco-friendly solid shampoo bar." },
  { id: 28, name: "Natural Soap Set", category: "Skincare", price: 16, image: "assets/products/soapset.png", rating: 5, quantityAvailable: 100, material: "Natural Oils & Herbs", size: "3x80g", description: "Set of three handmade natural soaps." },

  // More Clothing
  { id: 29, name: "Hemp Cap", category: "Clothing", price: 18, image: "assets/products/cap.png", rating: 4.8, quantityAvailable: 70, material: "Hemp", size: "One Size", description: "Eco-friendly hemp cap for everyday wear." },
  { id: 30, name: "Eco Denim Jacket", category: "Clothing", price: 70, image: "assets/products/denimjacket.png", rating: 4.9, quantityAvailable: 40, material: "Recycled Denim", size: "M-L", description: "Stylish jacket made from recycled denim." },
];

// ====== DOM Elements ======
const productsContainer = document.querySelector('.container.grid');
const categoryFilter = document.createElement('select');
categoryFilter.className = 'max-w-md inline-block mx-auto flex w-full border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-gray-300  border px-4 text-center py-2 text-sm rounded mb-6';
categoryFilter.innerHTML = `
  <option value="all">All Categories</option>
  <option value="Clothing">Clothing</option>
  <option value="Home Decor">Home Decor</option>
  <option value="Electronics">Electronics</option>
  <option value="Skincare">Skincare</option>
`;

// Insert category filter before the products container
productsContainer.parentElement.insertBefore(categoryFilter, productsContainer);

// ====== Utility Functions ======
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    // Increment quantity if available
    if(existingItem.quantity < existingItem.quantityAvailable) {
      existingItem.quantity += 1;
    } else {
      alert("No more stock available for this product.");
    }
  } else {
    const product = allProducts.find(p => p.id === productId);
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  alert("Product added to cart!");
}

// ====== Render Products ======
function renderProducts(products) {
  productsContainer.innerHTML = ''; // Clear container
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'border rounded overflow-hidden bg-white';
    productCard.innerHTML = `
      <img src="${product.image}" class="w-full h-64 object-cover" alt="${product.name}">
      <div class="p-4 text-center">
        <h3 class="font-medium mb-1">${product.name}</h3>
        <p class="text-sm mb-1">$${product.price.toFixed(2)}</p>
        <p class="text-xs text-gray-500 mb-2">Category: ${product.category}</p>
        <p class="text-xs text-gray-500 mb-2">Available: ${product.quantityAvailable}</p>
        <button class="bg-[#1D3400] text-white px-4 py-2 hover:bg-[#7f715c] transition duration-150 add-to-cart">Add to cart</button>
      </div>
    `;
    // Add event listener to Add to Cart button
    productCard.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product.id));
    productsContainer.appendChild(productCard);
  });
}

// ====== Initial Render ======
renderProducts(allProducts);

// ====== Filter by Category ======
categoryFilter.addEventListener('change', () => {
  const selected = categoryFilter.value;
  if (selected === 'all') {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === selected);
    renderProducts(filtered);
  }
});
