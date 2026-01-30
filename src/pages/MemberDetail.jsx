import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, Shield, Scroll, Globe } from 'lucide-react';
import membersData from '../data/members.json';
import leadersData from '../data/leaders.json';
import '../styles/MemberDetail.css';

// Import member images
import adhiImage from '../assets/members image/adhi.jpeg';
import amruthaImage from '../assets/members image/amrutha.jpeg';
import andreaImage from '../assets/members image/andrea.jpeg';
import ancyImage from '../assets/members image/ancy.jpeg';
import jeshwinImage from '../assets/members image/jeshwin.jpeg';
import maxwellImage from '../assets/members image/maxwell.jpeg';
import michalImage from '../assets/members image/michal.jpeg';
import primImage from '../assets/members image/prim.jpeg';
import samuelImage from '../assets/members image/samuel.jpeg';
import sowmiyaImage from '../assets/members image/sowmiya.jpeg';
import geoImage from '../assets/members image/geo.jpeg';
import harshiniImage from '../assets/members image/harshini.jpeg';

const memberImageMap = {
  'Aadhithya Mahesh': adhiImage,
  'Amrutha': amruthaImage,
  'Andrea Betrina': andreaImage,
  'Ancy': ancyImage,
  'Jeshwin Antony': jeshwinImage,
  'Maxwell Rubert': maxwellImage,
  'Michal Nithesh': michalImage,
  'Prim Sajun': primImage,
  'Samuel Morris': samuelImage,
  'Sowmiya': sowmiyaImage,
};

const leaderImageMap = {
  'Geo Nithin': geoImage,
  'Sriharshini': harshiniImage,
};

