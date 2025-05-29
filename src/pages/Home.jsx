import React from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import BookingForm from "../components/BookingForm";
import { FaPaintBrush, FaHandSparkles, FaSpa, FaGem, FaRegSmile } from "react-icons/fa";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenue chez Sahâr Nail Care</h1>
      <p className="text-lg">Votre destination pour des soins de beauté exceptionnels.</p>
    </div>
  );
}
