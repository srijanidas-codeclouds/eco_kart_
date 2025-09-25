// ====== Checkout Logic ======
document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements  
  const form = document.querySelector("form");
  const placeOrderBtn = document.getElementById("place-order");
  const orderItemsContainer = document.getElementById("order-items");
  const subtotalEl = document.getElementById("order-subtotal");
  const totalEl = document.getElementById("order-total");

  // Payment section
  // ====== Payment Section ======
    const paymentContainer = document.createElement("div");
    paymentContainer.className = "mb-6 space-y-4";
    paymentContainer.innerHTML = `
    <h3 class="text-lg font-semibold mb-3">Payment Method</h3>

    <!-- COD -->
    <label class="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
        <input type="radio" name="payment" value="COD" class="payment-method" checked>
        <span class="font-medium">Cash on Delivery</span>
    </label>

    <!-- UPI -->
    <label class="flex items-center justify-between gap-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
        <div class="flex items-center gap-3">
        <input type="radio" name="payment" value="UPI" class="payment-method">
        <span class="font-medium">UPI</span>
        </div>
        <div class="flex gap-2">
        <img src="assets/payments/gpay.png" alt="GPay" class="h-6 w-auto">
        <img src="assets/payments/phonpe.png" alt="PhonePe" class="h-6 w-auto">
        <img src="assets/payments/paytm.png" alt="Paytm" class="h-6 w-auto">
        </div>
    </label>
    <div id="upi-field" class="hidden ml-6 mt-2">
        <input type="text" id="upi-id" placeholder="Enter UPI ID" 
        class="border px-3 py-2 w-full rounded focus:ring-2 focus:ring-green-500">
    </div>

    <!-- Card -->
    <label class="flex items-center justify-between gap-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
        <div class="flex items-center gap-3">
        <input type="radio" name="payment" value="Card" class="payment-method">
        <span class="font-medium">Credit/Debit Card</span>
        </div>
        <div class="flex gap-2">
        <img src="assets/payments/visa.png" alt="Visa" class="h-6 w-auto">
        <img src="assets/payments/master.png" alt="MasterCard" class="h-6 w-auto">
        </div>
    </label>
    <div id="card-fields" class="hidden ml-6 mt-2 space-y-2">
        <input type="text" id="card-number" placeholder="Card Number" 
        class="border px-3 py-2 w-full rounded focus:ring-2 focus:ring-green-500">
        <div class="grid grid-cols-2 gap-3">
        <input type="text" id="card-expiry" placeholder="MM/YY" 
            class="border px-3 py-2 w-full rounded focus:ring-2 focus:ring-green-500">
        <input type="text" id="card-cvv" placeholder="CVV" 
            class="border px-3 py-2 w-full rounded focus:ring-2 focus:ring-green-500">
        </div>
    </div>
    `;

    // Insert before Place Order button
    placeOrderBtn.parentElement.insertBefore(paymentContainer, placeOrderBtn);

  // ====== Load Cart into Checkout ======
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function renderOrderSummary() {
    const cart = getCart();
    orderItemsContainer.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item) => {
      const row = document.createElement("tr");
      row.className = "border-b";
      row.innerHTML = `
        <td class="py-2">${item.name} × ${item.quantity}</td>
        <td class="py-2 text-right">$${(item.price * item.quantity).toFixed(2)}</td>
      `;
      orderItemsContainer.appendChild(row);
      subtotal += item.price * item.quantity;
    });

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    totalEl.textContent = `$${subtotal.toFixed(2)}`;
  }

  renderOrderSummary();

  // ====== Show/Hide Payment Fields ======
  document.querySelectorAll(".payment-method").forEach((radio) => {
    radio.addEventListener("change", () => {
      document.getElementById("upi-field").classList.toggle("hidden", radio.value !== "UPI");
      document.getElementById("card-fields").classList.toggle("hidden", radio.value !== "Card");
    });
  });

  // ====== Validation Helpers ======
  function validateForm() {
    const requiredFields = form.querySelectorAll("input[required], select[required]");
    let valid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        valid = false;
        field.classList.add("border-red-500");
      } else {
        field.classList.remove("border-red-500");
      }
    });

    // Email check
    const email = form.querySelector("input[type='email']");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      valid = false;
      email.classList.add("border-red-500");
    }

    // Phone check (basic digits only)
    const phone = [...form.querySelectorAll("input")].find((i) =>
      i.previousSibling?.textContent?.includes("Phone")
    );
    if (phone && !/^\d{7,15}$/.test(phone.value)) {
      valid = false;
      phone.classList.add("border-red-500");
    }

    return valid;
  }

  // ====== Place Order Handler ======
placeOrderBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!validateForm()) {
    alert("Please fill all required fields correctly.");
    return;
  }

  const selectedPayment = document.querySelector("input[name='payment']:checked").value;
  if (selectedPayment === "UPI" && !document.getElementById("upi-id").value.trim()) {
    alert("Please enter a valid UPI ID.");
    return;
  }
  if (selectedPayment === "Card") {
    const cardNum = document.getElementById("card-number").value.trim();
    const expiry = document.getElementById("card-expiry").value.trim();
    const cvv = document.getElementById("card-cvv").value.trim();
    if (!cardNum || !expiry || !cvv) {
      alert("Please fill in all card details.");
      return;
    }
  }

  // Gather order info
const formData = new FormData(form);
const firstName = formData.get("firstName") || "Customer";
const lastName = formData.get("lastName") || "";
const address = formData.getAll("")[0]; // fallback for multi-line street address
// const street = formData.get("street") || "";
const city = formData.get("city") || "";
const postcode = formData.get("postcode") || "";
const phone = formData.get("phone") || "";
const email = formData.get("email") || "";

const cart = getCart();

let orderSummaryHTML = `
  <div class="space-y-1">
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Address:</strong> ${city}, ${postcode}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Payment Method:</strong> ${selectedPayment}</p>
  </div>
  <hr class="my-3">
  <h3 class="font-semibold">Items:</h3>
  <ul class="list-disc list-inside">
    ${cart.map((i) => `<li>${i.name} × ${i.quantity} — $${(i.price * i.quantity).toFixed(2)}</li>`).join("")}
  </ul>
  <hr class="my-3">
  <p class="font-bold">Total: ${totalEl.textContent}</p>
`;
document.getElementById("order-details").innerHTML = orderSummaryHTML;

// Show modal
document.getElementById("order-modal").classList.remove("hidden");

});

// ====== Modal Buttons ======
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("order-modal").classList.add("hidden");
});

document.getElementById("continue-shopping").addEventListener("click", () => {
  localStorage.removeItem("cart");
  window.location.href = "index.html";
});


});


