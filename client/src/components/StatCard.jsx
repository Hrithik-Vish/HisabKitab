function StatCard({ title, value }) {
  return (
    <div
      style={{
        backgroundColor: "#1f1f1f",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        width: "220px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      }}
    >
      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}

export default StatCard;