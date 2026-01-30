import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(animationConfig) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: animationConfig.start || 'top 80%',
          end: animationConfig.end || 'top 50%',
          scrub: animationConfig.scrub !== undefined ? animationConfig.scrub : 1,
          markers: animationConfig.markers || false,
        },
        ...animationConfig.from,
      });
    });

    return () => ctx.revert();
  }, [animationConfig]);

  return elementRef;
}
