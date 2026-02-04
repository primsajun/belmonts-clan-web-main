import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import mapImage from '../../assets/map.webp';
import travelingImage from '../../assets/dappa.png';
import ancientShield from '../../assets/icons/ancient-shield.svg';
import ancientCompass from '../../assets/icons/ancient-compass.svg';
import ancientScroll from '../../assets/icons/ancient-scroll.svg';
import ancientTemple from '../../assets/icons/ancient-temple.svg';
import ancientPyramid from '../../assets/icons/ancient-pyramid.svg';
import ancientSeal from '../../assets/icons/ancient-seal.svg';
import './Timeline.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Geographical checkpoint locations on the map
const checkpoints = [
  {
    id: 'north-america',
    position: { x: 18, y: 35 },
    
  },
  {
    id: 'south-america',
    position: { x: 25, y: 70 },
   
  },
  {
    id: 'europe',
    position: { x: 50, y: 25 },
   
  },
  {
    id: 'africa',
    position: { x: 52, y: 55 },
    
  },
  {
    id: 'asia',
    position: { x: 72, y: 35 },
   
  },
  {
    id: 'australia',
    position: { x: 82, y: 72 },
   
  },
  {
    id: 'greenland',
    position: { x: 35, y: 12 },
   
  }
];

const popupBelowCheckpoints = new Set(['north-america', 'asia', 'europe', 'greenland']);

const achievements = [
  {
    id: 1,
    year: '2024',
    title: 'The Belmonts Created',
    description: 'The Belmonts clan was established, uniting a group of visionaries to challenge the status quo and reshape the world.',
    icon: ancientShield,
    iconType: 'svg',
    checkpoint: 'north-america',
    position: { x: 18, y: 35 },
    date: '11/9/2024'
  },
  {
    id: 2,
    year: '2024',
    title: 'First Weekly Bash',
    description: 'The first gathering of the Belmonts family, conducting our inaugural weekly bash in South America.',
    icon: ancientCompass,
    iconType: 'svg',
    checkpoint: 'south-america',
    position: { x: 25, y: 70 },
    date: '24/11/2024'
  },
  {
    id: 3,
    year: '2025',
    title: 'Weekly Bash - Africa',
    description: 'Extended our presence to the African continent, bringing the Belmonts spirit to new lands.',
    icon: ancientScroll,
    iconType: 'svg',
    checkpoint: 'africa',
    position: { x: 52, y: 55 },
    date: '14/6/2025'
  },
  {
    id: 4,
    year: '2025',
    title: 'Weekly Bash - Australia',
    description: 'Reached the southern hemisphere, connecting with warriors across the Australian region.',
    icon: ancientTemple,
    iconType: 'svg',
    checkpoint: 'australia',
    position: { x: 82, y: 72 },
    date: '6/9/2025'
  },
  {
    id: 5,
    year: '2025',
    title: 'Project Showcase 3 - Day 1',
    description: 'The monumental Project Showcase 3 begins in Asia, displaying the innovations and achievements of our clan.',
    icon: ancientPyramid,
    iconType: 'svg',
    checkpoint: 'asia',
    position: { x: 72, y: 35 },
    date: '1/10/2025'
  },
  {
    id: 6,
    year: '2025',
    title: 'Project Showcase 3 - Day 2',
    description: 'Project Showcase 3 continues in Europe, showcasing the continued brilliance and unity of the Belmonts.',
    icon: ancientSeal,
    iconType: 'svg',
    checkpoint: 'europe',
    position: { x: 50, y: 25 },
    date: '2/10/2025'
  },
  {
    id: 7,
    year: '2026',
    title: 'Weekly Bash - Greenland',
    description: 'The journey extends to Greenland, as the Belmonts continue their global expansion and gatherings.',
    icon: '⛵',
    checkpoint: 'greenland',
    position: { x: 35, y: 12 },
    date: '25/1/2026'
  },
];

