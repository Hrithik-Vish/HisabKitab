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

  // SAVE TO LOCAL STORAGE

  useEffect(() => {
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  // ADD ORDER

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

  // MARK AS PAID

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

  // DELETE ORDER

  const deleteOrder = (id) => {
    const filteredOrders = orders.filter(
      (order) => order.id !== id
    );

    setOrders(filteredOrders);
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
            marginBottom: "20px",
          }}
        >
          Orders
        </h1>

        <div
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Customer Name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            style={{
              padding: "12px",
              width: "220px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
            }}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              padding: "12px",
              width: "150px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
            }}
          />

          <button
            onClick={addOrder}
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
            Add Order
          </button>
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                backgroundColor: "#161b22",
                border: "1px solid #30363d",
                padding: "25px",
                borderRadius: "12px",
              }}
            >
              <h2>{order.customer}</h2>

              <p
                style={{
                  fontSize: "18px",
                }}
              >
                Amount: ₹{order.amount}
              </p>

              <p
                style={{
                  fontSize: "18px",
                  color:
                    order.status === "Paid"
                      ? "lightgreen"
                      : "#ffcc00",
                }}
              >
                Status: {order.status}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                {order.status !== "Paid" && (
                  <button
                    onClick={() =>
                      markAsPaid(order.id)
                    }
                    style={{
                      padding: "10px 18px",
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Mark as Paid
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteOrder(order.id)
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
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;