import { useState, useEffect } from 'react';
import { Menu, X, Search, Terminal, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Apps', href: '#apps' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Load sound preference
    const saved = localStorage.getItem('sound-enabled');
    if (saved !== null) {
      setSoundEnabled(saved === 'true');
    }
  }, []);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('sound-enabled', String(newState));
  };

  const scrollToSection = (href: string, name: string) => {
    setActiveLink(name);
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Play hover sound
  const playHoverSound = () => {
    if (!soundEnabled) return;
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {});
  };

  // Play click sound
  const playClickSound = () => {
    if (!soundEnabled) return;
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-cyber ${
          isScrolled
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="glass rounded-full px-2 py-2 flex items-center gap-1">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              playClickSound();
              scrollToSection('#home', 'Home');
            }}
            onMouseEnter={playHoverSound}
            className="px-4 py-2 font-orbitron font-bold text-sm text-foreground hover:text-glow-blue transition-all"
          >
            CSO
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  playClickSound();
                  scrollToSection(link.href, link.name);
                }}
                onMouseEnter={playHoverSound}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  activeLink === link.name
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {activeLink === link.name && (
                  <span className="absolute inset-0 bg-primary/20 rounded-full animate-in fade-in duration-300" />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-2 border-l border-border/50 pl-2">
            {/* Sound Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSound}
              onMouseEnter={playHoverSound}
              className="rounded-full hover:bg-primary/20"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>

            {/* Theme Toggle */}
            <div onMouseEnter={playHoverSound}>
              <ThemeToggle />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onMouseEnter={playHoverSound}
              className="rounded-full hover:bg-primary/20"
            >
              <Search className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onMouseEnter={playHoverSound}
              className="rounded-full hidden sm:flex items-center gap-2 text-xs font-orbitron text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
            >
              <Terminal className="w-3 h-3" />
              [HUB_ACCESS]
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => {
              playClickSound();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-background/90 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="absolute top-20 left-4 right-4 glass rounded-2xl p-6">
          {/* Mobile Controls */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSound}
                className="rounded-full"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </Button>
              <ThemeToggle />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  playClickSound();
                  scrollToSection(link.href, link.name);
                }}
                className={`px-4 py-3 text-lg font-medium rounded-lg transition-all ${
                  activeLink === link.name
                    ? 'bg-primary/20 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Static Header (visible when not scrolled) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              playClickSound();
              scrollToSection('#home', 'Home');
            }}
            onMouseEnter={playHoverSound}
            className="font-orbitron font-bold text-lg text-foreground hover:text-glow-blue transition-all"
          >
            CyberSolutionsOhio
          </a>
          <div className="flex items-center gap-2">
            {/* Sound Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSound}
              onMouseEnter={playHoverSound}
              className="rounded-full hover:bg-primary/20"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </Button>

            {/* Theme Toggle */}
            <div onMouseEnter={playHoverSound}>
              <ThemeToggle />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onMouseEnter={playHoverSound}
              className="rounded-full hover:bg-primary/20"
            >
              <Search className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onMouseEnter={playHoverSound}
              className="rounded-full hidden sm:flex items-center gap-2 text-xs font-orbitron text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
            >
              <Terminal className="w-3 h-3" />
              [HUB_ACCESS]
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
