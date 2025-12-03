// Load stored payments or initialize
if (!localStorage.getItem("payments")) {
  localStorage.setItem("payments", JSON.stringify([]));
}

const paymentTable = document.getElementById("paymentTableBody");

function displayPayments() {
  const payments = JSON.parse(localStorage.getItem("payments"));
  paymentTable.innerHTML = "";

  payments.forEach(p => {
    paymentTable.innerHTML += `
      <tr>
        <td>${p.customer}</td>
        <td>₹ ${p.amount}</td>
        <td class="${p.status === 'Unpaid' ? 'text-danger fw-bold' : 'text-success'}">${p.status}</td>
      </tr>`;
  });
}

function addPayment() {
  const customer = document.getElementById("payCustomer").value;
  const amount = document.getElementById("payAmount").value;
  const status = document.getElementById("payStatus").value;

  if (customer && amount) {
    const payments = JSON.parse(localStorage.getItem("payments"));
    payments.push({ customer, amount, status });
    localStorage.setItem("payments", JSON.stringify(payments));
    displayPayments();

    // Clear form
    payCustomer.value = "";
    payAmount.value = "";
  } else {
    alert("Enter valid details ❌");
  }
}

// Load payments on page open
displayPayments();
