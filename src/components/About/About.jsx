import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef();
  const scrollRef = useRef();
  const contentRef = useRef();
  const textLinesRef = useRef([]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parchment scroll unroll animation
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Scroll unfurls from top downward
      scrollTimeline.fromTo(scrollRef.current,
        {
          scaleY: 0.05,
          transformOrigin: 'top center',
          opacity: 0.8,
        },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }
      );

      // Slight bounce at end
      scrollTimeline.to(scrollRef.current, {
        scaleY: 0.98,
        duration: 0.1,
        ease: 'power1.inOut',
      });

      scrollTimeline.to(scrollRef.current, {
        scaleY: 1,
        duration: 0.1,
        ease: 'power1.inOut',
      });

      // Text appears with ink writing effect after scroll opens
      textLinesRef.current.forEach((line, index) => {
        if (line) {
          // Split text into characters
          const text = line.textContent;
          line.innerHTML = text.split('').map(char => 
            `<span class="char" style="opacity: 0">${char === ' ' ? '&nbsp;' : char}</span>`
          ).join('');

          const chars = line.querySelectorAll('.char');
          
          scrollTimeline.to(chars, {
            opacity: 1,
            duration: 0.05,
            stagger: {
              each: 0.02,
              from: 'start',
            },
            ease: 'none',
          }, index * 0.3 + 0.8);
        }
      });
    });
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="parchment-scroll" ref={scrollRef}>
        <div className="scroll-edge top-edge"></div>
        
        <div className="scroll-content" ref={contentRef}>
          <div className="wax-seal">
            <span className="seal-icon">⚔</span>
          </div>

          <h2 className="scroll-title" ref={el => textLinesRef.current[0] = el}>
            The Kingdom of Belmonts
          </h2>
          
          <div className="scroll-text">
            <p className="manuscript-line" ref={el => textLinesRef.current[1] = el}>
              Where we explore, gain and impart knowledge to build things, trying to make a change in how the world operates. Like a wave that comes crashing to change everything into better things.
            </p>
            
            <p className="manuscript-line" ref={el => textLinesRef.current[2] = el}>
              Something outside today's system, reminiscent of the 15th or 16th centuries. A group of people who will question everything and finding the answers to their inquiries—a crusade for wisdom.
            </p>
            
            <div className="ink-divider">⚜</div>
            
            <p className="manuscript-line" ref={el => textLinesRef.current[3] = el}>
              Through centuries of conquest and alliance, our banners have flown across countless battlefields.
            </p>
            
            <p className="manuscript-line" ref={el => textLinesRef.current[4] = el}>
              Our aim is to foster an environment where creativity and technology intertwine, leading to groundbreaking innovations that can reshape our world.
            </p>
            
            <div className="ink-divider">⚜</div>
            
            <p className="manuscript-line manuscript-quote" ref={el => textLinesRef.current[5] = el}>
              "Ad Montem Sapientiae"
            </p>
            
            <p className="manuscript-signature" ref={el => textLinesRef.current[6] = el}>
              — The Belmont Creed
            </p>
          </div>
        </div>
        
        <div className="scroll-edge bottom-edge"></div>
      </div>
      
      <div className="dust-particles"></div>
    </section>
  );
}
