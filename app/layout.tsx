import Sidebar from "./components/Sidebar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Sidebar />
        <main style={{ marginLeft: "250px", padding: "20px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
