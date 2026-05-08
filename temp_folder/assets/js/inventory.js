const API_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:5000/api" : "/api";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "index.html";
}

const stockTable = document.getElementById("stockTableBody");

async function displayInventory() {
  try {
    const res = await fetch(`${API_URL}/inventory`, { headers: { "Authorization": `Bearer ${token}` }});
    const stock = await res.json();
    
    stockTable.innerHTML = "";
    if (stock.length === 0) {
        stockTable.innerHTML = `<tr><td colspan="3" class="text-center">No inventory items yet.</td></tr>`;
    }

    stock.forEach(i => {
      const isLow = i.quantity <= (i.threshold || 2);
      stockTable.innerHTML += `
      <tr>
        <td>${i.item_name}</td>
        <td>${i.quantity}</td>
        <td class="${isLow ? 'text-danger fw-bold' : 'text-success'}">
          ${isLow ? '⚠ Low Stock' : 'In Stock'}
        </td>
      </tr>`;
    });
  } catch (error) {
    console.error("Failed to load inventory", error);
  }
}

async function addInventory() {
  const item_name = document.getElementById("stockItem").value;
  const quantity = document.getElementById("stockQty").value;

  if (!item_name || !quantity) return alert("Please fill item name and quantity");

  try {
    const res = await fetch(`${API_URL}/inventory`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ item_name, quantity, threshold: 2, unit: "pcs" })
    });

    if (res.ok) {
      document.getElementById("stockItem").value = "";
      document.getElementById("stockQty").value = "";
      displayInventory();
    } else {
      alert("Failed to add inventory item.");
    }
  } catch (error) {
    console.error("Error adding inventory", error);
  }
}

// Run on load
document.addEventListener("DOMContentLoaded", () => {
    displayInventory();
});