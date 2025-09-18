import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";

import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import CareerPage from "./components/CareerPage";
import SolutionsPage from "./components/SolutionsPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/contact" element={<ContactPage />} /> 
      </Routes>
    </Router>
  );
}