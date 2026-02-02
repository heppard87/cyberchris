import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  User,
  Search,
  Filter,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Building Immersive 3D Experiences with Three.js',
    excerpt:
      'Learn how to create stunning 3D web applications using Three.js and React Three Fiber. From basic scenes to complex interactions.',
    content: `
      <p>Three.js has revolutionized the way we create 3D experiences on the web. In this comprehensive guide, we'll explore the fundamentals of building immersive 3D applications.</p>
      
      <h3>Getting Started with Three.js</h3>
      <p>Three.js is a powerful JavaScript library that makes WebGL accessible. Whether you're building games, data visualizations, or interactive art, Three.js provides the tools you need.</p>
      
      <h3>Setting Up Your First Scene</h3>
      <p>Every Three.js application needs three basic components: a scene, a camera, and a renderer. Let's dive into how these work together to create your first 3D experience.</p>
      
      <h3>Adding Interactivity</h3>
      <p>Static 3D scenes are impressive, but interactive experiences are unforgettable. We'll explore raycasting, orbit controls, and animation loops.</p>
      
      <h3>Performance Optimization</h3>
      <p>Creating smooth 3D experiences requires understanding draw calls, texture optimization, and level-of-detail techniques.</p>
    `,
    author: 'Chris Heppard',
    date: '2026-01-15',
    readTime: '8 min read',
    category: 'Development',
    tags: ['Three.js', 'WebGL', 'React', '3D'],
    image: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'Cybersecurity Best Practices for Web Developers',
    excerpt:
      'Essential security measures every web developer should implement to protect their applications and users from common vulnerabilities.',
    content: `
      <p>Security should never be an afterthought in web development. This guide covers the essential practices to keep your applications safe.</p>
      
      <h3>Input Validation and Sanitization</h3>
      <p>Never trust user input. Learn how to properly validate and sanitize all data coming from users to prevent injection attacks.</p>
      
      <h3>Authentication and Authorization</h3>
      <p>Implementing secure authentication is crucial. We'll cover JWT tokens, session management, and multi-factor authentication.</p>
      
      <h3>HTTPS and Secure Headers</h3>
      <p>Understanding the importance of HTTPS and security headers like CSP, HSTS, and X-Frame-Options.</p>
      
      <h3>Common Vulnerabilities</h3>
      <p>A deep dive into OWASP Top 10 vulnerabilities and how to prevent them in your applications.</p>
    `,
    author: 'Chris Heppard',
    date: '2026-01-10',
    readTime: '12 min read',
    category: 'Security',
    tags: ['Cybersecurity', 'Web Security', 'OWASP', 'Best Practices'],
    image: 'from-red-500 to-orange-500',
  },
  {
    id: 3,
    title: 'The Future of AI in Web Development',
    excerpt:
      'Exploring how artificial intelligence is transforming the way we build and interact with web applications.',
    content: `
      <p>AI is not just a buzzword—it's fundamentally changing how we approach web development. From code generation to user experience, the impact is profound.</p>
      
      <h3>AI-Powered Development Tools</h3>
      <p>From GitHub Copilot to ChatGPT, AI assistants are becoming indispensable for developers. Learn how to leverage these tools effectively.</p>
      
      <h3>Machine Learning in the Browser</h3>
      <p>TensorFlow.js and other libraries are bringing ML to the client side. Discover the possibilities of running AI models directly in browsers.</p>
      
      <h3>Personalized User Experiences</h3>
      <p>AI enables truly personalized web experiences. We'll explore recommendation engines, adaptive interfaces, and predictive analytics.</p>
    `,
    author: 'Chris Heppard',
    date: '2026-01-05',
    readTime: '6 min read',
    category: 'AI',
    tags: ['Artificial Intelligence', 'Machine Learning', 'Future Tech'],
    image: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    title: 'Creating Smooth Animations with GSAP',
    excerpt:
      'Master the GreenSock Animation Platform to create buttery-smooth animations that bring your web projects to life.',
    content: `
      <p>GSAP is the industry standard for web animations. This tutorial will take you from basics to advanced techniques.</p>
      
      <h3>Understanding Timelines</h3>
      <p>Timelines are the heart of GSAP. Learn how to sequence animations and create complex choreography.</p>
      
      <h3>ScrollTrigger Magic</h3>
      <p>Create scroll-based animations that respond to user scrolling. From parallax effects to reveal animations.</p>
      
      <h3>Performance Considerations</h3>
      <p>Animations should be smooth, not janky. Learn about will-change, transform vs position, and GPU acceleration.</p>
    `,
    author: 'Chris Heppard',
    date: '2025-12-28',
    readTime: '10 min read',
    category: 'Development',
    tags: ['GSAP', 'Animation', 'JavaScript', 'UI/UX'],
    image: 'from-green-500 to-emerald-500',
  },
  {
    id: 5,
    title: 'Cloud Architecture Patterns for Startups',
    excerpt:
      'Design scalable, cost-effective cloud infrastructure that grows with your business from day one.',
    content: `
      <p>Building for scale from the start doesn't have to break the bank. Learn cloud architecture patterns that work for startups.</p>
      
      <h3>Serverless First</h3>
      <p>Why serverless architectures are perfect for startups. Pay only for what you use and scale automatically.</p>
      
      <h3>Microservices vs Monoliths</h3>
      <p>When to choose each approach and how to migrate between them as your startup grows.</p>
      
      <h3>Cost Optimization Strategies</h3>
      <p>Practical tips for keeping cloud costs under control while maintaining performance and reliability.</p>
    `,
    author: 'Chris Heppard',
    date: '2025-12-20',
    readTime: '15 min read',
    category: 'Cloud',
    tags: ['Cloud', 'AWS', 'Architecture', 'Startups'],
    image: 'from-yellow-500 to-amber-500',
  },
  {
    id: 6,
    title: 'My Journey into Penetration Testing',
    excerpt:
      'A personal account of transitioning from web development to ethical hacking and what I learned along the way.',
    content: `
      <p>The path from developer to security professional is challenging but rewarding. Here's my story and the lessons learned.</p>
      
      <h3>Why I Made the Switch</h3>
      <p>After years of building applications, I wanted to understand how to break them. The mindset shift was significant.</p>
      
      <h3>Certifications That Matter</h3>
      <p>From CompTIA Security+ to OSCP, which certifications provide real value and which are just resume padding.</p>
      
      <h3>The Bug Bounty Experience</h3>
      <p>Participating in bug bounty programs taught me more than any course. Real-world hunting is where skills are forged.</p>
    `,
    author: 'Chris Heppard',
    date: '2025-12-15',
    readTime: '7 min read',
    category: 'Security',
    tags: ['Penetration Testing', 'Career', 'Ethical Hacking', 'Personal'],
    image: 'from-indigo-500 to-violet-500',
  },
];

