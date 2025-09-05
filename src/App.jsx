import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

export default function App() {
  const loc = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <nav className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-blue-600 hover:text-blue-700 transition"
          >
            Quiz App
          </Link>
          <div className="text-sm font-medium text-gray-500 px-3 py-1 rounded bg-gray-100">
            {loc.pathname === "/" ? "Home" : loc.pathname.replace("/", "")}
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 mx-auto w-full max-w-4xl p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-white/70 backdrop-blur py-6">
        <div className="mx-auto max-w-4xl px-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-blue-600">Quiz App</span>. Built
          with <span className="font-medium">React + Vite + TailwindCSS</span>.
        </div>
      </footer>
    </div>
  );
}