// Generate dust particles outside component
const generateDustParticles = () => {
  return [...Array(20)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${5 + Math.random() * 5}s`,
  }));
};

const dustParticlesData = generateDustParticles();

export default function MemberDetail() {
  const { memberId, leaderId } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Refs for animations
  const pageRef = useRef();
  const doorRef = useRef();
  const plaqueRef = useRef();
  const nameRef = useRef();
  const detailsRef = useRef();
  const buttonsRef = useRef();

  const handleBackToMembers = () => {
    navigate('/');
    setTimeout(() => {
      const membersSection = document.getElementById('members');
      if (membersSection) {
        membersSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    let selectedMember = null;
    let isLeader = false;
    
    if (leaderId) {
      // Handle leader profile
      const id = parseInt(leaderId, 10);
      selectedMember = leadersData.find(l => l.id === id);
      isLeader = true;
    } else if (memberId) {
      // Handle member profile
      const id = parseInt(memberId, 10);
      selectedMember = membersData.find(m => m.id === id);
      isLeader = false;
    }
    
    if (selectedMember) {
      const imageMap = isLeader ? leaderImageMap : memberImageMap;
      const memberImage = imageMap[selectedMember.name] || adhiImage;
      
      setMember({
        ...selectedMember,
        image: memberImage,
        isLeader,
      });
    }
    
    setLoading(false);
  }, [memberId, leaderId]);

  // Entry animation
  useEffect(() => {
    if (!member || loading || !pageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Page fade in
      tl.fromTo(pageRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.5 });

      // Door opens
      tl.to(doorRef.current, {
        scaleX: 0,
        transformOrigin: 'center',
        duration: 1.5,
        ease: 'power3.inOut',
      });

      // Plaque appears
      tl.fromTo(plaqueRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }, '-=0.5');

      // Name carved in (letter by letter effect)
      tl.fromTo(nameRef.current,
        { opacity: 0, letterSpacing: '20px' },
        {
          opacity: 1,
          letterSpacing: '2px',
          duration: 1,
          ease: 'power2.out',
        }, '-=0.3');

      // Details appear one by one
      const detailItems = pageRef.current.querySelectorAll('.order-detail-item');
      if (detailItems.length > 0) {
        tl.fromTo(detailItems,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: 'back.out(1.2)',
          }, '-=0.3');
      }

      // Buttons rise from stone
      const actionBtns = pageRef.current.querySelectorAll('.ancient-action-btn');
      if (actionBtns.length > 0) {
        tl.fromTo(actionBtns,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'back.out(1.5)',
          }, '-=0.2');
      }
    }, pageRef);

    return () => ctx.revert();
  }, [member, loading]);

  if (loading) {
    return (
      <div className="hall-of-knights">
        <div className="loading-hall">
          <div className="torch-loading"></div>
          <p>Entering the Hall of Knights...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="hall-of-knights">
        <div className="not-found-hall">
          <h2>Knight Not Found</h2>
          <p>This knight's plaque does not exist in our records.</p>
          <button onClick={handleBackToMembers} className="back-button-ancient">
            <ArrowLeft size={20} />
            Return to Kingdom
          </button>
        </div>
      </div>
    );
  }

  // Map button names to ancient equivalents
  const getAncientButton = (buttonName) => {
    const buttonMap = {
      'View Portfolio': { icon: <Scroll size={20} />, text: 'View Chronicle' },
      'LinkedIn': { icon: <Globe size={20} />, text: 'Royal Network' },
      'Bash Profile': { icon: <Shield size={20} />, text: 'Battle Record' },
    };
    return buttonMap[buttonName] || { icon: <Scroll size={20} />, text: buttonName };
  };

  return (
    <div className="hall-of-knights" ref={pageRef}>
      {/* Stone Wall Background */}
      <div className="castle-wall-bg"></div>
      
      {/* Animated Dust Particles */}
      <div className="dust-container">
        {dustParticlesData.map((particle) => (
          <div
            key={particle.id}
            className="dust-particle-hall"
            style={{
              left: particle.left,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          ></div>
        ))}
      </div>

      {/* Door Overlay (closes behind) */}
      <div className="stone-door" ref={doorRef}></div>

      {/* Back Button */}
      <button onClick={handleBackToMembers} className="back-button-ancient">
        <ArrowLeft size={20} />
        <span>Return to Kingdom</span>
      </button>

      {/* Stone Plaque */}
      <div className="stone-plaque" ref={plaqueRef}>
        {/* Arch Frame */}
        <div className="stone-arch">
          <div className="arch-top"></div>
          <div className="arch-left"></div>
          <div className="arch-right"></div>
        </div>

        {/* Portrait Frame */}
        <div className="portrait-frame">
          <div className="frame-border">
            <div className="frame-corner tl"></div>
            <div className="frame-corner tr"></div>
            <div className="frame-corner bl"></div>
            <div className="frame-corner br"></div>
          </div>
          <img 
            src={member.image} 
            alt={member.name}
            className="knight-portrait"
          />
          <div className="portrait-glow"></div>
        </div>

        {/* Carved Name */}
        <h1 className="knight-name" ref={nameRef}>
          {member.isLeader ? 'Grand Master' : 'Sir'} {member.name}
        </h1>

        {/* Title (Gold Engraving) */}
        <p className="knight-title">{member.title}</p>

        {/* Divider */}
        <div className="stone-divider">
          <span className="divider-ornament">◈</span>
          <span className="divider-line"></span>
          <span className="divider-ornament">◈</span>
        </div>

        {/* Order Details */}
        <div className="order-details" ref={detailsRef}>
          <h3 className="order-heading">Order Details</h3>
          
          <div className="order-detail-item">
            <span className="detail-icon">🛡️</span>
            <span className="detail-label">Status:</span>
            <span className="detail-value">{member.status}</span>
          </div>

          <div className="order-detail-item">
            <span className="detail-icon">⚔️</span>
            <span className="detail-label">Battle Role:</span>
            <span className="detail-value">{member.role}</span>
          </div>

          <div className="order-detail-item">
            <span className="detail-icon">📜</span>
            <span className="detail-label">Guild:</span>
            <span className="detail-value">{member.department}</span>
          </div>

          <div className="order-detail-item">
            <span className="detail-icon">🏰</span>
            <span className="detail-label">Year of Oath:</span>
            <span className="detail-value">{member.yearJoined}</span>
          </div>

          {member.yearStudying && (
            <div className="order-detail-item">
              <span className="detail-icon">📖</span>
              <span className="detail-label">Years of Training:</span>
              <span className="detail-value">{member.yearStudying}</span>
            </div>
          )}

          {member.registerNumber && (
            <div className="order-detail-item">
              <span className="detail-icon">📋</span>
              <span className="detail-label">Royal Record:</span>
              <span className="detail-value">{member.registerNumber}</span>
            </div>
          )}
        </div>

        {/* Achievements */}
        {member.projects && member.projects.length > 0 && (
          <>
            <div className="stone-divider">
              <span className="divider-ornament">◈</span>
              <span className="divider-line"></span>
              <span className="divider-ornament">◈</span>
            </div>

            <div className="achievements-section">
              <h3 className="order-heading">Achievements</h3>
              {member.projects.map((project, idx) => (
                <div key={idx} className="achievement-item">
                  <span className="achievement-icon">🏆</span>
                  <span className="achievement-text">{project}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Ancient Action Buttons */}
        {member.buttons && member.buttons.length > 0 && (
          <div className="ancient-actions" ref={buttonsRef}>
            {member.buttons.map((button, idx) => {
              const ancientBtn = getAncientButton(button);
              return (
                <button key={idx} className="ancient-action-btn">
                  <span className="btn-icon">{ancientBtn.icon}</span>
                  <span className="btn-text">{ancientBtn.text}</span>
                  <div className="btn-glow"></div>
                </button>
              );
            })}
          </div>
        )}

        {/* Plaque Base Inscription */}
        <div className="plaque-inscription">
          <p>"Forged in Honor • Bound by Legacy"</p>
        </div>
      </div>
    </div>
  );
}
