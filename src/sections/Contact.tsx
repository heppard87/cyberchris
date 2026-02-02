import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, User, Mail, MessageSquare, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.contact-heading',
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

      // Form animation
      gsap.fromTo(
        '.contact-form',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
          },
        }
      );

      // Info cards animation
      gsap.fromTo(
        '.info-card',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.info-cards',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Message Transmitted',
      description: 'Your message has been sent successfully.',
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="contact-heading text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-orbitron text-cyan-400 mb-4">
            <Terminal className="w-3 h-3" />
            ESTABLISHING CONNECTION...
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Initialize Contact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your digital presence? Let's discuss how we can
            help.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="contact-form glass rounded-2xl p-8"
            >
              <div className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                    <User className="w-4 h-4" />
                    <span className="font-orbitron">IDENTITY</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your name..."
                      required
                      className={`bg-muted/50 border-border focus:border-primary transition-all duration-300 ${
                        focusedField === 'name' ? 'glow-blue' : ''
                      }`}
                    />
                    {focusedField === 'name' && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 animate-pulse">
                        |
                      </span>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                    <Mail className="w-4 h-4" />
                    <span className="font-orbitron">COMMUNICATION_CHANNEL</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="your@email.com"
                      required
                      className={`bg-muted/50 border-border focus:border-primary transition-all duration-300 ${
                        focusedField === 'email' ? 'glow-blue' : ''
                      }`}
                    />
                    {focusedField === 'email' && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 animate-pulse">
                        |
                      </span>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-orbitron">DATA_PACKET</span>
                  </label>
                  <div className="relative">
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Describe your project requirements..."
                      required
                      rows={5}
                      className={`bg-muted/50 border-border focus:border-primary transition-all duration-300 resize-none ${
                        focusedField === 'message' ? 'glow-blue' : ''
                      }`}
                    />
                    {focusedField === 'message' && (
                      <span className="absolute right-3 bottom-3 text-cyan-400 animate-pulse">
                        |
                      </span>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-orbitron py-6 rounded-lg glow-blue transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        TRANSMIT MESSAGE
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
              </div>
            </form>
          </div>

          {/* Info Cards */}
          <div className="lg:col-span-2 info-cards space-y-4">
            {/* Quick Response */}
            <div className="info-card glass rounded-2xl p-6">
              <h3 className="font-orbitron text-lg font-bold text-foreground mb-2">
                Quick Response
              </h3>
              <p className="text-sm text-muted-foreground">
                I typically respond within 24 hours. For urgent inquiries,
                please mention it in your message.
              </p>
            </div>

            {/* Location */}
            <div className="info-card glass rounded-2xl p-6">
              <h3 className="font-orbitron text-lg font-bold text-foreground mb-2">
                Location
              </h3>
              <p className="text-sm text-muted-foreground">
                Based in Cincinnati, Ohio
                <br />
                Serving clients worldwide
              </p>
            </div>

            {/* Availability */}
            <div className="info-card glass rounded-2xl p-6">
              <h3 className="font-orbitron text-lg font-bold text-foreground mb-2">
                Availability
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">
                  Currently Available
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Open for new projects and collaborations.
              </p>
            </div>

            {/* Direct Contact */}
            <div className="info-card glass rounded-2xl p-6">
              <h3 className="font-orbitron text-lg font-bold text-foreground mb-2">
                Direct Contact
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  Email:{' '}
                  <a
                    href="mailto:chris@cybersolutionsohio.com"
                    className="text-primary hover:underline"
                  >
                    chris@cybersolutionsohio.com
                  </a>
                </p>
                <p className="text-muted-foreground">
                  GitHub:{' '}
                  <a
                    href="https://github.com/heppard87"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    @heppard87
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
