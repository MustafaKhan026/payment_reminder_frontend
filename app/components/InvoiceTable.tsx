"use client";

export default function InvoiceTable({ invoices, onDelete }: any) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={th}>#</th>
          <th style={th}>Customer</th>
          <th style={th}>Amount</th>
          <th style={th}>Due Date</th>
          <th style={th}>Status</th>
          <th style={th}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {invoices.length === 0 && (
          <tr>
            <td colSpan={6} style={tdCenter}>No invoices found</td>
          </tr>
        )}

        {invoices.map((inv: any, i: number) => (
          <tr key={i}>
            <td style={td}>{i + 1}</td>
            <td style={td}>{inv.customer}</td>
            <td style={td}>₹{inv.amount}</td>
            <td style={td}>{inv.dueDate}</td>
            <td style={{ ...td, color: inv.status === "Paid" ? "green" : "orange" }}>
              {inv.status}
            </td>
            <td style={td}>
              <button style={{ color: "red" }} onClick={() => onDelete(i)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th = { borderBottom: "1px solid #888", padding: "10px" };
const td = { padding: "10px" };
const tdCenter = { padding: "10px", textAlign: "center" };
