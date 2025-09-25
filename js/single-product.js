// ====== Data ======
const allProducts = [
  // Clothing
  { id: 21, name: "Organic Cotton Socks", category: "Clothing", price: 12, image: "https://images.unsplash.com/photo-1734524547790-1ebd224323c0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG9yZ2FuaWMlMjBjb3R0b24lMjBzb2Nrc3xlbnwwfHwwfHx8MA%3D%3D", rating: 5, quantityAvailable: 100, material: "Organic Cotton", size: "S-XL", description: "Comfortable socks made from organic cotton." },
  { id: 22, name: "Recycled Polyester Jacket", category: "Clothing", price: 75, image: "https://images.unsplash.com/photo-1668959843026-1a3af00607ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVjeWNsZWQlMjBwb2x5ZXN0b3IlMjBqYWNrZXR8ZW58MHx8MHx8fDA%3D", rating: 4.7, quantityAvailable: 50, material: "Recycled Polyester", size: "M-L", description: "Warm jacket made from recycled polyester fibers." },

  // Home Decor
  { id: 23, name: "Bamboo Plant Pot", category: "Home Decor", price: 15, image: "https://media.istockphoto.com/id/1150452214/photo/image-of-lucky-bamboo-shoots-dracaena-sanderiana-growing-in-black-cauldron-pot-against-mirror.webp?a=1&b=1&s=612x612&w=0&k=20&c=O_3LA3NRAOj8HKFdytXbnoD7qbXV2_7NtDc1U2mYuYw=", rating: 5, quantityAvailable: 80, material: "Bamboo", size: "15cm", description: "Eco-friendly plant pot made from bamboo." },
  { id: 24, name: "Eco Wall Clock", category: "Home Decor", price: 40, image: "https://plus.unsplash.com/premium_photo-1723809745412-d16e770205de?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29vZGVuJTIwd2FsbCUyMGNsb2NrfGVufDB8fDB8fHww", rating: 4.6, quantityAvailable: 30, material: "Recycled Wood & Glass", size: "30x30cm", description: "Stylish wall clock made from sustainable materials." },

  // Electronics
  { id: 25, name: "Solar Desk Lamp", category: "Electronics", price: 35, image: "https://images.unsplash.com/photo-1571406487954-dc11b0c0767d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzayUyMGxhbXAlMjBwb3dlcmVkJTIwYnklMjBzb2xhciUyMGVuZXJneXxlbnwwfHwwfHx8MA%3D%3D", rating: 5, quantityAvailable: 40, material: "Plastic & Solar Cells", size: "Medium", description: "Eco-friendly desk lamp powered by solar energy." },
  { id: 26, name: "Eco Laptop Stand", category: "Electronics", price: 45, image: "https://images.unsplash.com/photo-1615375044562-6de496a0a886?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8JTIyU3VzdGFpbmFibGUlMjBsYXB0b3AlMjBzdGFuZCUyMG1hZGUlMjBmcm9tJTIwcmVjeWNsZWQlMjB3b29kLiUyMnxlbnwwfHwwfHx8MA%3D%3D", rating: 4.8, quantityAvailable: 25, material: "Recycled Wood", size: "Adjustable", description: "Sustainable laptop stand made from recycled wood." },

  // Skincare
  { id: 27, name: "Organic Shampoo Bar", category: "Skincare", price: 14, image: "https://plus.unsplash.com/premium_photo-1661333596291-f4ddca654f19?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b3JnYW5pYyUyMHNoYW1wb28lMjBiYXJ8ZW58MHx8MHx8fDA%3D", rating: 4.9, quantityAvailable: 120, material: "Organic Oils", size: "50g", description: "Eco-friendly solid shampoo bar." },
  { id: 28, name: "Natural Soap Set", category: "Skincare", price: 16, image: "https://plus.unsplash.com/premium_photo-1671379515272-b32810cfc630?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJhbCUyMHNvYXAlMjBzZXR8ZW58MHx8MHx8fDA%3D", rating: 5, quantityAvailable: 100, material: "Natural Oils & Herbs", size: "3x80g", description: "Set of three handmade natural soaps." },

  // More Clothing
  { id: 29, name: "Hemp Cap", category: "Clothing", price: 18, image: "https://images.unsplash.com/photo-1665064249700-c436a9322818?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGVtcCUyMGNhcCUyMGZvciUyMGV2ZXJ5ZGF5JTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D", rating: 4.8, quantityAvailable: 70, material: "Hemp", size: "One Size", description: "Eco-friendly hemp cap for everyday wear." },
  { id: 30, name: "Eco Denim Jacket", category: "Clothing", price: 70, image: "https://media.istockphoto.com/id/2037136753/photo/close-up-of-a-green-leaf-in-a-blue-denim-jacket-pocket-a-concept-of-sustainable-slow-fashion.webp?a=1&b=1&s=612x612&w=0&k=20&c=aLHBlIIScB__vwhMmB1L76T9Vq7HZomPMYiLDiQr3Jc=", rating: 4.9, quantityAvailable: 40, material: "Recycled Denim", size: "M-L", description: "Stylish jacket made from recycled denim." },
];

// ====== Cart Utils ======
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    if (existingItem.quantity + quantity <= product.quantityAvailable) {
      existingItem.quantity += quantity;
    } else {
      alert("No more stock available.");
      return;
    }
  } else {
    cart.push({ ...product, quantity });
  }
  saveCart(cart);
  alert("Product added to cart!");
}

// ====== Get product from URL ======
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));
const product = allProducts.find(p => p.id === productId);
const minusBtn = document.querySelector("#product-container .qty-minus");
const plusBtn = document.querySelector("#product-container .qty-plus");
const qtyInput = document.querySelector("#qty-input");


// ====== Inject into DOM ======
if (product) {
  const container = document.getElementById("product-container");
  container.dataset.productId = product.id;
  container.dataset.price = product.price;
  container.dataset.stock = product.quantityAvailable;

  document.getElementById("product-image").src = product.image;
  document.getElementById("product-image").alt = product.name;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = `₹${product.price}`;
  document.getElementById("product-category").textContent = product.category;
  document.getElementById("product-description").textContent = product.description;

  // dynamic description
  document.getElementById("content-description").innerHTML = `
    <p>${product.description}</p>
    <p><strong>Material:</strong> ${product.material}</p>
    <p><strong>Size:</strong> ${product.size}</p>
    <p><strong>Available:</strong> ${product.quantityAvailable}</p>
  `;

  // update reviews header
  document.querySelector("#content-reviews h3").textContent =
    `Be the first to review “${product.name}”`;

  // Quantity + / - buttons
  minusBtn.addEventListener("click", () => {
  let val = parseInt(qtyInput.value) || 1;
  if (val > 1) qtyInput.value = val - 1;
});

plusBtn.addEventListener("click", () => {
  let val = parseInt(qtyInput.value) || 1;
  if (val < product.quantityAvailable) qtyInput.value = val + 1;
});
    qtyInput.addEventListener("input", () => {
      let val = parseInt(qtyInput.value);
      if (val < 1) qtyInput.value = 1;
      else if (val > product.quantityAvailable) qtyInput.value = product.quantityAvailable;
    });
} else {
  document.getElementById("product-container").innerHTML =
    `<p class="text-red-600">Product not found.</p>`;
}
