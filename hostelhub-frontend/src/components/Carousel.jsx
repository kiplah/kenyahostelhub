import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const goToNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const goToPrev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (i) => setIndex(i);

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [index]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) goToNext();
    else if (distance < -50) goToPrev();
  };

  if (!slides.length) return null;

  const { title, subtitle, image, cta } = slides[index];

  return (
    <section
      className="relative h-[80vh] md:h-[95vh] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover brightness-75 transition-opacity duration-700"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
        <p className="mt-2 text-lg md:text-2xl">{subtitle}</p>
        {cta && (
          <Link
            to={cta.link}
            className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold"
          >
            {cta.label}
          </Link>
        )}
      </div>

      {/* Arrows */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white scale-110" : "bg-white/50"
            } transition-all`}
          />
        ))}
      </div>
    </section>
  );
}
