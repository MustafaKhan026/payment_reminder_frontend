"use client";

import { useState } from "react";
import InvoiceTable from "../components/InvoiceTable";
import InvoiceModal from "../components/InvoiceModal";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const handleAddInvoice = (invoice: any) => {
    setInvoices([...invoices, invoice]); // later: push to backend
    setOpenModal(false);
  };

  const handleDelete = (index: number) => {
    setInvoices(invoices.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Invoices</h1>

      <button onClick={() => setOpenModal(true)} style={{ marginBottom: "10px" }}>
        + Add Invoice
      </button>

      <InvoiceTable invoices={invoices} onDelete={handleDelete} />

      {openModal && (
        <InvoiceModal
          onClose={() => setOpenModal(false)}
          onSubmit={handleAddInvoice}
        />
      )}
    </div>
  );
}
