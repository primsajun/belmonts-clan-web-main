import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ArrowLeft, Crown, Sword, BookOpen, Trophy, Shield, Gem } from 'lucide-react';
import '../styles/Treasure.css';

gsap.registerPlugin(ScrollTrigger);

// Generate dust particles data outside component to avoid impure function during render
const generateDustParticles = () => {
  return [...Array(30)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    opacity: Math.random() * 0.6 + 0.2,
  }));
};

const dustParticlesData = generateDustParticles();

const treasureItems = [
  {
    id: 1,
    name: "Crown of Ancients",
    inscription: "Worn by the First King",
    story: "Forged in the fires of Mount Drakon by the legendary blacksmith Aldric the Wise. This crown has passed through seventeen generations of Belmont rulers, each adding their own gemstone to commemorate their greatest triumph. The central ruby is said to glow when danger approaches the kingdom.",
    icon: Crown
  },
  {
    id: 2,
    name: "Sword of Eternal Flame",
    inscription: "Blade That Never Dulls",
    story: "Discovered in the ruins of an ancient temple, this blade burns with an eternal flame that never consumes the metal. Legend tells of Sir Gareth using this sword to defend the kingdom against the Shadow Legion for forty days and nights without rest. The flame grows brighter in the presence of dark magic.",
    icon: Sword
  },
  {
    id: 3,
    name: "Tome of Forgotten Spells",
    inscription: "Knowledge of the Elders",
    story: "Written in a language older than time itself, this grimoire contains spells long forgotten by modern mages. Each page is made from dragon scale parchment, making it impervious to fire and water. Only those pure of heart can read its secrets without losing their sanity.",
    icon: BookOpen
  },
  {
    id: 4,
    name: "Chalice of Renewal",
    inscription: "Vessel of Life Eternal",
    story: "Carved from a single moonstone found at the peak of the Silver Mountains. Water poured into this chalice gains healing properties capable of curing any ailment. The elven queen Sylvara gifted this to the Belmonts as a token of eternal alliance after the Great Unification.",
    icon: Trophy
  },
  {
    id: 5,
    name: "Shield of Valor",
    inscription: "Defender of the Realm",
    story: "This shield has never been pierced in battle. Forged from the metal of a fallen star and blessed by the high priestess, it bears the marks of a thousand battles. The intricate engravings tell the story of every warrior who has wielded it in defense of the kingdom.",
    icon: Shield
  },
  {
    id: 6,
    name: "Amulet of Whispers",
    inscription: "Speaks Truth to Power",
    story: "This mystical amulet allows its wearer to hear the whispers of the wind, warning of approaching storms, betrayals, and distant threats. Created by the oracle Meridian, it has saved the kingdom from ruin countless times by revealing hidden truths when they were needed most.",
    icon: Gem
  }
];

export default function Treasure() {
  const navigate = useNavigate();
  const [selectedTreasure, setSelectedTreasure] = useState(null);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const vaultRef = useRef();
  const doorLeftRef = useRef();
  const doorRightRef = useRef();
  const treasuresRef = useRef();
  const lightRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - doors closed
      gsap.set([doorLeftRef.current, doorRightRef.current], {
        x: 0,
        rotationY: 0
      });
      
      gsap.set('.treasures-container', {
        opacity: 0
      });

      // Auto-open doors after a delay
      const doorTimeline = gsap.timeline({
        delay: 1,
        onComplete: () => setIsVaultOpen(true)
      });

      // Door opens
      doorTimeline.to(doorLeftRef.current, {
        x: '-100%',
        duration: 2,
        ease: 'power2.inOut',
      }, 0);

      doorTimeline.to(doorRightRef.current, {
        x: '100%',
        duration: 2,
        ease: 'power2.inOut',
      }, 0);

      // Golden light spills out
      doorTimeline.to(lightRef.current, {
        opacity: 1,
        scale: 1.5,
        duration: 1.5,
        ease: 'power2.out',
      }, 0.5);

      // Treasures fade in
      doorTimeline.to('.treasures-container', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, 1.5);
      
      doorTimeline.from('.treasure-item', {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.2)',
      }, 1.8);

      // Dust particles animation
      gsap.to('.dust-particle', {
        y: -200,
        opacity: 0,
        duration: 3,
        repeat: -1,
        stagger: {
          each: 0.1,
          repeat: -1,
        },
        ease: 'none',
      });

    });

    return () => ctx.revert();
  }, []);

  const handleTreasureClick = (treasure) => {
    setSelectedTreasure(treasure);
  };

  const closeModal = () => {
    setSelectedTreasure(null);
  };

  return (
    <div className="treasure-page">
      {/* Header */}
      <header className="treasure-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
          <span>Return to Kingdom</span>
        </button>
        <h1 className="treasure-title">Royal Treasury Vault</h1>
      </header>

      {/* Vault Section */}
      <section className="vault-section" ref={vaultRef}>
        {/* Background */}
        <div className="vault-background">
          <div className="stone-wall"></div>
          <div className="vault-shadows"></div>
        </div>

        {/* Vault Door */}
        <div className="vault-door">
          <div className="door-frame">
            <div className="door-panel door-left" ref={doorLeftRef}>
              <div className="door-detail">
                <div className="door-lock">
                  <div className="lock-center">⚜</div>
                </div>
                <div className="door-rivets">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="rivet"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="door-panel door-right" ref={doorRightRef}>
              <div className="door-detail">
                <div className="door-lock">
                  <div className="lock-center">⚜</div>
                </div>
                <div className="door-rivets">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="rivet"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Golden Light */}
        <div className="golden-light" ref={lightRef}></div>

        {/* Floating Dust Particles */}
        <div className="dust-particles">
          {dustParticlesData.map((particle) => (
            <div
              key={particle.id}
              className="dust-particle"
              style={{
                left: particle.left,
                animationDelay: particle.animationDelay,
                opacity: particle.opacity,
              }}
            ></div>
          ))}
        </div>

        {/* Treasures */}
        <div className="treasures-container" ref={treasuresRef}>
          <div className="treasures-grid">
            {treasureItems.map((treasure) => (
              <div
                key={treasure.id}
                className="treasure-item"
                onClick={() => handleTreasureClick(treasure)}
              >
                <div className="treasure-pedestal">
                  <div className="pedestal-top"></div>
                  <div className="pedestal-column"></div>
                  <div className="pedestal-base"></div>
                </div>
                <div className="treasure-icon-wrapper">
                  <div className="treasure-icon">
                    <treasure.icon size={48} strokeWidth={1.5} />
                  </div>
                  <div className="treasure-glow"></div>
                </div>
                <div className="treasure-inscription">
                  <p className="treasure-name">{treasure.name}</p>
                  <p className="treasure-subtitle">{treasure.inscription}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        {!isVaultOpen && (
          <div className="scroll-indicator">
            <p>Scroll to open the vault</p>
            <div className="scroll-arrow">↓</div>
          </div>
        )}
      </section>

      {/* Story Modal */}
      {selectedTreasure && (
        <div className="story-modal-overlay" onClick={closeModal}>
          <div className="story-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              <X size={24} />
            </button>
            
            <div className="story-parchment">
              <div className="parchment-edge top"></div>
              
              <div className="story-content">
                <div className="story-icon">
                  <selectedTreasure.icon size={64} strokeWidth={1.5} />
                </div>
                <h2 className="story-title">{selectedTreasure.name}</h2>
                <div className="story-divider">✦ ✦ ✦</div>
                <p className="story-inscription">{selectedTreasure.inscription}</p>
                <div className="story-text">{selectedTreasure.story}</div>
              </div>
              
              <div className="parchment-edge bottom"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
