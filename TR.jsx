import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import LaserFlow from './LaserFlow';
import DomeGallery from './DomeGallery';
import './TreasureRitual.css';

import artifactOne from '../../assets/book/weeklybash18.jpg';
import artifactTwo from '../../assets/book/weeklybash20.jpg';
import artifactThree from '../../assets/book/weeklybash23.jpg';
import artifactFour from '../../assets/book/weeklybash26.jpg';
import artifactFive from '../../assets/book/weeklybash27(2).JPG';
import artifactSix from '../../assets/book/junior_warriors_welcome.jpg';

const artifacts = [
  {
    id: 1,
    title: 'Crown of Ancients',
    subtitle: 'Relic of the First King',
    src: artifactOne
  },
  {
    id: 2,
    title: 'Sword of Eternal Flame',
    subtitle: 'Blade That Never Dulls',
    src: artifactTwo
  },
  {
    id: 3,
    title: 'Tome of Forgotten Spells',
    subtitle: 'Knowledge of the Elders',
    src: artifactThree
  },
  {
    id: 4,
    title: 'Chalice of Renewal',
    subtitle: 'Vessel of Life Eternal',
    src: artifactFour
  },
  {
    id: 5,
    title: 'Shield of Valor',
    subtitle: 'Defender of the Realm',
    src: artifactFive
  },
  {
    id: 6,
    title: 'Amulet of Whispers',
    subtitle: 'Speaks Truth to Power',
    src: artifactSix
  }
];

