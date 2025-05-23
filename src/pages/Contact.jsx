import React from "react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Vidéo de fond */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        src="/videos/hero.mp4"
        type="video/mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-noir bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
        <img
          src="/images/logo.png"
          alt="Sahar Nail Care Logo"
          className="h-24 mb-8"
          style={{ background: "transparent" }}
        />
        <h1 className="text-4xl font-bold text-gold mb-6">Contactez-nous sur les réseaux sociaux</h1>
        <div className="flex space-x-8 justify-center">
          <a
            href="https://www.instagram.com/sahar.nail.care/#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-rose text-5xl transition"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-rose text-5xl transition"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-rose text-5xl transition"
            aria-label="TikTok"
          >
            <FaTiktok />
          </a>
        </div>
      </div>
    </div>
  );
} 