import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

function Inventory() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("inventory");

    if (savedItems) {
      return JSON.parse(savedItems);
    }

    return [
      {
        id: 1,
        itemName: "Rice",
        quantity: 2,
        threshold: 5,
        unit: "kg",
      },
      {
        id: 2,
        itemName: "Oil",
        quantity: 10,
        threshold: 3,
        unit: "litre",
      },
      {
        id: 3,
        itemName: "Flour",
        quantity: 1,
        threshold: 4,
        unit: "kg",
      },
    ];
  });

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [threshold, setThreshold] = useState("");
  const [unit, setUnit] = useState("");
  const [restockSuggestions, setRestockSuggestions] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(
      "inventory",
      JSON.stringify(items)
    );
  }, [items]);

  const addItem = () => {
    if (
      !itemName ||
      !quantity ||
      !threshold ||
      !unit
    ) {
      alert("Please fill all fields");
      return;
    }

    const newItem = {
      id: Date.now(),
      itemName,
      quantity: Number(quantity),
      threshold: Number(threshold),
      unit,
    };

    setItems([...items, newItem]);

    setItemName("");
    setQuantity("");
    setThreshold("");
    setUnit("");
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter(
      (item) => item.id !== id
    );

    setItems(updatedItems);
  };

  const getRestockSuggestions = async () => {
    setAiLoading(true);
    setAiError("");

    try {
      const response = await API.post("/ai/restock", {
        inventory: items.map((item) => ({
          itemName: item.itemName,
          quantity: item.quantity,
          threshold: item.threshold,
          unit: item.unit,
        })),
      });

      setRestockSuggestions(
        response.data.suggestions || []
      );
    } catch (error) {
      console.log(
        "AI restock error:",
        error.response?.data || error.message
      );
      setAiError(
        "Could not get AI suggestions. Check that the server is running and GEMINI_API_KEY is set."
      );
    } finally {
      setAiLoading(false);
    }
  };

  const lowStockItems = items.filter(
    (item) => item.quantity <= item.threshold
  );

  const filteredItems = items.filter((item) => {
    const isLowStock = item.quantity <= item.threshold;
    const matchesSearch = item.itemName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStock =
      stockFilter === "All" ||
      (stockFilter === "Low" && isLowStock) ||
      (stockFilter === "Healthy" && !isLowStock);

    return matchesSearch && matchesStock;
  });

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="page">
        <header className="page-header">
          <div>
            <p className="eyebrow">Stock control</p>
            <h1 className="page-title">Inventory</h1>
            <p className="page-subtitle">
              Track stock health and ask Gemini for practical
              restock suggestions before you run out.
            </p>
          </div>

          <div className="hero-metric">
            <span>Low stock items</span>
            <strong>{lowStockItems.length}</strong>
          </div>
        </header>

        <section className="panel form-panel">
          <input
            className="input"
            type="text"
            placeholder="Item name"
            value={itemName}
            onChange={(e) =>
              setItemName(e.target.value)
            }
          />

          <input
            className="input"
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
          />

          <input
            className="input"
            type="number"
            placeholder="Threshold"
            value={threshold}
            onChange={(e) =>
              setThreshold(e.target.value)
            }
          />

          <input
            className="input"
            type="text"
            placeholder="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />

          <button
            onClick={addItem}
            className="btn btn-primary"
          >
            Add Item
          </button>
        </section>

        <section className="toolbar">
          <input
            className="input"
            type="text"
            placeholder="Search inventory"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="segmented">
            {["All", "Low", "Healthy"].map((filter) => (
              <button
                key={filter}
                className={
                  stockFilter === filter
                    ? "segment active"
                    : "segment"
                }
                onClick={() => setStockFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="grid content-grid">
          <div className="cards-list">
            {filteredItems.length === 0 && (
              <div className="empty-state">
                No inventory items match your search or filter.
              </div>
            )}

            {filteredItems.map((item) => {
              const lowStock =
                item.quantity <= item.threshold;
              const stockRatio =
                item.threshold === 0
                  ? 100
                  : Math.min(
                      100,
                      Math.round(
                        (item.quantity / item.threshold) *
                          100
                      )
                    );

              return (
                <article
                  key={item.id}
                  className="card"
                >
                  <div className="card-head">
                    <div>
                      <h2>{item.itemName}</h2>
                      <p className="muted">
                        Threshold: {item.threshold}{" "}
                        {item.unit}
                      </p>
                    </div>

                    <span
                      className={
                        lowStock
                          ? "pill pill-low"
                          : "pill pill-healthy"
                      }
                    >
                      {lowStock
                        ? "Low Stock"
                        : "Healthy"}
                    </span>
                  </div>

                  <p className="amount">
                    {item.quantity} {item.unit}
                  </p>

                  <div
                    className="progress-track"
                    style={{ marginTop: "14px" }}
                  >
                    <div
                      className="progress-fill"
                      style={{
                        width: `${stockRatio}%`,
                        background: lowStock
                          ? "#f5c84c"
                          : undefined,
                      }}
                    />
                  </div>

                  <div
                    className="actions"
                    style={{ marginTop: "18px" }}
                  >
                    <button
                      onClick={() =>
                        deleteItem(item.id)
                      }
                      className="btn btn-danger"
                    >
                      Delete Item
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="panel ai-card">
            <div className="card-head">
              <div>
                <p className="eyebrow">Gemini AI</p>
                <h2 style={{ marginTop: "8px" }}>
                  Restock Suggestions
                </h2>
                <p className="muted">
                  Uses the backend /api/ai/restock route.
                </p>
              </div>
            </div>

            <button
              onClick={getRestockSuggestions}
              disabled={aiLoading || items.length === 0}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              {aiLoading
                ? "Asking AI..."
                : "Get AI Suggestions"}
            </button>

            <div
              className="grid"
              style={{ marginTop: "16px" }}
            >
              {aiError && (
                <div className="error-state">
                  {aiError}
                </div>
              )}

              {!aiError &&
                restockSuggestions.length === 0 && (
                  <div className="empty-state">
                    Click the button to generate specific restock
                    quantities and reasons from Gemini.
                  </div>
                )}

              {restockSuggestions.map(
                (suggestion, index) => (
                  <div
                    key={`${suggestion.item}-${index}`}
                    className="suggestion-card"
                  >
                    <strong>
                      {suggestion.item ||
                        "Inventory item"}
                    </strong>
                    <span className="muted">
                      Current:{" "}
                      {suggestion.currentQty ?? "N/A"}
                    </span>
                    <span>
                      Restock:{" "}
                      {suggestion.suggestedRestock ??
                        "N/A"}
                    </span>
                    <p className="muted">
                      {suggestion.reason}
                    </p>
                  </div>
                )
              )}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Inventory;
