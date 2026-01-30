import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import membersData from '../../data/members.json';
import leadersData from '../../data/leaders.json';
import './Members.css';

// Import member images
import adhiImage from '../../assets/members image/adhi.jpeg';
import amruthaImage from '../../assets/members image/amrutha.jpeg';
import andreaImage from '../../assets/members image/andrea.jpeg';
import ancyImage from '../../assets/members image/ancy.jpeg';
import jeshwinImage from '../../assets/members image/jeshwin.jpeg';
import maxwellImage from '../../assets/members image/maxwell.jpeg';
import michalImage from '../../assets/members image/michal.jpeg';
import primImage from '../../assets/members image/prim.jpeg';
import samuelImage from '../../assets/members image/samuel.jpeg';
import sowmiyaImage from '../../assets/members image/sowmiya.jpeg';
import geoImage from '../../assets/members image/geo.jpeg';
import harshiniImage from '../../assets/members image/harshini.jpeg';

gsap.registerPlugin(ScrollTrigger);

// Map member names to their images
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

export default function Members() {
  const sectionRef = useRef();
  const cardsRef = useRef([]);
  const navigate = useNavigate();
  
  // Assign actual images to leaders
  const leadersWithImages = leadersData.map(leader => ({
    ...leader,
    image: leaderImageMap[leader.name] || geoImage,
  }));
  
  // Assign actual images to members
  const membersWithImages = membersData.map(member => ({
    ...member,
    image: memberImageMap[member.name] || adhiImage,
  }));
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1,
            },
            y: 100,
            opacity: 0,
            rotateX: 45,
          });
        }
      });
    });
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section id="members" className="members" ref={sectionRef}>
      <div className="members-container">
        <h2 className="section-title">
          <span className="title-accent">━━━</span>
          Our Fellowship
          <span className="title-accent">━━━</span>
        </h2>
        
        <p className="members-intro">
          Each warrior brings unique strength to our brotherhood. 
          United by honor, driven by purpose.
        </p>
        
        {/* Leaders Section */}
        <div className="leaders-section">
          <h3 className="leaders-title">
            <span className="leader-accent">◈━━</span>
            Our Leaders
            <span className="leader-accent">━━◈</span>
          </h3>
          <div className="leaders-grid">
            {leadersWithImages.map((leader) => (
              <div key={leader.id} className="leader-card-wrapper">
                <div className="leader-card">
                  <div className="leader-card-front">
                    <div className="card-image-wrapper">
                      <img 
                        src={leader.image} 
                        alt={leader.name}
                        className="member-image"
                      />
                      <div className="image-overlay"></div>
                    </div>
                    
                    <div className="card-header">
                      <div className="member-role-badge leader-badge">{leader.role}</div>
                    </div>
                    
                    <div className="card-content">
                      <h3 className="member-name">{leader.name}</h3>
                      <p className="member-title">{leader.title}</p>
                      <p className="member-country">{leader.department}</p>
                    </div>
                    
                    <div className="card-ornament">
                      <span className="ornament-left">◈</span>
                      <span className="ornament-center">━━━</span>
                      <span className="ornament-right">◈</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="leader-profile-btn"
                  onClick={() => navigate(`/member/leader/${leader.id}`)}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Regular Members Section */}
        <h3 className="members-subtitle">
          <span className="subtitle-accent">⚔</span>
          Fellowship Members
          <span className="subtitle-accent">⚔</span>
        </h3>
        
        <div className="members-grid">
          {membersWithImages.map((member, index) => (
            <div 
              key={member.id}
              className="member-card"
              ref={el => cardsRef.current[index] = el}
            >
              <div className="card-inner">
                <div className="card-front">
                  <div className="card-image-wrapper">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="member-image"
                    />
                    <div className="image-overlay"></div>
                  </div>
                  
                  <div className="card-header">
                    <div className="member-role-badge">{member.role}</div>
                  </div>
                  
                  <div className="card-content">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-title">{member.title}</p>
                    <p className="member-country">{member.department}</p>
                  </div>
                  
                  <div className="card-ornament">
                    <span className="ornament-left">◈</span>
                    <span className="ornament-center">━━━</span>
                    <span className="ornament-right">◈</span>
                  </div>
                </div>
                
                <div className="card-back">
                  <div className="back-content">
                    <h4 className="back-title">{member.name}</h4>
                    <p className="back-role">{member.role}</p>
                    <p className="back-status">{member.status}</p>
                    <button 
                      className="view-profile-btn"
                      onClick={() => navigate(`/member/${member.id}`)}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
