import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import legendsData from '../data/legends.json';
import '../styles/Legends.css';

gsap.registerPlugin(ScrollTrigger);

export default function Legends() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.legend-warrior-card', {
        scrollTrigger: {
          trigger: '.legends-warriors-grid',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="legends-page">
      <button onClick={handleBackToHome} className="back-button-header">
        ← Back to Home
      </button>

      <div className="legends-container">
        <div className="legends-header">
          <h1 className="legends-title">
            <span className="title-accent">◈━━</span>
            Hall of Legends
            <span className="title-accent">━━◈</span>
          </h1>
          <p className="legends-subtitle">
            Former Warriors of the Belmonts Clan - Their Legacy Lives On
          </p>
          <div className="header-ornament">
            <span className="ornament">◈</span>
            <span className="ornament-line">━━━━━━━━━━━</span>
            <span className="ornament">◈</span>
          </div>
        </div>

        <div className="legends-warriors-grid">
          {legendsData.map((legend) => (
            <div key={legend.id} className="legend-warrior-card">
              <div className="warrior-card-header">
                <div className="warrior-crest-icon">⚔</div>
                <h2 className="warrior-name">{legend.name}</h2>
                <div className="warrior-divider">
                  <span>◈</span>
                  <div className="divider-line"></div>
                  <span>◈</span>
                </div>
              </div>

              <div className="warrior-content">
                <div className="warrior-role-section">
                  <span className="role-label">Former Role</span>
                  <span className="role-badge">{legend.formerRole}</span>
                </div>

                <div className="warrior-years-section">
                  <span className="years-label">Years of Service</span>
                  <span className="years-value">{legend.yearActive}</span>
                </div>

                <div className="warrior-divider-simple"></div>

                <div className="warrior-description-section">
                  <h3 className="description-title">Legacy & Contributions</h3>
                  <p className="warrior-description">{legend.description}</p>
                </div>

                <div className="warrior-honor-badge">
                  <span className="honor-icon">🏆</span>
                  <span className="honor-text">Legendary Warrior</span>
                </div>
              </div>

              <div className="warrior-card-footer">
                <div className="footer-ornament">
                  <span>◈</span>
                  <span className="footer-line">━━━</span>
                  <span>◈</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="legends-footer">
          <div className="footer-ornament-large">◈ ━━━━━ ◈ ━━━━━ ◈</div>
          <p className="footer-text">
            Though they walk among us no more, their spirit remains eternal in the brotherhood
          </p>
          <p className="footer-subtext">Forever remembered, forever honored</p>
        </div>
      </div>
    </div>
  );
}
