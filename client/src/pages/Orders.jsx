import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Orders() {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");

    if (savedOrders) {
      return JSON.parse(savedOrders);
    }

    return [
      {
        id: 1,
        customer: "Rahul Sharma",
        amount: 500,
        status: "Pending",
      },
      {
        id: 2,
        customer: "Priya Verma",
        amount: 1200,
        status: "Paid",
      },
      {
        id: 3,
        customer: "Amit Joshi",
        amount: 800,
        status: "Pending",
      },
    ];
  });

  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  const addOrder = () => {
    if (!customer || !amount) {
      alert("Please fill all fields");
      return;
    }

    const newOrder = {
      id: Date.now(),
      customer,
      amount: Number(amount),
      status: "Pending",
    };

    setOrders([...orders, newOrder]);

    setCustomer("");
    setAmount("");
  };

  const markAsPaid = (id) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === id) {
        return {
          ...order,
          status: "Paid",
        };
      }

      return order;
    });

    setOrders(updatedOrders);
  };

  const deleteOrder = (id) => {
    const filteredOrders = orders.filter(
      (order) => order.id !== id
    );

    setOrders(filteredOrders);
  };

  const pendingTotal = orders
    .filter((order) => order.status !== "Paid")
    .reduce((total, order) => total + order.amount, 0);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customer
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="page">
        <header className="page-header">
          <div>
            <p className="eyebrow">Sales tracker</p>
            <h1 className="page-title">Orders</h1>
            <p className="page-subtitle">
              Add customer orders, settle payments and keep the
              pending amount visible for quick action.
            </p>
          </div>

          <div className="hero-metric">
            <span>Pending collection</span>
            <strong>Rs.{pendingTotal}</strong>
          </div>
        </header>

        <section className="panel form-panel">
          <input
            className="input"
            type="text"
            placeholder="Customer name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />

          <input
            className="input"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={addOrder}
            className="btn btn-primary"
          >
            Add Order
          </button>
        </section>

        <section className="toolbar">
          <input
            className="input"
            type="text"
            placeholder="Search orders"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="segmented">
            {["All", "Pending", "Paid"].map((status) => (
              <button
                key={status}
                className={
                  statusFilter === status
                    ? "segment active"
                    : "segment"
                }
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </section>

        {filteredOrders.length === 0 && (
          <div className="empty-state">
            No orders match your search or filter.
          </div>
        )}

        <section className="cards-list">
          {filteredOrders.map((order) => (
            <article
              key={order.id}
              className="card"
            >
              <div className="card-head">
                <div>
                  <h2>{order.customer}</h2>
                  <p className="muted">Order #{order.id}</p>
                </div>

                <span
                  className={
                    order.status === "Paid"
                      ? "pill pill-paid"
                      : "pill pill-pending"
                  }
                >
                  {order.status}
                </span>
              </div>

              <p className="amount">Rs.{order.amount}</p>

              <div
                className="actions"
                style={{ marginTop: "18px" }}
              >
                {order.status !== "Paid" && (
                  <button
                    onClick={() =>
                      markAsPaid(order.id)
                    }
                    className="btn btn-green"
                  >
                    Mark as Paid
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteOrder(order.id)
                  }
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Orders;
