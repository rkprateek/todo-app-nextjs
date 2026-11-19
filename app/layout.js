import "./globals.css";

export const metadata = {
  title: "Taskly — To-Do List",
  description: "A simple and beautiful task manager built with Next.js."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
