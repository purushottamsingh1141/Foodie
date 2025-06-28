import React, { useEffect, useState } from "react";
import "./ImageCarousel.css";

import img1 from "./image/1.jpg";
import img2 from "./image/2.jpg";
import img3 from "./image/3.jpg";
import img4 from "./image/4.jpg";
import img5 from "./image/5.jpg";

const images = [img1, img2, img3, img4, img5];

const ImageCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3 seconds

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  return (
    <div className="carousel">
      <img
        src={images[current]}
        alt={`slide-${current}`}
        className="carousel-image"
      />
      <div className="indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === current ? "dot active" : "dot"}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
