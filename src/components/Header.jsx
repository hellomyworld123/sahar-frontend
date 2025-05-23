import React from "react";

export default function Header() {
  return (
    <header className="bg-noir text-gold py-4 px-2 sm:py-6 sm:px-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-3">
        <img
          src="/images/logo.png"
          alt="Sahar Nail Care Logo"
          className="h-10 sm:h-12 md:h-16 w-auto object-contain"
          style={{
            background: "transparent",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
          }}
        />
      </div>
      <nav className="flex space-x-4 sm:space-x-8 text-base sm:text-lg font-medium">
        <a href="#services" className="hover:text-rose transition">Services</a>
        <a href="#booking" className="hover:text-rose transition">Réservation</a>
        <a href="#contact" className="hover:text-rose transition">Contact</a>
      </nav>
    </header>
  );
}
