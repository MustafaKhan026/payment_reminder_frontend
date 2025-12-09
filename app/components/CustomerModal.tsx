"use client";

import { useState } from "react";

export default function CustomerModal({ onClose, onSubmit }: any) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => onSubmit(form);

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h3>Add Customer</h3>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <div style={{ marginTop: "10px" }}>
          <button onClick={handleSubmit}>Save</button>
          <button style={{ marginLeft: "10px" }} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
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
