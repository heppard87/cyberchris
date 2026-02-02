import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight, Gamepad2, Layers } from 'lucide-react';

// Sound effect helper
const playSound = (sound: string) => {
  const soundEnabled = localStorage.getItem('sound-enabled') !== 'false';
  if (!soundEnabled) return;
  
  const sounds: Record<string, string> = {
    hover: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    launch: 'https://assets.mixkit.co/active_storage/sfx/2044/2044-preview.mp3',
  };
  
  const audio = new Audio(sounds[sound]);
  audio.volume = sound === 'launch' ? 0.4 : 0.3;
  audio.play().catch(() => {});
};

// 3D Floating Shapes Component
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Icosahedron */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-4, 2, -5]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshBasicMaterial
            color="#3b82f6"
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>

      {/* Cube */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[4, -1, -8]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial
            color="#8b5cf6"
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      </Float>

      {/* Octahedron */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={2.5}>
        <mesh position={[2, 3, -6]}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color="#06b6d4"
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>

      {/* Torus */}
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[-3, -2, -7]}>
          <torusGeometry args={[1.2, 0.3, 16, 100]} />
          <meshBasicMaterial
            color="#10b981"
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      </Float>

      {/* Dodecahedron */}
      <Float speed={2.2} rotationIntensity={0.9} floatIntensity={2}>
        <mesh position={[0, 0, -10]}>
          <dodecahedronGeometry args={[1.8, 0]} />
          <meshBasicMaterial
            color="#ec4899"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>

      {/* Small floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float
          key={i}
          speed={1 + Math.random()}
          rotationIntensity={0.5}
          floatIntensity={1 + Math.random()}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              -10 - Math.random() * 10,
            ]}
          >
            <sphereGeometry args={[0.05 + Math.random() * 0.1, 8, 8]} />
            <meshBasicMaterial
              color={['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Text decode animation hook
function useTextDecode(text: string, delay: number = 0) {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

  useEffect(() => {
    const timeout = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return displayText;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingText = useTextDecode('CyberSolutions for a Modern Ohio', 200);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content entrance animation
      gsap.fromTo(
        '.hero-content > *',
        { y: 50, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.5,
        }
      );

      // Scroll-triggered fade out
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
        opacity: 0,
        y: -100,
        scale: 0.9,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <color attach="background" args={['#0a0a0a']} />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <FloatingShapes />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Scanline Overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        <div className="hero-content space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-orbitron text-cyan-400">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            SYSTEM_INITIALIZED...
          </div>

          {/* Main Heading */}
          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            {headingText || '\u00A0'}
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            Chris Heppard bridges the gap between{' '}
            <span className="text-gradient font-medium">3D design</span> and{' '}
            <span className="text-gradient-cyan font-medium">enterprise security</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-orbitron text-sm px-8 py-6 rounded-lg glow-blue transition-all duration-300 hover:scale-105"
              onMouseEnter={() => playSound('hover')}
              onClick={() => {
                playSound('launch');
                window.open('https://heppard87.github.io/Momentum%20Runner.html', '_blank');
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                LAUNCH TITAN BREACH [FULLSCREEN]
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group font-orbitron text-sm px-8 py-6 rounded-lg border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              onMouseEnter={() => playSound('hover')}
              onClick={() => {
                playSound('click');
                scrollToSection('#apps');
              }}
            >
              <Layers className="w-4 h-4 mr-2" />
              View Software Suite
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="flex items-center justify-center gap-8 pt-8 text-xs font-orbitron text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-muted-foreground" />
              <span>FULL-STACK</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 border border-muted-foreground rotate-45" />
            </div>
            <div className="flex items-center gap-2">
              <span>SECURITY</span>
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