export default function TreasureRitual() {
  const revealedRef = useRef(false);
  const galleryRotationRef = useRef(null);

  useEffect(() => {
    const chest = document.querySelector('#chest');
    const reveal = document.getElementById('artifact-reveal');
    const mouth = document.getElementById('chest-mouth');
    const laser = document.querySelector('.arcane-laser');
    const chestWrap = document.getElementById('chest-wrap');
    const chestContainer = document.getElementById('chest-3d-container');
    let revealTimeout;
    let renderer;
    let scene;
    let camera;
    let chestGroup;
    let lidGroup;
    let rafId;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    if (!chest || !chestContainer) return;

    chest.classList.add('shake-chest');

    // Create particle effect
    const createParticles = () => {
      for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        
        const size = Math.random() * 6 + 2;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = '50%';
        p.style.top = '60%';
        
        const tx = (Math.random() - 0.5) * 300;
        const ty = -Math.random() * 250 - 40;
        const rot = Math.random() * 360;
        
        chestWrap.appendChild(p);

        p.animate([
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 },
          { opacity: 1, offset: 0.2 },
          { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg) scale(0)`, opacity: 0 }
        ], {
          duration: 1500 + Math.random() * 1000,
          easing: 'cubic-bezier(0, .5, .5, 1)',
          fill: 'forwards'
        }).onfinish = () => p.remove();
      }
    };

    const handleChestClick = () => {
      if (chest.classList.contains('open-chest')) {
        // Close chest - hide cards and restore laser
        if (reveal) {
          reveal.classList.remove('revealed');
          reveal.classList.add('closing');
        }
        if (mouth) {
          mouth.classList.remove('revealed');
        }
        
        // Restore laser fade-in
        if (laser) {
          laser.style.opacity = '1';
          laser.style.filter = 'blur(0px)';
        }

        if (chestWrap) {
          chestWrap.classList.remove('open-glow');
        }
        
        // Stop gallery rotation
        if (galleryRotationRef.current) {
          galleryRotationRef.current.kill();
          galleryRotationRef.current = null;
        }
        
        // Reset chest and gallery after animation
        setTimeout(() => {
          chest.classList.remove('open-chest');
          if (reveal) {
            reveal.classList.remove('closing');
          }
          revealedRef.current = false;
        }, 1800);
        return;
      }
      
      // Open chest - shake animation first
      chestWrap.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-5px) rotate(-1deg)' },
        { transform: 'translateX(5px) rotate(1deg)' },
        { transform: 'translateX(0)' }
      ], { duration: 200, iterations: 3 });

      chest.classList.remove('shake-chest');
      chest.classList.add('open-chest');
      document.dispatchEvent(new CustomEvent('CHEST_OPEN'));
    };

    const handleChestOpen = () => {
      if (laser) {
        laser.style.opacity = '0';
        laser.style.filter = 'blur(12px)';
      }

      if (chestWrap) {
        chestWrap.classList.add('open-glow');
      }

      revealTimeout = window.setTimeout(() => {
        if (revealedRef.current) return;
        revealedRef.current = true;

        // Trigger particles
        createParticles();

        if (reveal) {
          reveal.classList.add('revealed');
        }
        if (mouth) {
          mouth.classList.add('revealed');
        }

        // Start continuous rotation of gallery from right to left
        const sphere = reveal?.querySelector('.sphere');
        if (sphere && !galleryRotationRef.current) {
          galleryRotationRef.current = gsap.to(sphere, {
            rotateY: '-=360',
            duration: 60,
            ease: 'none',
            repeat: -1,
            transformOrigin: '50% 50% 0'
          });
        }
      }, 1200);
    };

    const initThreeChest = () => {
      scene = new THREE.Scene();
      scene.background = null;
      scene.fog = new THREE.Fog(0x0a0a0a, 5, 15);

      const { width, height } = chestContainer.getBoundingClientRect();
      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
      camera.position.set(0, 1.5, 8);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      chestContainer.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xfff5e1, 1.5);
      mainLight.position.set(5, 10, 5);
      mainLight.castShadow = true;
      scene.add(mainLight);

      const rimLight = new THREE.PointLight(0xffffff, 1.2, 20);
      rimLight.position.set(-5, 5, -5);
      scene.add(rimLight);

      const goldGlow = new THREE.PointLight(0xffd700, 2, 6);
      goldGlow.position.set(0, 0, 0);
      scene.add(goldGlow);

      const woodMat = new THREE.MeshStandardMaterial({
        color: 0x4a3a2a,
        roughness: 0.68,
        metalness: 0.08,
        emissive: 0x2a1b12,
        emissiveIntensity: 0.25
      });
      const goldMat = new THREE.MeshPhysicalMaterial({
        color: 0xf3cf6a,
        metalness: 1.0,
        roughness: 0.14,
        clearcoat: 1.0,
        clearcoatRoughness: 0.06,
        emissive: 0x9b6a10,
        emissiveIntensity: 0.5
      });
      const slateMat = new THREE.MeshStandardMaterial({ color: 0x1b1410, roughness: 0.9, metalness: 0.05 });

      chestGroup = new THREE.Group();

      const baseBody = new THREE.Mesh(new THREE.BoxGeometry(4, 2.2, 2.6), woodMat);
      baseBody.castShadow = true;
      baseBody.receiveShadow = true;
      chestGroup.add(baseBody);

      for (let i = -1.5; i <= 1.5; i += 0.5) {
        const slat = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.8, 0.05), slateMat);
        slat.position.set(i, 0, 1.31);
        chestGroup.add(slat);
      }

      const vBandsX = [-1.35, 1.35];
      vBandsX.forEach(x => {
        const band = new THREE.Mesh(new THREE.BoxGeometry(0.42, 2.25, 2.7), goldMat);
        band.position.x = x;
        chestGroup.add(band);

        for (let y = -0.8; y <= 0.8; y += 1.6) {
          const rivet = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), goldMat);
          rivet.position.set(x, y, 1.35);
          chestGroup.add(rivet);
        }
      });

      const hTrims = [1.05, -1.05];
      hTrims.forEach(y => {
        const trim = new THREE.Mesh(new THREE.BoxGeometry(4.1, 0.15, 2.7), goldMat);
        trim.position.y = y;
        chestGroup.add(trim);
      });

      lidGroup = new THREE.Group();
      lidGroup.position.set(0, 1.1, -1.3);

      const lidRadius = 1.35;
      const lidWood = new THREE.Mesh(
        new THREE.CylinderGeometry(lidRadius, lidRadius, 4, 32, 1, false, 0, Math.PI),
        woodMat
      );
      lidWood.rotation.z = Math.PI / 2;
      lidWood.position.set(0, 0, 1.3);
      lidWood.castShadow = true;
      lidGroup.add(lidWood);

      vBandsX.forEach(x => {
        const band = new THREE.Mesh(
          new THREE.CylinderGeometry(lidRadius + 0.04, lidRadius + 0.04, 0.45, 32, 1, false, 0, Math.PI),
          goldMat
        );
        band.rotation.z = Math.PI / 2;
        band.position.set(x, 0, 1.3);
        lidGroup.add(band);
      });

      const filigreeShape = new THREE.Shape();
      filigreeShape.moveTo(0, 0);
      filigreeShape.bezierCurveTo(0.5, 0.5, 1.2, 0.2, 1.5, -0.5);
      filigreeShape.bezierCurveTo(1.2, -1.2, 0.5, -0.8, 0, -0.3);
      filigreeShape.bezierCurveTo(-0.5, -0.8, -1.2, -1.2, -1.5, -0.5);
      filigreeShape.bezierCurveTo(-1.2, 0.2, -0.5, 0.5, 0, 0);

      const extrudeSettings = { depth: 0.05, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02 };
      const filigreeGeo = new THREE.ExtrudeGeometry(filigreeShape, extrudeSettings);
      const filigreeMesh = new THREE.Mesh(filigreeGeo, goldMat);
      filigreeMesh.rotation.x = -Math.PI / 2;
      filigreeMesh.position.set(0, lidRadius + 0.02, 1.8);
      filigreeMesh.scale.set(1.2, 1.2, 1.2);
      lidGroup.add(filigreeMesh);

      chestGroup.add(lidGroup);

      const lockGroup = new THREE.Group();
      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.15), goldMat);
      const keyhole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.1), slateMat);
      keyhole.rotation.x = Math.PI / 2;
      keyhole.position.z = 0.08;
      lockGroup.add(plate, keyhole);
      lockGroup.position.set(0, 1.1, 1.4);
      chestGroup.add(lockGroup);

      chestGroup.position.y = 0.5;
      scene.add(chestGroup);
    };

    const onResize = () => {
      if (!renderer || !camera) return;
      const { width, height } = chestContainer.getBoundingClientRect();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const onPointerDown = event => {
      isDragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
    };

    const onPointerMove = event => {
      if (!isDragging || !chestGroup) return;
      const deltaX = event.clientX - lastX;
      const deltaY = event.clientY - lastY;
      chestGroup.rotation.y += deltaX * 0.01;
      chestGroup.rotation.x += deltaY * 0.005;
      chestGroup.rotation.x = Math.max(-0.5, Math.min(0.5, chestGroup.rotation.x));
      lastX = event.clientX;
      lastY = event.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      if (lidGroup) {
        const targetRot = chest.classList.contains('open-chest') ? -Math.PI * 0.68 : 0;
        lidGroup.rotation.x += (targetRot - lidGroup.rotation.x) * 0.1;
      }
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    initThreeChest();
    animate();

    chest.addEventListener('click', handleChestClick);
    chestContainer.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    chestContainer.addEventListener('touchstart', event => onPointerDown(event.touches[0]), { passive: true });
    window.addEventListener('touchmove', event => onPointerMove(event.touches[0]), { passive: true });
    window.addEventListener('touchend', onPointerUp);
    window.addEventListener('resize', onResize);
    document.addEventListener('CHEST_OPEN', handleChestOpen);

    return () => {
      chest.removeEventListener('click', handleChestClick);
      chestContainer.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('CHEST_OPEN', handleChestOpen);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
      if (revealTimeout) {
        window.clearTimeout(revealTimeout);
      }
      if (galleryRotationRef.current) {
        galleryRotationRef.current.kill();
      }
    };
  }, []);

  return (
    <section id="treasure-ritual" className="treasure-ritual">
      <div className="ritual-container">
        <div className="ritual-header">
          <h2 className="section-title">
            <span className="title-accent">━━━</span>
            Vault of Hidden Relics
            <span className="title-accent">━━━</span>
          </h2>
          <p className="ritual-intro">
            The chest decides all. Touch the seal to reveal the artifact circle.
          </p>
        </div>

        <div className="chest-stage">
          <LaserFlow
            className="arcane-laser"
            horizontalBeamOffset={0.0}
            verticalBeamOffset={-0.45}
            color="#E6B85C"
            verticalSizing={3.0}
            horizontalSizing={0.55}
            wispDensity={1.2}
            flowSpeed={0.28}
            flowStrength={0.32}
            fogIntensity={0.75}
            fogScale={0.28}
            wispSpeed={14}
            wispIntensity={8.5}
            decay={1.2}
            falloffStart={1.1}
            fogFallSpeed={0.65}
          />

          <div className="laser-ground-glow" aria-hidden="true" />

          <div id="artifact-reveal">
            <DomeGallery 
              images={artifacts}
              fit={0.6}
              fitBasis="auto"
              minRadius={700}
              maxRadius={900}
              overlayBlurColor="#0a0a0a"
              imageBorderRadius="20px"
              openedImageBorderRadius="20px"
              grayscale={false}
            />
          </div>

          <div id="chest-mouth" />

          <div id="chest-wrap">
            <div className="chest-glow" aria-hidden="true" />
            <div id="chest" className="chest-3d" role="button" aria-label="Open the treasure chest">
              <div id="chest-3d-container" className="chest-3d-container" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
