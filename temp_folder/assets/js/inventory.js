// Ensure storage exists
if(!localStorage.getItem("inventory")){
  localStorage.setItem("inventory", JSON.stringify([]));
}

const stock = JSON.parse(localStorage.getItem("inventory"));

const stockTable = document.getElementById("stockTableBody");

// Populate inventory table
function displayInventory(){
  stockTable.innerHTML = "";
  stock.forEach(i=>{
    stockTable.innerHTML += `
    <tr>
      <td>${i.name}</td>
      <td>${i.qty}</td>
      <td class="${i.qty <= 1 ? 'text-warning fw-bold' : ''}">
        ${i.qty <= 1 ? '⚠ Low Stock' : ''}
      </td>
    </tr>`;
  });
}

// Optional: AI/Rule based restock suggestion section
function restockSuggestions(){
  const suggestionBox = document.getElementById("restockBox");
  suggestionBox.innerHTML = "";

  stock.forEach(i=>{
    if(i.qty <= 2){
      suggestionBox.innerHTML += `<p class="text-danger">🔻 ${i.name} is low (only ${i.qty} left), restock soon!</p>`;
    }
  });
}

// run both functions on load
displayInventory();
restockSuggestions();
