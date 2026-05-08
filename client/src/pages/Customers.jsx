import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Customers() {
  const [customers, setCustomers] = useState(() => {
    const savedCustomers =
      localStorage.getItem("customers");

    if (savedCustomers) {
      return JSON.parse(savedCustomers);
    }

    return [
      {
        id: 1,
        name: "Rahul Sharma",
        phone: "9876543210",
        totalDue: 1200,
      },
      {
        id: 2,
        name: "Priya Verma",
        phone: "9988776655",
        totalDue: 0,
      },
      {
        id: 3,
        name: "Amit Joshi",
        phone: "9123456780",
        totalDue: 500,
      },
    ];
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [due, setDue] = useState("");

  // SAVE TO LOCAL STORAGE

  useEffect(() => {
    localStorage.setItem(
      "customers",
      JSON.stringify(customers)
    );
  }, [customers]);

  // ADD CUSTOMER

  const addCustomer = () => {
    if (!name || !phone || !due) {
      alert("Please fill all fields");
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name,
      phone,
      totalDue: Number(due),
    };

    setCustomers([...customers, newCustomer]);

    setName("");
    setPhone("");
    setDue("");
  };

  // DELETE CUSTOMER

  const deleteCustomer = (id) => {
    const updatedCustomers = customers.filter(
      (customer) => customer.id !== id
    );

    setCustomers(updatedCustomers);
  };

  // SEND REMINDER

  const sendReminder = (customer) => {
    const digitsOnly = String(customer.phone || "").replace(/\D/g, "");
    const whatsappNumber =
      digitsOnly.length === 10 ? `91${digitsOnly}` : digitsOnly;

    if (!whatsappNumber) {
      alert("Please add a valid phone number for this customer.");
      return;
    }

    const message = `
Hello ${customer.name},

This is a friendly reminder that your pending payment of ₹${customer.totalDue} is due.

Please clear the payment at your earliest convenience.

Thank you for choosing HisabKitab.

- HisabKitab AI
`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message.trim()
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: "250px",
          width: "100%",
          padding: "30px",
          color: "white",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "64px",
            marginBottom: "30px",
          }}
        >
          Customers
        </h1>

        {/* ADD CUSTOMER FORM */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          <input
            type="text"
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              width: "200px",
            }}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              width: "200px",
            }}
          />

          <input
            type="number"
            placeholder="Pending Due"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              width: "180px",
            }}
          />

          <button
            onClick={addCustomer}
            style={{
              padding: "12px 20px",
              backgroundColor: "#333",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add Customer
          </button>
        </div>

        {/* CUSTOMER LIST */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {customers.map((customer) => (
            <div
              key={customer.id}
              style={{
                backgroundColor: "#161b22",
                border: "1px solid #30363d",
                padding: "25px",
                borderRadius: "12px",
              }}
            >
              <h2>{customer.name}</h2>

              <p>Phone: {customer.phone}</p>

              <p
                style={{
                  color:
                    customer.totalDue > 0
                      ? "#ffcc00"
                      : "lightgreen",
                  fontWeight: "bold",
                }}
              >
                Pending Due: ₹{customer.totalDue}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                  flexWrap: "wrap",
                }}
              >
                {customer.totalDue > 0 && (
                  <button
                    onClick={() =>
                      sendReminder(customer)
                    }
                    style={{
                      padding: "10px 18px",
                      backgroundColor: "#25D366",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Send WhatsApp Reminder
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteCustomer(customer.id)
                  }
                  style={{
                    padding: "10px 18px",
                    backgroundColor: "crimson",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Delete Customer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Customers;
