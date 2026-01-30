import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">The Belmonts</h3>
            <p className="footer-text">
              A legacy forged in honor, bound by brotherhood, 
              and written in the annals of history.
            </p>
            <div className="footer-motto">
              <span className="motto-symbol">⚔</span>
              <span>Forged in Honor • Bound by Legacy</span>
              <span className="motto-symbol">⚔</span>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about">About the Kingdom</a></li>
              <li><a href="#members">Our Fellowship</a></li>
              <li><a href="#gallery">Chronicles Gallery</a></li>
              <li><a href="#timeline">Achievements</a></li>
              <li><Link to="/treasure">Royal Treasury</Link></li>
              <li><a href="#contact">Join Us</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Connect</h4>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Discord">
                <span className="social-icon">💬</span>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <span className="social-icon">🐦</span>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <span className="social-icon">📺</span>
              </a>
              <a href="#" className="social-link" aria-label="Twitch">
                <span className="social-icon">🎮</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-divider">
          <span className="divider-ornament">◈</span>
          <span className="divider-line"></span>
          <span className="divider-ornament">◈</span>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} The Belmonts Clan. All Rights Reserved.
          </p>
          <p className="footer-tagline">
            Est. 1147 • Centuries of Honor & Glory
          </p>
        </div>
      </div>
    </footer>
  );
}
