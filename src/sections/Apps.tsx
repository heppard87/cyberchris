import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Gamepad2,
  Wrench,
  Cpu,
  Play,
  ExternalLink,
  Layers,
  X,
  Zap,
  Target,
  Rocket,
  Orbit,
  Box,
  Dna,
  Atom,
  Home,
  Flower2,
  Globe,
  Brain,
  Activity,
  Moon,
  Flame,
  Swords,
  Puzzle,
  Grid3X3,
  Binary,
  Waves,
  Timer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

// GitHub Pages base URL for your games
const GAMES_BASE_URL = 'https://heppard87.github.io';

const apps = {
  action: [
    {
      id: 1,
      title: 'Momentum Runner',
      description: 'Avoid the firewall. Maintain terminal velocity.',
      category: 'Action',
      color: 'from-blue-500 to-cyan-500',
      icon: Rocket,
      path: '/Momentum%20Runner.html',
    },
    {
      id: 2,
      title: 'Rhythm Runner',
      description: 'Synchronize tactical maneuvers with the audio beat.',
      category: 'Rhythm',
      color: 'from-purple-500 to-pink-500',
      icon: Zap,
      path: '/Rhythm%20Runner.html',
    },
    {
      id: 3,
      title: 'Trippy Run',
      description: 'High-speed psychedelic visual data traversal.',
      category: 'Arcade',
      color: 'from-green-500 to-emerald-500',
      icon: Waves,
      path: '/Trippy%20Run.html',
    },
    {
      id: 4,
      title: '3D Pong',
      description: 'Enhanced spatial arcade combat simulator.',
      category: 'Classic',
      color: 'from-yellow-500 to-orange-500',
      icon: Target,
      path: '/3d-pong.html',
    },
    {
      id: 5,
      title: 'Cosmic Billiards',
      description: 'Physics-based deep space arcade simulation.',
      category: 'Physics',
      color: 'from-indigo-500 to-violet-500',
      icon: Orbit,
      path: '/Cosmic%20Billiards.html',
    },
    {
      id: 6,
      title: 'Asteroid Field',
      description: 'Navigate debris fields in hostile space.',
      category: 'Survival',
      color: 'from-red-500 to-rose-500',
      icon: Flame,
      path: '/Asteroid%20Field.html',
    },
    {
      id: 19,
      title: 'Neon Blaster',
      description: 'Fast-paced neon shooter with power-ups.',
      category: 'Shooter',
      color: 'from-fuchsia-500 to-pink-500',
      icon: Swords,
      path: '/Neon%20Blaster.html',
    },
    {
      id: 20,
      title: 'Cyber Sprint',
      description: 'Endless runner through cyberpunk cityscapes.',
      category: 'Endless',
      color: 'from-cyan-500 to-teal-500',
      icon: Timer,
      path: '/Cyber%20Sprint.html',
    },
  ],
  creative: [
    {
      id: 7,
      title: 'Voxel Painter',
      description: 'Precision 3D construction suite for cyber-worlds.',
      category: 'Creative',
      color: 'from-cyan-500 to-blue-500',
      icon: Box,
      path: '/3D%20Voxel%20Painter%20Ultra.html',
    },
    {
      id: 8,
      title: 'DNA Visualizer',
      description: 'Interactive biomedical data mapping engine.',
      category: 'Science',
      color: 'from-green-500 to-teal-500',
      icon: Dna,
      path: '/3D%20DNA%20Visualizer.html',
    },
    {
      id: 9,
      title: 'Molecule Viewer',
      description: 'Real-time molecular structure simulation.',
      category: 'Science',
      color: 'from-purple-500 to-indigo-500',
      icon: Atom,
      path: '/3D%20Molecule%20Viewer.html',
    },
    {
      id: 10,
      title: 'Room Planner',
      description: 'Virtual architectural layout and design suite.',
      category: 'Design',
      color: 'from-orange-500 to-amber-500',
      icon: Home,
      path: '/Room%20Planner.html',
    },
    {
      id: 11,
      title: 'Zen Garden',
      description: 'Procedural relaxation and pattern meditation.',
      category: 'Wellness',
      color: 'from-emerald-500 to-green-500',
      icon: Flower2,
      path: '/Digital%20Zen%20Garden.html',
    },
    {
      id: 12,
      title: 'Solar System',
      description: 'Interactive 3D celestial body mapping.',
      category: 'Education',
      color: 'from-blue-500 to-indigo-500',
      icon: Globe,
      path: '/Interactive%20Solar%20System.html',
    },
    {
      id: 21,
      title: 'Pixel Studio',
      description: 'Create and animate pixel art masterpieces.',
      category: 'Art',
      color: 'from-rose-500 to-pink-500',
      icon: Grid3X3,
      path: '/Pixel%20Studio.html',
    },
    {
      id: 22,
      title: 'Sound Lab',
      description: 'Interactive audio synthesis and visualization.',
      category: 'Audio',
      color: 'from-violet-500 to-purple-500',
      icon: Activity,
      path: '/Sound%20Lab.html',
    },
  ],
  strategy: [
    {
      id: 13,
      title: '3D Chess',
      description: 'Advanced tactical logic simulator v4.2.',
      category: 'Strategy',
      color: 'from-gray-500 to-slate-500',
      icon: Swords,
      path: '/3D%20Chess.html',
    },
    {
      id: 14,
      title: '3D Solitaire',
      description: 'Classic logic expanded into immersive space.',
      category: 'Card',
      color: 'from-amber-500 to-yellow-500',
      icon: Layers,
      path: '/3D%20Solitaire.html',
    },
    {
      id: 15,
      title: 'Memory Matrix',
      description: 'Neural pattern recall and efficiency testing.',
      category: 'Brain',
      color: 'from-pink-500 to-rose-500',
      icon: Brain,
      path: '/Memory%20Game.html',
    },
    {
      id: 16,
      title: 'Data Visualizer',
      description: 'Real-time data stream analytics engine.',
      category: 'Analytics',
      color: 'from-cyan-500 to-teal-500',
      icon: Activity,
      path: '/3D%20Data%20Visualizer.html',
    },
    {
      id: 17,
      title: 'Cyber Dreams',
      description: 'Atmospheric neural network simulation.',
      category: 'Experience',
      color: 'from-violet-500 to-purple-500',
      icon: Moon,
      path: '/Cyber%20Dreams.html',
    },
    {
      id: 18,
      title: 'Physics Sandbox',
      description: 'Interactive physics simulation environment.',
      category: 'Simulation',
      color: 'from-blue-500 to-cyan-500',
      icon: Atom,
      path: '/Physics%20Sandbox.html',
    },
    {
      id: 23,
      title: 'Code Breaker',
      description: 'Crack encrypted messages and solve puzzles.',
      category: 'Puzzle',
      color: 'from-lime-500 to-green-500',
      icon: Puzzle,
      path: '/Code%20Breaker.html',
    },
    {
      id: 24,
      title: 'Binary Battle',
      description: 'Strategic combat with binary logic mechanics.',
      category: 'Strategy',
      color: 'from-slate-500 to-gray-500',
      icon: Binary,
      path: '/Binary%20Battle.html',
    },
  ],
};

