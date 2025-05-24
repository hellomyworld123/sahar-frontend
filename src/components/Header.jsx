import React from "react";

export default function Header() {
  return (
    <header className="bg-noir text-gold py-4 px-4 flex justify-between items-center shadow-lg">
      <a href="/" className="flex items-center space-x-2">
        <img src="/images/logo.png" alt="Sahâr logo" className="h-10 w-10 object-contain" />
        <span className="sr-only">Sahâr Nail Care</span>
      </a>
      <nav className="flex space-x-6 text-base md:text-lg font-medium">
        <a href="#services" className="hover:text-rose transition">Services</a>
        <a href="#booking" className="hover:text-rose transition">Réservation</a>
        <a href="#contact" className="hover:text-rose transition">Contact</a>
      </nav>
    </header>
  );
}
