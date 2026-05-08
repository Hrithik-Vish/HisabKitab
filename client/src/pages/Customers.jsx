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
  const [search, setSearch] = useState("");
  const [dueFilter, setDueFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(
      "customers",
      JSON.stringify(customers)
    );
  }, [customers]);

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

  const deleteCustomer = (id) => {
    const updatedCustomers = customers.filter(
      (customer) => customer.id !== id
    );

    setCustomers(updatedCustomers);
  };

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

This is a friendly reminder that your pending payment of Rs.${customer.totalDue} is due.

Please clear the payment at your earliest convenience.

Thank you for choosing HisabKitab.

- HisabKitab AI
`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message.trim()
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const totalDue = customers.reduce(
    (total, customer) => total + customer.totalDue,
    0
  );

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.phone.includes(search);
    const matchesDue =
      dueFilter === "All" ||
      (dueFilter === "Due" && customer.totalDue > 0) ||
      (dueFilter === "Clear" && customer.totalDue === 0);

    return matchesSearch && matchesDue;
  });

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="page">
        <header className="page-header">
          <div>
            <p className="eyebrow">Customer dues</p>
            <h1 className="page-title">Customers</h1>
            <p className="page-subtitle">
              Store customer numbers, track pending payments and
              launch WhatsApp reminders in one click.
            </p>
          </div>

          <div className="hero-metric">
            <span>Total customer due</span>
            <strong>Rs.{totalDue}</strong>
          </div>
        </header>

        <section className="panel form-panel">
          <input
            className="input"
            type="text"
            placeholder="Customer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="input"
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <input
            className="input"
            type="number"
            placeholder="Pending due"
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />

          <button
            onClick={addCustomer}
            className="btn btn-primary"
          >
            Add Customer
          </button>
        </section>

        <section className="toolbar">
          <input
            className="input"
            type="text"
            placeholder="Search customers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="segmented">
            {["All", "Due", "Clear"].map((filter) => (
              <button
                key={filter}
                className={
                  dueFilter === filter
                    ? "segment active"
                    : "segment"
                }
                onClick={() => setDueFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {filteredCustomers.length === 0 && (
          <div className="empty-state">
            No customers match your search or filter.
          </div>
        )}

        <section className="cards-list">
          {filteredCustomers.map((customer) => (
            <article
              key={customer.id}
              className="card"
            >
              <div className="card-head">
                <div>
                  <h2>{customer.name}</h2>
                  <p className="muted">
                    Phone: {customer.phone}
                  </p>
                </div>

                <span
                  className={
                    customer.totalDue > 0
                      ? "pill pill-pending"
                      : "pill pill-paid"
                  }
                >
                  {customer.totalDue > 0
                    ? "Due"
                    : "Clear"}
                </span>
              </div>

              <p className="amount">
                Rs.{customer.totalDue}
              </p>

              <div
                className="actions"
                style={{ marginTop: "18px" }}
              >
                {customer.totalDue > 0 && (
                  <button
                    onClick={() =>
                      sendReminder(customer)
                    }
                    className="btn btn-whatsapp"
                  >
                    Send WhatsApp Reminder
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteCustomer(customer.id)
                  }
                  className="btn btn-danger"
                >
                  Delete Customer
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Customers;
