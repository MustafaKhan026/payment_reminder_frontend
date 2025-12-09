"use client";

export default function CustomerTable({ customers, onDelete }: any) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "10px",
      }}
    >
      <thead>
        <tr>
          <th style={th}>#</th>
          <th style={th}>Name</th>
          <th style={th}>Email</th>
          <th style={th}>Phone</th>
          <th style={th}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {customers.length === 0 && (
          <tr>
            <td colSpan={5} style={tdCenter}>
              No customers found
            </td>
          </tr>
        )}

        {customers.map((c: any, i: number) => (
          <tr key={i}>
            <td style={td}>{i + 1}</td>
            <td style={td}>{c.name}</td>
            <td style={td}>{c.email}</td>
            <td style={td}>{c.phone}</td>
            <td style={td}>
              <button
                style={{ color: "red" }}
                onClick={() => onDelete(i)}
              >
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
