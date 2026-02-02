import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Globe,
  Shield,
  Palette,
  Brain,
  BarChart3,
  Cloud,
  Code2,
  Lock,
  Sparkles,
  Database,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Building responsive, high-performance websites.',
    fullDescription:
      'Custom web applications built with modern frameworks like React, Vue, and Next.js. Responsive design, performance optimization, and SEO best practices ensure your site stands out.',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Full-stack React/Node solutions',
      'Custom animations',
      'SEO optimization',
      'Progressive Web Apps',
    ],
  },
  {
    id: 2,
    title: 'Cybersecurity Audits',
    description: 'Identifying & mitigating vulnerabilities.',
    fullDescription:
      'Comprehensive security assessments identifying vulnerabilities across your infrastructure. Detailed reports with actionable recommendations to strengthen your security posture.',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    features: [
      'Vulnerability Assessment',
      'Security Reports',
      'Compliance Audits',
      'Risk Analysis',
    ],
  },
  {
    id: 3,
    title: 'UI/UX Design',
    description: 'Intuitive and engaging user experiences.',
    fullDescription:
      'User-centered design that combines aesthetic excellence with intuitive functionality. Wireframing, prototyping, and user testing ensure optimal experiences.',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    features: [
      'Wireframing',
      'Prototyping',
      'User Testing',
      'Design Systems',
    ],
  },
  {
    id: 4,
    title: 'AI & Automation',
    description: 'Leverage the power of AI to streamline operations.',
    fullDescription:
      'Custom machine learning models and intelligent chatbots for your business. Automate repetitive tasks and gain insights from your data.',
    icon: Brain,
    color: 'from-green-500 to-emerald-500',
    features: [
      'Custom ML models',
      'Intelligent chatbots',
      'Process automation',
      'Data insights',
    ],
  },
  {
    id: 5,
    title: 'Data Analytics',
    description: 'Turn your data into actionable insights.',
    fullDescription:
      'Real-time dashboards, predictive analytics, and visualization tools. Transform raw data into meaningful business intelligence.',
    icon: BarChart3,
    color: 'from-yellow-500 to-amber-500',
    features: [
      'Real-time dashboards',
      'Predictive analytics',
      'Visualization tools',
      'Business intelligence',
    ],
  },
  {
    id: 6,
    title: 'Cloud Migration',
    description: 'Seamless transition to the cloud.',
    fullDescription:
      'Secure AWS, Azure, and Google Cloud hosting and migration strategies. Scalable, cost-effective infrastructure that grows with your business.',
    icon: Cloud,
    color: 'from-indigo-500 to-violet-500',
    features: [
      'Cloud Migration',
      'Architecture Design',
      'Cost Optimization',
      'Multi-Cloud Strategy',
    ],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Web', 'Security', 'Cloud', 'AI', 'Data'];

  const filteredServices =
    activeFilter === 'All'
      ? services
      : services.filter((s) =>
          s.title.toLowerCase().includes(activeFilter.toLowerCase())
        );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.services-heading',
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

      // Cards stagger animation
      gsap.fromTo(
        '.service-card',
        { y: 80, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredServices]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="services-heading text-center mb-16">
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer a range of solutions designed to meet the diverse needs of
            modern businesses.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="service-card group relative perspective-1000"
              >
                <div className="flip-card h-full">
                  <div className="flip-card-inner relative w-full h-full min-h-[320px]">
                    {/* Front */}
                    <div className="flip-card-front absolute inset-0 glass rounded-2xl p-6 flex flex-col">
                      {/* Gradient Background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                      />

                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} p-0.5 mb-4`}
                      >
                        <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                          <Icon className="w-6 h-6 text-foreground" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="font-orbitron text-xl font-bold text-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm flex-grow">
                        {service.description}
                      </p>

                      {/* Flip Hint */}
                      <div className="mt-4 text-xs text-muted-foreground/60 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Click to Flip
                      </div>

                      {/* Animated Border */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.color} opacity-20`}
                        />
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className={`flip-card-back absolute inset-0 glass rounded-2xl p-6 flex flex-col bg-gradient-to-br ${service.color}`}
                    >
                      <div className="absolute inset-0 bg-background/95 rounded-2xl" />

                      <div className="relative z-10 flex flex-col h-full">
                        <h3 className="font-orbitron text-lg font-bold text-foreground mb-3">
                          Capabilities
                        </h3>

                        <ul className="space-y-2 flex-grow">
                          {service.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <Code2 className="w-3 h-3 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 w-full group/btn"
                          onClick={() => setSelectedService(service)}
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Dialog */}
      <Dialog
        open={!!selectedService}
        onOpenChange={() => setSelectedService(null)}
      >
        <DialogContent className="glass max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-orbitron text-2xl flex items-center gap-3">
              {selectedService && (
                <>
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedService.color} p-0.5`}
                  >
                    <div className="w-full h-full bg-background rounded-[8px] flex items-center justify-center">
                      <selectedService.icon className="w-5 h-5" />
                    </div>
                  </div>
                  {selectedService.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground pt-4">
              {selectedService?.fullDescription}
            </DialogDescription>
          </DialogHeader>

          {selectedService && (
            <div className="mt-4">
              <h4 className="font-orbitron text-sm text-foreground mb-3">
                Key Features
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedService.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
                  >
                    <Lock className="w-3 h-3 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6 glow-blue">
                <Database className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
