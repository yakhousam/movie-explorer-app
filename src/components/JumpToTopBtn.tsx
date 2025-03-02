import { useEffect, useState } from "react";

export const JumpToTopBtn = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide jump to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    showScrollTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 transform hover:scale-110"
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    )
  );
};