export default function Timeline() {
  const sectionRef = useRef();
  const mapRef = useRef();
  const itemsRef = useRef([]);
  const svgRef = useRef();
  const travelerRef = useRef();
  const [focusedId, setFocusedId] = useState(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate map entrance
      if (mapRef.current) {
        gsap.from(mapRef.current, {
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 70%',
            end: 'top 50%',
            scrub: 1,
          },
          opacity: 0,
          scale: 0.95,
        });
      }

      // Animate constellation points
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: mapRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            },
            opacity: 0,
            scale: 0,
            delay: index * 0.1,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Draw connecting lines between stars
  useEffect(() => {
    if (!svgRef.current || !mapRef.current) return;

    const svg = svgRef.current;
    const container = mapRef.current;
    
    // Clear previous lines
    const existingLines = svg.querySelectorAll('.constellation-line');
    existingLines.forEach(line => line.remove());

    // Create SVG paths between consecutive points
    for (let i = 0; i < achievements.length - 1; i++) {
      const current = achievements[i];
      const next = achievements[i + 1];

      const x1 = (current.position.x / 100) * container.offsetWidth;
      const y1 = (current.position.y / 100) * container.offsetHeight;
      const x2 = (next.position.x / 100) * container.offsetWidth;
      const y2 = (next.position.y / 100) * container.offsetHeight;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      line.setAttribute('class', 'constellation-line');
      line.setAttribute('d', `M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 + 30} ${x2} ${y2}`);
      line.setAttribute('stroke', '#8b7355');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('fill', 'none');
      line.setAttribute('opacity', '0.6');
      line.setAttribute('stroke-dasharray', '5,5');

      svg.appendChild(line);
    }
  }, []);

  // Animate traveling image to visit each pin head
  useEffect(() => {
    if (travelerRef.current && mapRef.current) {
      // Create timeline for continuous movement through all pin heads
      const tl = gsap.timeline({ repeat: -1 });
      
      // Set initial position to first achievement
      gsap.set(travelerRef.current, {
        left: `${achievements[0].position.x}%`,
        top: `${achievements[0].position.y}%`,
        xPercent: -50,
        yPercent: -50
      });

      // Animate through each achievement
      achievements.forEach((achievement, index) => {
        const nextIndex = (index + 1) % achievements.length;
        const nextAchievement = achievements[nextIndex];
        
        tl.to(travelerRef.current, {
          left: `${nextAchievement.position.x}%`,
          top: `${nextAchievement.position.y}%`,
          duration: 3, // 3 seconds to travel between each pin head
          ease: 'power1.inOut'
        });
      });
    }
  }, []);

  return (
    <section id="timeline" className="timeline" ref={sectionRef}>
      <div className="timeline-container">
        <h2 className="section-title">
          <span className="title-accent">━━━</span>
          Constellation of History
          <span className="title-accent">━━━</span>
        </h2>

        <p className="timeline-intro">
          A celestial map of glory written in the stars, marking moments of legend and triumph across the ages
        </p>

        {/* Constellation Map */}
        <div className="constellation-map" ref={mapRef} style={{ backgroundImage: `url(${mapImage})` }}>
          {/* SVG for hand-drawn lines */}
          <svg
            ref={svgRef}
            className="constellation-lines"
            width="100%"
            height="100%"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid slice"
          ></svg>

          {/* Geographical Checkpoints */}
          {checkpoints.map((checkpoint) => (
            <div
              key={checkpoint.id}
              className="map-checkpoint"
              style={{
                left: `${checkpoint.position.x}%`,
                top: `${checkpoint.position.y}%`,
              }}
              title={checkpoint.name}
            >
              <div className="checkpoint-marker">
                <div className="checkpoint-pulse"></div>
                <div className="checkpoint-icon">{checkpoint.icon}</div>
              </div>
              <div className="checkpoint-label">{checkpoint.name}</div>
            </div>
          ))}

          {/* Constellation stars/points */}
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className={`constellation-point ${focusedId === achievement.id ? 'focused' : ''} ${popupBelowCheckpoints.has(achievement.checkpoint) ? 'popup-below' : ''}`}
              ref={el => itemsRef.current[index] = el}
              style={{
                left: `${achievement.position.x}%`,
                top: `${achievement.position.y}%`,
              }}
              onMouseEnter={() => setFocusedId(achievement.id)}
              onMouseLeave={() => setFocusedId(null)}
            >
              {/* Wax pin */}
              <div className="wax-pin">
                <div className="pin-head">
                  {achievement.iconType === 'svg' ? (
                    <img src={achievement.icon} alt={achievement.title} className="pin-icon-svg" />
                  ) : (
                    <span className="pin-icon">{achievement.icon}</span>
                  )}
                </div>
                <div className="pin-seal"></div>
              </div>

              {/* Event popup */}
              <div className="event-popup">
                 <div className="popup-year">{achievement.date || achievement.year}</div>
                <h3 className="popup-title">{achievement.title}</h3>
                <p className="popup-description">{achievement.description}</p>
                <div className="popup-ornament">◈ ━ ◈</div>
              </div>
            </div>
          ))}

          {/* Traveling Image */}
          <div className="traveling-image" ref={travelerRef}>
            <img src={travelingImage} alt="Traveler" />
          </div>

          {/* Compass rose decoration */}
          <div className="compass-rose">
            {/* Outer ring */}
            <div className="compass-outer-ring"></div>
            
            {/* Cardinal directions */}
            <div className="compass-direction north">N</div>
            <div className="compass-direction east">E</div>
            <div className="compass-direction south">S</div>
            <div className="compass-direction west">W</div>
            
            {/* Inner star */}
            <div className="compass-inner">
              <div className="compass-star">✦</div>
            </div>
            
            {/* Decorative lines to edges */}
            <div className="compass-line north-line"></div>
            <div className="compass-line east-line"></div>
            <div className="compass-line south-line"></div>
            <div className="compass-line west-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
