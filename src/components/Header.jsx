import React from "react";

export default function Header() {
  return (
    <header className="bg-noir text-gold py-4 px-4 flex justify-center items-center shadow-lg">
      <a href="/" className="flex items-center">
        <img src="/images/logo.png" alt="Sahâr logo" className="h-10 w-10 object-contain" />
        <span className="sr-only">Sahâr Nail Care</span>
      </a>
    </header>
  );
}
