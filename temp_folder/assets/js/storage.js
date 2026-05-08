// Default storage setup
if(!localStorage.getItem("customers")){
  localStorage.setItem("customers", JSON.stringify([]));
}
if(!localStorage.getItem("orders")){
  localStorage.setItem("orders", JSON.stringify([]));
}
if(!localStorage.getItem("payments")){
  localStorage.setItem("payments", JSON.stringify([]));
}

// Add Customer
function addCustomer(){
  let customers = JSON.parse(localStorage.getItem("customers"));
  customers.push({name:cName.value, phone:cPhone.value});
  localStorage.setItem("customers", JSON.stringify(customers));
  cName.value = ""; cPhone.value="";
  loadCustomers();
  updateSummary();
}

// Load Customers
function loadCustomers(){
  let customers = JSON.parse(localStorage.getItem("customers"));
  savedCustomers.innerHTML = "";
  customers.forEach(c=>{
    savedCustomers.innerHTML += `<li class='text-dark'>👤 ${c.name} — ${c.phone}</li>`;
  });
}

// Update summary
function updateSummary(){
  updateSummary();
}

// Show summary at top
function updateSummary(){
  let orders = JSON.parse(localStorage.getItem("orders"));
  let payments = JSON.parse(localStorage.getItem("payments"));
  totalOrders.innerText = orders.length;

  let pending = payments.filter(p=>p.status=="Pending").reduce((sum,p)=>sum+Number(p.amount),0);
  totalPending.innerText = "₹"+pending;
}
