import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Courses from "./components/Courses";
import Consultancy from "./components/Consultancy";
import Contact from "./components/Contact";
import Chatbot from "./components/Chatbot";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div>
        <nav style={{
          background: "#1e293b",
          padding: "15px",
          display: "flex",
          gap: "20px"
    
        }}>
         <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
         <Link to="/courses" style={{ color: "white", textDecoration: "none" }}>Courses</Link>
         <Link to="/consultancy" style={{ color: "white", textDecoration: "none" }}>Consultancy</Link>
         <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link>
      </nav>

        <h1 style={{ textAlign: "center" }}>Tech Training & Consultancy</h1>

        

        <Routes>
          <Route path="/courses" element={<Courses />} />
          <Route path="/consultancy" element={<Consultancy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Home />} />
        </Routes>

        <Chatbot />
      </div>
    </Router>
  );
}

export default App;