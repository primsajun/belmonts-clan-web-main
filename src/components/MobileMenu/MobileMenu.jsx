import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MobileMenu.css';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 1, name: 'Kingdom', icon: 'crown', locked: false, href: '#hero' },
    { id: 2, name: 'Journey', icon: 'key', locked: false, href: '#timeline' },
    { id: 3, name: 'Legacy', icon: 'key', locked: false, href: '#members' },
    { id: 4, name: 'Legends', icon: 'lock', locked: false, href: '#' },
    { id: 5, name: 'Treasure', icon: 'lock', locked: false, href: '#' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (href, locked, itemName) => {
    if (locked) return;
    
    // Special handling for Legends - navigate to Legends page
    if (itemName === 'Legends') {
      setIsOpen(false);
      navigate('/legends');
      return;
    }
    
    // Special handling for Treasure - navigate to Treasure page
    if (itemName === 'Treasure') {
      setIsOpen(false);
      navigate('/treasure');
      return;
    }
    
    setIsOpen(false);
    
    // Smooth scroll to section
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Hamburger Button - Right Corner */}
      <button 
        className={`hamburger-btn ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay */}
      <div 
        className={`menu-overlay ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      />

      {/* Side Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h2 className="menu-title">贝尔蒙特战场</h2>
          <div className="menu-subtitle">Belmont's Realm</div>
        </div>

        <nav className="menu-items">
          {menuItems.map((item, index) => (
            <div 
              key={item.id}
              className={`menu-item ${item.locked ? 'locked' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleNavigation(item.href, item.locked, item.name)}
            >
              <div className="menu-item-content">
                <div className="icon-circle">
                  {item.icon === 'crown' && (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" fill="currentColor"/>
                    </svg>
                  )}
                  {item.icon === 'key' && (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 14C5.9 14 5 13.1 5 12C5 10.9 5.9 10 7 10C8.1 10 9 10.9 9 12C9 13.1 8.1 14 7 14ZM12.6 10C11.8 7.7 9.6 6 7 6C3.7 6 1 8.7 1 12C1 15.3 3.7 18 7 18C9.6 18 11.8 16.3 12.6 14H16V18H20V14H23V10H12.6Z" fill="currentColor"/>
                    </svg>
                  )}
                  {item.icon === 'lock' && (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" fill="currentColor"/>
                    </svg>
                  )}
                  <div className="icon-glow"></div>
                  {!item.locked && <div className="sparkle sparkle-1"></div>}
                  {!item.locked && <div className="sparkle sparkle-2"></div>}
                  {!item.locked && <div className="sparkle sparkle-3"></div>}
                </div>
                <span className="menu-item-text">{item.name}</span>
              </div>
              <div className="item-glow"></div>
            </div>
          ))}
        </nav>

        <div className="menu-footer">
          <div className="decorative-line"></div>
          <div className="footer-text">Est. MMXXIV</div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
