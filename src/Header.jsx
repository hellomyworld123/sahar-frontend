// src/components/Header.jsx
import React from "react";

export default function Header() {
  return (
    <header className="bg-noir text-gold py-6 px-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-3">
        <img src="/images/logo.png" alt="Sahâr logo" className="h-10 w-10 object-contain" />
        <span className="text-3xl font-bold font-serif tracking-tight" style={{ letterSpacing: "0.05em" }}>
          Sahar<span className="text-rose font-bold"> Nail Care</span>
        </span>
      </div>
      <nav className="flex space-x-8 text-lg font-medium">
        <a href="#services" className="hover:text-rose transition">Services</a>
        <a href="#booking" className="hover:text-rose transition">Réservation</a>
        <a href="#contact" className="hover:text-rose transition">Contact</a>
      </nav>
    </header>
  );
}
