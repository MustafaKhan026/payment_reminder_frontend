"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Customers", path: "/customers" },
  { label: "Invoices", path: "/invoices" },
  { label: "Reports", path: "/reports" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "230px",
        height: "100vh",
        background: "#111827",
        color: "#fff",
        padding: "20px",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <h2 style={{ marginBottom: "25px" }}>Payment Manager</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {navItems.map((item) => (
          <li key={item.path} style={{ margin: "14px 0" }}>
            <Link
              href={item.path}
              style={{
                color: pathname === item.path ? "#38BDF8" : "#E5E7EB",
                textDecoration: "none",
                fontWeight: pathname === item.path ? "bold" : "normal",
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
