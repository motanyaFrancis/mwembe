"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  // Show button when user scrolls down 300px
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 cursor-pointer
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
        bg-primary-800 hover:bg-gold-500 text-white`}
      aria-label="Back to Top"
    >
      <ChevronUp size={24} />
    </button>
  );
}