const categories = ['All', 'Development', 'Security', 'AI', 'Cloud'];

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-heading',
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
        '.blog-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blog-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="blog-heading text-center mb-12">
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Dev Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on web development, security, and
            emerging technologies.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          {/* Search */}
          <div className="relative flex-grow max-w-md mx-auto sm:mx-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="blog-card group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] h-full flex flex-col">
                {/* Image/Gradient Header */}
                <div
                  className={`h-48 bg-gradient-to-br ${post.image} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-orbitron bg-background/80 text-foreground">
                      {post.category}
                    </span>
                  </div>
                  
                  {/* Animated pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 grid-bg" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-orbitron text-lg font-bold text-foreground mb-2 group-hover:text-glow-blue transition-all line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center text-sm text-primary font-medium group-hover:underline">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Hover Glow */}
                <div
                  className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${post.image} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10`}
                />
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No articles found matching your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Blog Post Dialog */}
      <Dialog
        open={!!selectedPost}
        onOpenChange={() => setSelectedPost(null)}
      >
        <DialogContent className="glass max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <>
              {/* Header Image */}
              <div
                className={`h-48 -mx-6 -mt-6 mb-6 bg-gradient-to-br ${selectedPost.image} relative`}
              >
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="px-3 py-1 rounded-full text-xs font-orbitron bg-background/80 text-foreground mb-2 inline-block">
                    {selectedPost.category}
                  </span>
                  <DialogHeader>
                    <DialogTitle className="font-orbitron text-2xl text-white text-left">
                      {selectedPost.title}
                    </DialogTitle>
                  </DialogHeader>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {selectedPost.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedPost.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedPost.readTime}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              {/* Share/Actions */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-border">
                <Button variant="outline" className="flex-1">
                  Share Article
                </Button>
                <Button className="flex-1 glow-blue">Subscribe to Updates</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
