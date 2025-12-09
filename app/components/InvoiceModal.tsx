"use client";

import { useState } from "react";

export default function InvoiceModal({ onClose, onSubmit }: any) {
  const [form, setForm] = useState({
    customer: "",
    amount: "",
    dueDate: "",
    status: "Pending",
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => onSubmit(form);

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h3>Add Invoice</h3>

        <input
          name="customer"
          placeholder="Customer Name"
          value={form.customer}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Save</button>
        <button style={{ marginLeft: "10px" }} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};
