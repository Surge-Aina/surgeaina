// src/components/Navbar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {  FaBars } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    (isActive
      ? "text-amber-400 font-medium"
      : "text-white hover:text-amber-300") + " transition";

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <div className="flex items-center gap-2">
          
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={linkClass} end>Home</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/services" className={linkClass} >Services</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-3 space-y-3">
            <NavLink to="/" className={linkClass} end onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>
              About
            </NavLink>
            <NavLink to="/services" className={linkClass} onClick={() => setOpen(false)}>
              Services
            </NavLink>
            <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>
              Contact
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
