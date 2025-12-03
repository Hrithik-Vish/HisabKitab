const customers = [
  { name:"Rohan", phone:"9198112233", pending:200, last:"2025-11-26"},
  { name:"Ayesha", phone:"9188776655", pending:0, last:"2025-11-22"},
  { name:"Farmer Shop", phone:"9199334455", pending:540, last:"2025-11-27"}
];

const table = document.getElementById("customerTable");

customers.forEach(c=>{
  table.innerHTML += `
  <tr>
    <td>${c.name}</td>
    <td>${c.phone}</td>
    <td class="${c.pending > 0 ? 'text-danger fw-bold' : 'text-success'}">₹ ${c.pending}</td>
    <td>${c.last}</td>
  </tr>`;
});