export default function Apps() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'action' | 'creative' | 'strategy'>('action');
  const [selectedApp, setSelectedApp] = useState<(typeof apps.action)[0] | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.apps-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.app-card',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.apps-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  const currentApps = apps[activeTab];

  const launchApp = (app: (typeof apps.action)[0], fullscreen: boolean = false) => {
    const url = `${GAMES_BASE_URL}${app.path}`;
    if (fullscreen) {
      setSelectedApp(app);
      setIsFullscreen(true);
    } else {
      window.open(url, '_blank');
    }
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setSelectedApp(null);
  };

  return (
    <section
      ref={sectionRef}
      id="apps"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Fullscreen Game Modal */}
      {isFullscreen && selectedApp && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`${GAMES_BASE_URL}${selectedApp.path}`, '_blank')}
              className="glass text-white border-white/20 hover:bg-white/10"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in New Tab
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={closeFullscreen}
              className="glass text-white border-white/20 hover:bg-white/10"
            >
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
          <iframe
            src={`${GAMES_BASE_URL}${selectedApp.path}`}
            className="w-full h-full"
            title={selectedApp.title}
            allow="fullscreen"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="apps-heading text-center mb-12">
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Action Protocols
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of interactive 3D applications, games, and utilities
            developed by Chris Heppard.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {[
            { key: 'action', label: 'Action Games', icon: Gamepad2 },
            { key: 'creative', label: 'Creative Tools', icon: Wrench },
            { key: 'strategy', label: 'Strategy & Logic', icon: Cpu },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-orbitron text-sm transition-all duration-300 ${
                activeTab === key
                  ? 'bg-primary text-primary-foreground glow-blue'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Apps Grid - 4 columns on large screens */}
        <div className="apps-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentApps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                className="app-card group relative"
              >
                <div className="relative glass rounded-2xl p-5 overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                  {/* Animated Border */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${app.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />

                  {/* Corner Accent */}
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${app.color} opacity-10 rounded-bl-full`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${app.color} p-0.5`}
                      >
                        <div className="w-full h-full bg-background rounded-[7px] flex items-center justify-center">
                          <Icon className="w-4 h-4 text-foreground" />
                        </div>
                      </div>
                      <span className="text-xs font-orbitron text-muted-foreground uppercase tracking-wider">
                        {app.category}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-orbitron text-base font-bold text-foreground mb-1 group-hover:text-glow-blue transition-all line-clamp-1">
                      {app.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {app.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        className={`flex-1 group/btn bg-gradient-to-r ${app.color} text-white text-xs`}
                        onClick={() => launchApp(app, true)}
                      >
                        <Play className="w-3 h-3 mr-1 group-hover/btn:scale-110 transition-transform" />
                        PLAY
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-2 border-border hover:border-primary/50 hover:bg-primary/10"
                        onClick={() => window.open(`${GAMES_BASE_URL}${app.path}`, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div
                    className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${app.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Games', value: '24+' },
            { label: 'Categories', value: '12' },
            { label: 'Active Players', value: '1.2K' },
            { label: 'Updates', value: 'Weekly' },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center">
              <div className="font-orbitron text-2xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-2 text-xs font-orbitron text-muted-foreground/60">
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-muted-foreground/40" />
            <span>A GAME DEVELOPED AND CODED BY</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-muted-foreground/40" />
          </div>
          <p className="font-orbitron text-lg text-foreground mt-2">
            CHRIS HEPPARD
          </p>
        </div>
      </div>
    </section>
  );
}
