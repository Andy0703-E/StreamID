import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  const current = items[currentIndex];

  if (!items || items.length === 0) return null;

  return (
    <div className="carousel">
      <div className="carousel-inner shadow-2xl">
        <div className="carousel-content">
          <span className="featured-badge">Featured</span>
          <h2 className="featured-title">{current.name}</h2>
          <p className="featured-desc">{current.group} Channel - HD Streaming Available</p>
          <a href={`/channel/${current.id}`} className="play-btn">
            <Play size={20} fill="currentColor" />
            Tonton Sekarang
          </a>
        </div>

        <div className="carousel-image-container">
          <img
            src="/logo.png"
            alt={current.name}
            className="carousel-img"
            style={{ objectFit: 'contain', padding: '4rem' }}
          />
          <div className="carousel-gradient"></div>
        </div>

        <div className="carousel-dots">
          {items.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            ></button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .carousel {
          margin-bottom: 3rem;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          background: #1a1d23;
          height: 380px;
        }

        .carousel-inner {
          height: 100%;
          display: flex;
          align-items: center;
          position: relative;
        }

        .carousel-content {
          flex: 1;
          padding: 3rem;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 50%;
        }

        .featured-badge {
          font-size: 0.875rem;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .featured-title {
          font-family: 'Outfit', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          color: white;
          line-height: 1.1;
        }

        .featured-desc {
          font-size: 1.125rem;
          color: #94a3b8;
          max-width: 400px;
        }

        .play-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(to right, #e11d48, #fb7185);
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 700;
          text-decoration: none;
          width: fit-content;
          transition: all 0.2s ease;
          box-shadow: 0 4px 20px rgba(225, 29, 72, 0.4);
        }

        .play-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .carousel-image-container {
          position: absolute;
          right: 0;
          top: 0;
          width: 60%;
          height: 100%;
        }

        .carousel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0.6;
          filter: blur(5px);
          mask-image: linear-gradient(to left, black 60%, transparent);
        }

        /* Improved image look for logos */
        .carousel-img {
          object-fit: contain;
          padding: 4rem;
          filter: drop-shadow(0 0 50px rgba(255,255,255,0.1));
          opacity: 0.8;
          blur: 0;
        }

        .carousel-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #1a1d23 0%, transparent 100%);
        }

        .carousel-dots {
          position: absolute;
          bottom: 2rem;
          left: 3rem;
          display: flex;
          gap: 0.75rem;
          z-index: 20;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          width: 24px;
          border-radius: 4px;
          background: #e11d48;
        }

        @media (max-width: 768px) {
          .carousel { height: auto; min-height: 400px; }
          .carousel-content { max-width: 100%; padding: 2rem; text-align: center; align-items: center; }
          .featured-title { font-size: 2rem; }
          .carousel-image-container { opacity: 0.3; width: 100%; }
          .carousel-dots { left: 50%; transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Carousel;
