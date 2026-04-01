import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";

// We will create these pages next
import Home from "./pages/Home";
import Eligibility from "./pages/Eligibility";
import Results from "./pages/Results";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/eligibility" element={<Eligibility />} />
              <Route path="/results" element={<Results />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <ChatBot />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
