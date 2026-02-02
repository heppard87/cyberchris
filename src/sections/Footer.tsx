import { Github, Linkedin, Twitter, Heart, Terminal, ArrowUp } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/heppard87',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: Twitter,
  },
];

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Apps', href: '#apps' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="inline-block font-orbitron text-2xl font-bold text-foreground hover:text-glow-blue transition-all"
            >
              CyberSolutionsOhio
            </a>
            <p className="text-sm text-muted-foreground max-w-xs">
              Bridging the gap between immersive 3D design and enterprise-grade
              security.
            </p>
            <div className="flex items-center gap-2 text-xs font-orbitron text-cyan-400">
              <Terminal className="w-3 h-3" />
              <span>All Systems Nominal</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-orbitron text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-orbitron text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-500" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>© 2026 CyberSolutionsOhio.</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by
              Chris Heppard
            </span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>Back to Top</span>
            <span className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-xs font-orbitron text-muted-foreground/40">
          <span>v1.0.0</span>
          <span>|</span>
          <span>BUILD_SUCCESS</span>
        </div>
      </div>
    </footer>
  );
}
