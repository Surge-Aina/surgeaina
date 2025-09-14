import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
         <Route path="/contact" element={<ContactPage />} /> 
      </Routes>
    </Router>
  );
}