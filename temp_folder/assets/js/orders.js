// initialize storage
if(!localStorage.getItem("inventory")){
  const initialStock = [
    {id:"prod-atta", name:"Wheat Flour (Atta)", qty:10},
    {id:"prod-rice", name:"Basmati Rice", qty:10},
    {id:"prod-dal", name:"Toor Dal", qty:10},
    {id:"prod-lays", name:"Lays Chips (45g)", qty:10},
    {id:"prod-parleg", name:"Parle-G Biscuits", qty:10},
    {id:"prod-nachos", name:"Mad Angles (85g)", qty:10},
    {id:"prod-milk", name:"Amul Milk (1L)", qty:10},
    {id:"prod-curd", name:"Amul Curd (200g)", qty:10},
    {id:"prod-butter", name:"Amul Butter (100g)", qty:10}
  ];
  localStorage.setItem("inventory", JSON.stringify(initialStock));
}

if(!localStorage.getItem("orders")){
  localStorage.setItem("orders", JSON.stringify([]));
}

if(!localStorage.getItem("stats")){
  localStorage.setItem("stats", JSON.stringify({customers:0, orders:0, earnings:0}));
}

// price mapping
const prices = {
  "prod-atta":45, "prod-rice":65, "prod-dal":110,
  "prod-lays":20, "prod-parleg":10, "prod-nachos":30,
  "prod-milk":54, "prod-curd":25, "prod-butter":55
};

// populate dropdown
const dropdown = document.getElementById("itemDropdown");
const inventory = JSON.parse(localStorage.getItem("inventory"));

inventory.forEach(i=>{
  dropdown.innerHTML += `<option value="${i.id}">${i.name}</option>`;
});

// auto-fill amount when item selected
dropdown.addEventListener("change", ()=>{
  const id = dropdown.value;
  document.getElementById("orderAmount").value = prices[id];
});

// main logic to add order
function addOrder(){
  const itemID = dropdown.value;
  const itemName = inventory.find(i=> i.id === itemID).name;
  let stock = JSON.parse(localStorage.getItem("inventory"));

  // reduce stock
  let item = stock.find(i=> i.id === itemID);
  if(item.qty <= 0){
    alert("🚩 OUT OF STOCK!");
    return;
  }
  item.qty -= 1;
  localStorage.setItem("inventory", JSON.stringify(stock));

  // add to order table
  let orders = JSON.parse(localStorage.getItem("orders"));
  orders.push({item:itemName, amount:prices[itemID], status:"Pending"});
  localStorage.setItem("orders", JSON.stringify(orders));

  // update stats
  let s = JSON.parse(localStorage.getItem("stats"));
  s.orders += 1;
  s.earnings += prices[itemID];
  localStorage.setItem("stats", JSON.stringify(s));

  updateOrdersUI();
}

// update orders + earnings UI
function updateOrdersUI(){
  let ord = JSON.parse(localStorage.getItem("orders"));
  let s = JSON.parse(localStorage.getItem("stats"));

  const table = document.getElementById("orderTable");
  table.innerHTML = "";

  ord.forEach(o=>{
    table.innerHTML += `
    <tr>
      <td>${o.item}</td>
      <td>₹${o.amount}</td>
      <td class="text-danger fw-bold">${o.status}</td>
    </tr>`;
  });

  document.getElementById("orderCount").innerText = s.orders;
  document.getElementById("totalEarnings").innerText = "₹" + s.earnings;
}

updateOrdersUI();
