
  function renderCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderItemsEl = document.getElementById("order-items");
    const subtotalEl = document.getElementById("order-subtotal");
    const totalEl = document.getElementById("order-total");

    orderItemsEl.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
      const row = document.createElement("tr");
      row.className = "border-b";
      row.innerHTML = `
        <td class="py-2">${item.name} × ${item.quantity}</td>
        <td class="py-2 text-right">$${(item.price * item.quantity).toFixed(2)}</td>
      `;
      orderItemsEl.appendChild(row);
      subtotal += item.price * item.quantity;
    });

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    totalEl.textContent = `$${subtotal.toFixed(2)}`;
  }

  // Run on page load
  document.addEventListener("DOMContentLoaded", renderCheckoutSummary);

  // Optional: handle Place Order
  document.getElementById("place-order").addEventListener("click", () => {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    window.location.href = "index.html"; // redirect to home or confirmation page
  });

