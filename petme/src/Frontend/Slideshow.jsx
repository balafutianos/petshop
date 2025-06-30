import React, { useState, useEffect } from "react";
import "./Slideshow.css";

const slides = [
  { src: "https://cdn.pixabay.com/photo/2019/11/07/08/40/puppy-4608266_1280.jpg", alt: "Slide 1"},
  { src: "https://cdn.pixabay.com/photo/2024/10/16/16/14/cat-9125207_1280.jpg", alt: "Slide 2"},
  { src: "https://cdn.pixabay.com/photo/2022/12/07/18/50/canary-7641743_1280.jpg", alt: "Slide 3" },
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
   <div className="slideshow">
  <div className="slide-content">
    <div className="slide-text">
      <h2>Καλώς Ήρθατε στο <span id="wordpet">PetME</span></h2>
      <p>Η καλύτερη φροντίδα για τα κατοικίδιά σας</p>
    </div>
    <img
      src={slides[currentIndex].src}
      alt={`Slide ${currentIndex + 1}`}
      className="slide-image"
    />
  </div>

  <div className="dots">
    {slides.map((_, idx) => (
      <span
        key={idx}
        className={`dot ${idx === currentIndex ? "active" : ""}`}
        onClick={() => goToSlide(idx)}
      ></span>
    ))}
  </div>
</div>

  );
};

export default Slideshow;
