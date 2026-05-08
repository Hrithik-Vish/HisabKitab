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

  // SAVE TO LOCAL STORAGE

  useEffect(() => {
    localStorage.setItem(
      "inventory",
      JSON.stringify(items)
    );
  }, [items]);

  // ADD ITEM

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

  // DELETE ITEM

  const deleteItem = (id) => {
    const updatedItems = items.filter(
      (item) => item.id !== id
    );

    setItems(updatedItems);
  };

  // AI RESTOCK SUGGESTIONS

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
          Inventory
        </h1>

        {/* ADD INVENTORY FORM */}

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
            placeholder="Item Name"
            value={itemName}
            onChange={(e) =>
              setItemName(e.target.value)
            }
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              width: "180px",
            }}
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              width: "140px",
            }}
          />

          <input
            type="number"
            placeholder="Threshold"
            value={threshold}
            onChange={(e) =>
              setThreshold(e.target.value)
            }
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              width: "140px",
            }}
          />

          <input
            type="text"
            placeholder="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              width: "120px",
            }}
          />

          <button
            onClick={addItem}
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
            Add Item
          </button>
        </div>

        {/* INVENTORY LIST */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {items.map((item) => {
            const lowStock =
              item.quantity <= item.threshold;

            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#161b22",
                  border: lowStock
                    ? "2px solid red"
                    : "1px solid #30363d",
                  padding: "25px",
                  borderRadius: "12px",
                }}
              >
                <h2>{item.itemName}</h2>

                <p>
                  Quantity: {item.quantity}{" "}
                  {item.unit}
                </p>

                <p>
                  Threshold: {item.threshold}{" "}
                  {item.unit}
                </p>

                <p
                  style={{
                    color: lowStock
                      ? "#ff4d4d"
                      : "lightgreen",
                    fontWeight: "bold",
                  }}
                >
                  {lowStock
                    ? "Low Stock Alert"
                    : "Stock Healthy"}
                </p>

                <button
                  onClick={() =>
                    deleteItem(item.id)
                  }
                  style={{
                    marginTop: "15px",
                    padding: "10px 18px",
                    backgroundColor: "crimson",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Delete Item
                </button>
              </div>
            );
          })}
        </div>

        {/* AI INVENTORY INSIGHTS */}

        <div
          style={{
            marginTop: "50px",
            backgroundColor: "#161b22",
            border: "1px solid #30363d",
            borderRadius: "12px",
            padding: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                color: "#58a6ff",
              }}
            >
              AI Restock Suggestions
            </h2>

            <button
              onClick={getRestockSuggestions}
              disabled={aiLoading || items.length === 0}
              style={{
                padding: "10px 18px",
                backgroundColor:
                  aiLoading || items.length === 0
                    ? "#30363d"
                    : "#238636",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor:
                  aiLoading || items.length === 0
                    ? "not-allowed"
                    : "pointer",
                fontWeight: "bold",
              }}
            >
              {aiLoading
                ? "Asking AI..."
                : "Get AI Suggestions"}
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {aiError && (
              <div
                style={{
                  backgroundColor: "#2d1117",
                  color: "#ffb3b3",
                  padding: "15px",
                  borderRadius: "10px",
                  border: "1px solid #8b2635",
                }}
              >
                {aiError}
              </div>
            )}

            {!aiError &&
              restockSuggestions.length === 0 && (
                <div
                  style={{
                    backgroundColor: "#0d1117",
                    padding: "15px",
                    borderRadius: "10px",
                    border: "1px solid #30363d",
                  }}
                >
                  Click the button to ask Gemini for
                  restock advice based on your current
                  inventory.
                </div>
              )}

            {restockSuggestions.map(
              (suggestion, index) => (
                <div
                  key={`${suggestion.item}-${index}`}
                  style={{
                    backgroundColor: "#0d1117",
                    padding: "15px",
                    borderRadius: "10px",
                    border: "1px solid #30363d",
                  }}
                >
                  <strong>
                    {suggestion.item ||
                      "Inventory item"}
                  </strong>

                  <p style={{ marginTop: "8px" }}>
                    Current quantity:{" "}
                    {suggestion.currentQty ?? "N/A"}
                  </p>

                  <p>
                    Suggested restock:{" "}
                    {suggestion.suggestedRestock ??
                      "N/A"}
                  </p>

                  <p
                    style={{
                      color: "#c9d1d9",
                      marginTop: "8px",
                    }}
                  >
                    {suggestion.reason}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
