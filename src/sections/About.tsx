import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Shield, Target, MapPin, Code2, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description:
      'Constantly exploring emerging technologies to deliver cutting-edge solutions that set new standards.',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    icon: Shield,
    title: 'Security Focused',
    description:
      'Every line of code, every architecture decision prioritizes the security and privacy of your data.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Target,
    title: 'Results Driven',
    description:
      'Measurable outcomes and tangible value guide every project from conception to deployment.',
    color: 'from-blue-500 to-cyan-500',
  },
];

const skills = [
  'React & Next.js',
  'Three.js & WebGL',
  'Node.js & Express',
  'Python & Django',
  'AWS & Cloud',
  'Cybersecurity',
  'Penetration Testing',
  'DevOps & CI/CD',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.about-heading',
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

      // Content animation
      gsap.fromTo(
        '.about-content',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        '.stat-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 80%',
          },
        }
      );

      // Skills animation
      gsap.fromTo(
        '.skill-tag',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 85%',
          },
        }
      );

      // Image rotation on scroll
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        rotation: 5,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="about-heading text-center mb-16">
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            About CyberSolutionsOhio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pioneering the intersection of immersive technology and enterprise
            security.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
          {/* Left Column - Story */}
          <div className="about-content space-y-6">
            <div className="glass rounded-2xl p-8">
              <h3 className="font-orbitron text-2xl font-bold text-foreground mb-4">
                Our Story
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded by Chris Heppard in Cincinnati, Ohio,
                  CyberSolutionsOhio emerged from a vision to transform how
                  businesses interact with technology. With a deep passion for
                  both creative 3D experiences and robust cybersecurity
                  infrastructure, Chris recognized a gap in the market for
                  solutions that don't compromise between innovation and
                  security.
                </p>
                <p>
                  What started as a solo venture has evolved into a
                  comprehensive technology consultancy, serving clients who
                  demand excellence in both form and function. Every project
                  undertaken reflects a commitment to pushing boundaries while
                  maintaining the highest standards of security and performance.
                </p>
                <p>
                  Today, CyberSolutionsOhio stands at the forefront of modern
                  web development, offering everything from immersive 3D
                  applications to enterprise-grade security audits, all delivered
                  with the precision and care that has become our hallmark.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="glass rounded-2xl p-8">
              <h3 className="font-orbitron text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                Technical Expertise
              </h3>
              <div className="skills-grid flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-primary/20 hover:text-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Profile */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="glass rounded-2xl p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar */}
                <div
                  ref={imageRef}
                  className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-purple-500 to-cyan-500 animate-pulse" />
                  <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <span className="font-orbitron text-4xl font-bold text-gradient">
                        CH
                      </span>
                    </div>
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-background flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center sm:text-left">
                  <h3 className="font-orbitron text-2xl font-bold text-foreground mb-1">
                    Chris Heppard
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    Full-Stack Developer & Security Specialist
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    Cincinnati, Ohio
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Bridging the gap between immersive 3D design and
                    enterprise-grade security.
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="glass rounded-2xl p-8">
              <h3 className="font-orbitron text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Certifications
              </h3>
              <div className="space-y-3">
                {[
                  'CompTIA Security+',
                  'AWS Certified Solutions Architect',
                  'Certified Ethical Hacker (CEH)',
                  'OSCP (In Progress)',
                ].map((cert) => (
                  <div
                    key={cert}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid grid md:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="stat-card glass rounded-2xl p-6 relative overflow-hidden group"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-0.5 mb-4`}
                >
                  <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-orbitron text-lg font-bold text-foreground mb-2">
                  {stat.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
