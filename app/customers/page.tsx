"use client";

import { useState } from "react";
import CustomerTable from "../components/CustomerTable";
import CustomerModal from "../components/CustomerModal";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const handleAddCustomer = (customer: any) => {
    setCustomers([...customers, customer]); // later: API call
    setOpenModal(false);
  };

  const handleDelete = (id: number) => {
    setCustomers(customers.filter((c, i) => i !== id));
  };

  return (
    <div>
      <h1>Customers</h1>
      <button
        style={{ marginBottom: "10px" }}
        onClick={() => setOpenModal(true)}
      >
        + Add Customer
      </button>

      <CustomerTable customers={customers} onDelete={handleDelete} />

      {openModal && (
        <CustomerModal
          onClose={() => setOpenModal(false)}
          onSubmit={handleAddCustomer}
        />
      )}
    </div>
  );
}
