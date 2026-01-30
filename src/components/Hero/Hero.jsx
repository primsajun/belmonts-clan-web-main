import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import backgroundVideo from '../../assets/Sons_da_NaturezaMP4.mp4';
import './Hero.css';

export default function Hero() {
  const textRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current?.querySelector('.hero-title'), {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3,
      });

      gsap.from(textRef.current?.querySelector('.hero-motto'), {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.8,
      });

      gsap.from(buttonRef.current, {
        scale: 0.5,
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'back.out(1.5)',
        delay: 1.5,
      });

      gsap.to(buttonRef.current, {
        y: -8,
        duration: 2.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2.5,
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <video className="hero-background" autoPlay muted loop playsInline>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      
      <div className="hero-overlay">
        <div className="hero-content" ref={textRef}>
          <h1 className="hero-title">
            <span className="title-line">THE BELMONTS</span>
          </h1>
          <p className="hero-motto">
            <span className="motto-text">Forged in Honor • Bound by Legacy</span>
          </p>
        </div>

        <button className="hero-cta" onClick={scrollToContent} aria-label="Enter the Kingdom">
          <div className="cta-ornament cta-ornament-left">◈</div>
          <div className="cta-content">
            <span className="cta-runes">⚔ ━━━</span>
            <span className="cta-text">ENTER THE REALM</span>
            <span className="cta-runes">━━━ ⚔</span>
          </div>
          <div className="cta-ornament cta-ornament-right">◈</div>
          <div className="cta-glow"></div>
        </button>
      </div>
    </section>
  );
}

