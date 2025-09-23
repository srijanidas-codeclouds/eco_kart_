// ==========================================
// ECO-FRIENDLY PRODUCTS DATA
// ==========================================

// Trending Products
const trendingProducts = [
  { id: 1, name: "Organic Cotton T-Shirt", category: "Clothing", price: 25, image: "assets/products/tshirt.png", rating: 5, quantityAvailable: 50, material: "Organic Cotton", size: "S, M, L, XL", description: "Soft, breathable, and eco-friendly cotton t-shirt." },
  { id: 2, name: "Bamboo Sunglasses", category: "Clothing", price: 40, image: "assets/products/sunglasses.png", rating: 4.5, quantityAvailable: 30, material: "Bamboo", size: "One Size", description: "Stylish sunglasses made from sustainable bamboo." },
  { id: 3, name: "Recycled Paper Notebook", category: "Home Decor", price: 12, image: "assets/products/notebook.png", rating: 5, quantityAvailable: 100, material: "Recycled Paper", size: "A5", description: "Eco-friendly notebook made from 100% recycled paper." },
  { id: 4, name: "Eco-Friendly Candle", category: "Home Decor", price: 18, image: "assets/products/candle.png", rating: 4.8, quantityAvailable: 60, material: "Soy Wax", size: "200g", description: "Scented candle made from natural soy wax." },
  { id: 5, name: "Solar Power Bank", category: "Electronics", price: 50, image: "assets/products/solar.png", rating: 5, quantityAvailable: 40, material: "Plastic & Solar Cells", size: "Compact", description: "Portable solar-powered charger for your devices." },
  { id: 6, name: "Wooden Bluetooth Speaker", category: "Electronics", price: 65, image: "assets/products/speaker.png", rating: 4.7, quantityAvailable: 25, material: "Bamboo Wood", size: "Medium", description: "Eco-friendly Bluetooth speaker made of sustainable bamboo." },
  { id: 7, name: "Natural Face Cream", category: "Skincare", price: 20, image: "assets/products/facecream.png", rating: 5, quantityAvailable: 80, material: "Organic Oils & Extracts", size: "50ml", description: "Moisturizing face cream with natural ingredients." },
  { id: 8, name: "Bamboo Toothbrush", category: "Skincare", price: 8, image: "assets/products/toothbrush.png", rating: 4.9, quantityAvailable: 200, material: "Bamboo & Nylon Bristles", size: "One Size", description: "Sustainable toothbrush made from bamboo." },
  { id: 9, name: "Recycled Fabric Tote Bag", category: "Clothing", price: 22, image: "assets/products/totebag.png", rating: 5, quantityAvailable: 75, material: "Recycled Fabric", size: "40x35cm", description: "Reusable tote bag made from recycled materials." },
  { id: 10, name: "Organic Lip Balm", category: "Skincare", price: 10, image: "assets/products/lipbalm.png", rating: 4.8, quantityAvailable: 150, material: "Beeswax & Organic Oils", size: "10g", description: "Hydrating lip balm made from natural ingredients." },
];

// Featured Products
const featuredProducts = [
  { id: 11, name: "Hemp Hoodie", category: "Clothing", price: 55, image: "assets/products/hoodie.png", rating: 5, quantityAvailable: 40, material: "Hemp Cotton Blend", size: "S, M, L, XL", description: "Comfortable hoodie made from hemp blend fabric." },
  { id: 12, name: "Recycled Denim Jeans", category: "Clothing", price: 60, image: "assets/products/jeans.png", rating: 4.6, quantityAvailable: 35, material: "Recycled Denim", size: "28-36", description: "Stylish jeans crafted from recycled denim fabric." },
  { id: 13, name: "Eco Wall Art", category: "Home Decor", price: 35, image: "assets/products/wallart.png", rating: 4.8, quantityAvailable: 50, material: "Reclaimed Wood & Paint", size: "30x40cm", description: "Sustainable wall art made from reclaimed materials." },
  { id: 14, name: "Bamboo Floor Lamp", category: "Home Decor", price: 80, image: "assets/products/lamp.png", rating: 5, quantityAvailable: 20, material: "Bamboo & LED", size: "1.2m", description: "Eco-friendly floor lamp crafted from bamboo." },
  { id: 15, name: "Solar LED Lantern", category: "Electronics", price: 30, image: "assets/products/lantern.png", rating: 5, quantityAvailable: 45, material: "Plastic & Solar Cells", size: "Medium", description: "Portable solar-powered LED lantern." },
  { id: 16, name: "Eco Headphones", category: "Electronics", price: 70, image: "assets/products/headphones.png", rating: 4.7, quantityAvailable: 30, material: "Recycled Plastic & Wood", size: "Adjustable", description: "Stylish headphones made from recycled materials." },
  { id: 17, name: "Organic Body Lotion", category: "Skincare", price: 18, image: "assets/products/bodylotion.png", rating: 4.9, quantityAvailable: 100, material: "Natural Oils & Extracts", size: "100ml", description: "Moisturizing body lotion made from natural ingredients." },
  { id: 18, name: "Reusable Makeup Remover Pads", category: "Skincare", price: 12, image: "assets/products/removerpads.png", rating: 5, quantityAvailable: 120, material: "Organic Cotton", size: "10 Pads", description: "Eco-friendly reusable pads for makeup removal." },
  { id: 19, name: "Recycled Wool Scarf", category: "Clothing", price: 28, image: "assets/products/scarf.png", rating: 4.8, quantityAvailable: 60, material: "Recycled Wool", size: "180x30cm", description: "Warm and cozy scarf made from recycled wool." },
  { id: 20, name: "Eco Lipstick Set", category: "Skincare", price: 22, image: "assets/products/lipstick.png", rating: 4.9, quantityAvailable: 80, material: "Natural Wax & Pigments", size: "3x5g", description: "Set of three eco-friendly lipsticks." },
];

// All Products
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
