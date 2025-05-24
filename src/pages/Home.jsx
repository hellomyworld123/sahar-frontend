import React from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import BookingForm from "../components/BookingForm";
import { FaPaintBrush, FaHandSparkles, FaSpa, FaGem, FaRegSmile } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-noir min-h-screen font-sans">
      <Header />

      {/* Hero mobile‑first */}
      <div className="relative h-[70vh] md:h-[90vh] overflow-hidden">
        <img src="/images/hero-mobile.jpg" loading="lazy" alt="Hero" className="block md:hidden absolute inset-0 w-full h-full object-cover" />
        <video
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-noir/60 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-gold drop-shadow-xl">Sahâr Nail Care</h1>
          <p className="mt-3 text-lg sm:text-2xl text-rose">L'art de sublimer vos mains.</p>
          <a href="#booking" className="mt-6 bg-gold text-noir py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:bg-rose transition">Réservez maintenant</a>
        </div>
      </div>

      {/* Services */}
      <section id="services" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gold text-center mb-8">Nos Prestations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <ServiceCard icon={<FaHandSparkles />} title="Manucure" description="Soins et mise en beauté des mains." />
          <ServiceCard icon={<FaSpa />} title="Pédicure" description="Beauté et bien‑être des pieds." />
          <ServiceCard icon={<FaPaintBrush />} title="Nail Art" description="Décoration créative personnalisée." />
          <ServiceCard icon={<FaGem />} title="Gel" description="Ongles en gel, tenue longue durée." />
          <ServiceCard icon={<FaRegSmile />} title="Soin des mains" description="Hydratation & douceur absolue." />
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gold text-center mb-8">Prendre rendez‑vous</h2>
        <BookingForm />
      </section>

      {/* FOOTER */}
      <footer className="bg-noir border-t border-gold py-8 text-center">
        <p className="text-gold">© Sahâr Nail Care – Tous droits réservés</p>
      </footer>
    </div>
  );
}
