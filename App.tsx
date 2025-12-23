
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS, SERVICES, NAV_LINKS } from './constants';
import { AIDesignConsultant } from './components/AIDesignConsultant';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Track active section for nav highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'services', 'pricing', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-background-light dark:bg-background-dark border-b border-subtle-light dark:border-subtle-dark">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 group transition-transform hover:scale-105">
            <span className="text-xl font-bold tracking-tighter uppercase display-font group-hover:text-primary transition-colors text-gray-900 dark:text-white">
              DrewVerse<br/><span className="text-primary text-xs tracking-widest">Design</span>
            </span>
          </a>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {NAV_LINKS.map(link => (
            <a 
              key={link.href} 
              className={`transition-all duration-300 hover:text-primary hover:scale-110 ${activeSection === link.href.replace('#', '') ? 'text-primary font-bold' : 'text-gray-600 dark:text-gray-400'}`} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
        
        <a 
          className="hidden md:block bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40" 
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          START PROJECT
        </a>

        {/* Hamburger Icon */}
        <button 
          className="md:hidden p-2 text-gray-600 dark:text-gray-300 relative z-[60] transition-transform duration-300 hover:scale-110"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined transition-transform duration-300" style={{ transform: isMenuOpen ? 'rotate(90deg)' : 'none' }}>
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[55] transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ backdropFilter: isMenuOpen ? 'blur(8px)' : 'blur(0px)' }}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar Content - 500ms Slide from Left */}
      <div 
        className={`fixed top-0 left-0 h-full w-[300px] bg-white dark:bg-[#121212] shadow-[20px_0_50px_rgba(0,0,0,0.3)] z-[58] transition-transform duration-500 ease-in-out md:hidden will-change-transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-8 pt-24">
          <div className="mb-10">
            <span className={`text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6 block border-b border-gray-100 dark:border-gray-800 pb-2 transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 delay-300' : 'opacity-0'}`}>
              Navigation
            </span>
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link, idx) => (
                <a 
                  key={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)} 
                  className={`text-3xl font-bold display-font transition-all duration-500 uppercase py-2 block hover:translate-x-2 ${
                    activeSection === link.href.replace('#', '') ? 'text-primary' : 'text-gray-900 dark:text-white hover:text-primary'
                  } ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: isMenuOpen ? `${100 + idx * 50}ms` : '0ms' }}
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          
          <div className={`mt-auto space-y-8 transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-4'}`}>
            <a 
              onClick={(e) => handleNavClick(e, '#contact')} 
              className="flex items-center justify-center bg-primary text-white px-6 py-4 rounded-xl w-full text-center font-bold text-sm uppercase tracking-widest shadow-lg shadow-orange-500/30 active:scale-95 hover:scale-[1.05] hover:shadow-orange-500/50 transition-all duration-300" 
              href="#contact"
            >
              Start Project
            </a>
            
            <div className="flex justify-between items-center px-2">
              <div className="flex gap-6 text-gray-500 dark:text-gray-400">
                <button onClick={() => alert('Social media links coming soon!')} className="material-symbols-outlined hover:text-primary hover:scale-125 cursor-pointer transition-all">language</button>
                <button onClick={() => alert('Share functionality integrated soon.')} className="material-symbols-outlined hover:text-primary hover:scale-125 cursor-pointer transition-all">share</button>
                <a href="mailto:drewversedesign@gmail.com" className="material-symbols-outlined hover:text-primary hover:scale-125 cursor-pointer transition-all">mail</a>
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                Kampala, UG
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section className="pt-32 pb-20 px-6 bg-white dark:bg-black/20" id="home">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-700 group-hover:duration-300"></div>
            <div className="relative bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
              <img 
                alt="Abstract 3D design showing digital growth" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcmS4O4M9VmDBK3LNUZKq9GKfvE6e3GR4CiPVXotWK6EJ4iX6cP5HyLLt61jgbZrJBhzqqCdK1anwRMg1VVAwRiZqI1OLvYIu6cb3DKn-eSuvPNAIJdODRCTXHbqlSicdZq0lA9_esuNqfdMwTpom1O9RLhyhK6o3ufCoaNw1GWID-GRv9hfSuXG6NXYHJYhHH2HsC-5AANJFMvVUqyx0hikGkt5n_fHCDYUn6V6iDp6QuhV0QUBZr7sEFzGBjSkwbvnkYhy-z5OT7"
              />
              <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl text-white max-w-[180px]">
                <p className="text-primary font-bold text-lg mb-1">DrewVerse Design</p>
                <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-2/3"></div>
                </div>
              </div>
              <div className="absolute top-6 left-6 text-white drop-shadow-lg">
                <p className="text-xs uppercase tracking-widest opacity-80">Since</p>
                <h2 className="text-4xl font-bold display-font">2023</h2>
                <p className="text-xs opacity-60">Established in Kampala</p>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div id="about" className="inline-block px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-xs font-semibold tracking-wider uppercase">
              About DrewVerse
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight display-font uppercase">
              Empowering <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Digital Growth</span>
            </h1>
            <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                DrewVerse Design is a creative digital agency based in Kampala, Uganda. Since 2023, we've been dedicated to delivering high-quality, affordable digital solutions for startups and small businesses looking to enhance their online presence.
              </p>
            </div>
            <a 
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide border-b-2 border-primary pb-1 hover:text-primary hover:scale-110 transition-all duration-300 cursor-pointer" 
              onClick={(e) => handleScroll(e, 'services')}
              href="#services"
            >
              Explore Services
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
            <div className="grid grid-cols-3 gap-4 pt-8">
              <StatCard icon="groups" count="50+" label="Happy Clients" />
              <StatCard icon="inventory_2" count="6+" label="Services Offered" />
              <StatCard icon="award_star" count="3+" label="Years Experience" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard: React.FC<{ icon: string, count: string, label: string }> = ({ icon, count, label }) => (
  <div className="bg-black text-white p-6 rounded-xl flex flex-col justify-between aspect-square hover:-translate-y-2 hover:scale-105 transition-all duration-300 border border-white/5 cursor-default hover:shadow-2xl hover:shadow-primary/20">
    <span className="material-symbols-outlined text-gray-400">{icon}</span>
    <div>
      <h3 className="text-2xl md:text-3xl font-bold display-font">{count}</h3>
      <p className="text-[10px] uppercase tracking-wider text-gray-400">{label}</p>
    </div>
  </div>
);

const Portfolio: React.FC = () => {
  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-background-light dark:bg-[#0F0F0F]" id="portfolio">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-black/40 text-xs font-semibold tracking-wider uppercase">
            Our Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold display-font uppercase text-gray-900 dark:text-white">Portfolio</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-sm">
            Explore our portfolio of successful digital solutions that have helped businesses achieve their goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map(project => (
            <div key={project.id} className="group">
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden border border-subtle-light dark:border-subtle-dark hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 hover:scale-[1.02] cursor-pointer">
                <div className="h-60 overflow-hidden relative">
                  {/* Subtle zoom effect on hover */}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold display-font uppercase group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <a 
            className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/60" 
            href="#contact"
            onClick={(e) => handleScroll(e, 'contact')}
          >
            Start Your Project <span className="material-symbols-outlined align-bottom text-lg ml-1">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
};

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLearnMore = (title: string) => {
    // Dispatch a custom event to communicate with the AIDesignConsultant
    window.dispatchEvent(new CustomEvent('open-ai-consultant', { 
      detail: { service: title } 
    }));
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-background-dark overflow-hidden" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-black/40 text-xs font-semibold tracking-wider uppercase text-gray-600 dark:text-gray-400">
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold display-font uppercase text-gray-900 dark:text-white">Digital Solutions</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-sm">
            From concept to creation, we bring your vision to life with creativity and precision.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <div 
              key={service.id} 
              className={`bg-gray-50 dark:bg-surface-dark p-8 rounded-xl border border-transparent hover:border-primary/30 transition-all duration-500 group hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined">{service.icon}</span>
              </div>
              <h3 className="text-xl font-bold display-font uppercase mb-3 leading-tight transition-colors group-hover:text-primary text-gray-900 dark:text-white">{service.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{service.description}</p>
              <button 
                onClick={() => handleLearnMore(service.title)}
                className="text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:gap-3 transition-all hover:scale-110"
              >
                Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const handleScrollToContact = (plan: string) => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: '$59',
      annualPrice: '$49',
      desc: 'Perfect for startups and small business landing pages.',
      features: isAnnual 
        ? ['Single Page Landing', 'Basic SEO Setup', 'Mobile Responsive', 'Email Integration', '5 Revisions', 'Standard Support']
        : ['Single Page Landing', 'Basic SEO Setup', 'Mobile Responsive', 'Email Integration', '3 Revisions'],
      popular: false
    },
    {
      name: 'Professional',
      monthlyPrice: '$179',
      annualPrice: '$149',
      desc: 'Comprehensive solution for growing digital presence.',
      features: isAnnual
        ? ['Up to 10 Pages', 'Full SEO Optimization', 'CMS Integration', 'Social Media Sync', 'Priority 24/7 Support', 'Unlimited Revisions', 'Quarterly Audit']
        : ['Up to 5 Pages', 'Full SEO Optimization', 'CMS Integration', 'Social Media Sync', 'Contact Form Support', 'Unlimited Revisions'],
      popular: true
    },
    {
      name: 'Enterprise',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      desc: 'High-scale web applications and custom mobile apps.',
      features: ['Unlimited Pages', 'Full Branding Suite', 'E-commerce Capability', 'API Integrations', 'Dedicated Support Manager', '24/7 Monitoring', 'Dedicated IP'],
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-background-light dark:bg-[#0A0A0A]" id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-black/40 text-xs font-semibold tracking-wider uppercase text-gray-600 dark:text-gray-400">
            Pricing Plans
          </div>
          <h2 className="text-4xl md:text-5xl font-bold display-font uppercase text-gray-900 dark:text-white">Choose Your Growth</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-sm">
            Retainer-based solutions to keep your digital edge sharp. Save up to 20% with annual billing.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${!isAnnual ? 'text-primary' : 'text-gray-500'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 bg-gray-200 dark:bg-subtle-dark rounded-full relative transition-colors duration-300 focus:outline-none hover:ring-2 hover:ring-primary/20"
            aria-label="Toggle Billing Cycle"
          >
            <div className={`absolute top-1 left-1 w-5 h-5 bg-primary rounded-full transition-transform duration-300 ease-in-out shadow-md ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`}></div>
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${isAnnual ? 'text-primary' : 'text-gray-500'}`}>Annual</span>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter animate-pulse">Save 20%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-8 rounded-2xl transition-all duration-500 hover:-translate-y-4 border ${
                plan.popular 
                  ? 'bg-white dark:bg-surface-dark border-primary shadow-2xl shadow-orange-500/10 z-10' 
                  : 'bg-white/50 dark:bg-surface-dark/50 border-subtle-light dark:border-subtle-dark'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-bold uppercase px-4 py-1 rounded-full tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold display-font uppercase mb-2 dark:text-white">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4 overflow-hidden h-10 relative">
                  <div className={`flex flex-col transition-transform duration-500 ease-in-out ${isAnnual ? '-translate-y-10' : 'translate-y-0'}`}>
                    <span className="text-4xl font-bold display-font text-gray-900 dark:text-white h-10 flex items-center">{plan.monthlyPrice}</span>
                    <span className="text-4xl font-bold display-font text-gray-900 dark:text-white h-10 flex items-center">{plan.annualPrice}</span>
                  </div>
                  {plan.monthlyPrice !== 'Custom' && <span className="text-gray-500 text-xs self-end mb-1">/ {isAnnual ? 'mo billed annually' : 'month'}</span>}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed min-h-[40px]">{plan.desc}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="material-symbols-outlined text-primary text-lg flex-shrink-0">check_circle</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleScrollToContact(plan.name)}
                className={`w-full py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all duration-300 transform hover:scale-[1.05] hover:shadow-2xl ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-orange-500/30' 
                    : 'bg-gray-100 dark:bg-subtle-dark text-gray-900 dark:text-white hover:bg-primary hover:text-white'
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process: React.FC = () => {
  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-background-light dark:bg-[#0F0F0F]">
      <div className="container mx-auto px-6">
        <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 md:p-12 border border-subtle-light dark:border-subtle-dark flex flex-col lg:flex-row gap-12 text-gray-900 dark:text-white">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold display-font uppercase">Our Design Process</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Our approach is collaborative and iterative, ensuring your digital solution perfectly aligns with your business goals and user needs.
            </p>
            <a 
              className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-orange-500/30" 
              href="#contact"
              onClick={(e) => handleScroll(e, 'contact')}
            >
              Start Project <span className="material-symbols-outlined align-bottom text-lg ml-1">arrow_forward</span>
            </a>
          </div>
          <div className="lg:w-1/2 grid gap-6">
            {[
              { id: '01', title: 'Discovery', desc: 'Understanding your goals and requirements' },
              { id: '02', title: 'Design', desc: 'Creating the perfect user experience' },
              { id: '03', title: 'Development', desc: 'Building with modern technologies' },
              { id: '04', title: 'Deployment', desc: 'Launch and continuous support' }
            ].map(step => (
              <div key={step.id} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 hover:scale-[1.05] hover:-translate-x-1 cursor-default group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-sm text-gray-500 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  {step.id}
                </div>
                <div>
                  <h4 className="font-bold uppercase mb-1 display-font dark:text-gray-100 group-hover:text-primary transition-colors">{step.title}</h4>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: 'Select a service', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.service === 'Select a service') newErrors.service = 'Please select a service';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setFormState('loading');
    // Mock API call
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', phone: '', service: 'Select a service', message: '' });
      setTimeout(() => setFormState('idle'), 5000);
    }, 1500);
  };

  return (
    <footer className="bg-black text-white pt-20 pb-8" id="contact">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-8">
            <div className="inline-block px-3 py-1 rounded border border-gray-700 text-[10px] font-bold tracking-widest uppercase">
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase display-font leading-tight">
              Let's Build <br/> Something <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Extraordinary</span>
            </h2>
            <div className="space-y-6 pt-4 text-gray-300">
              <ContactInfo icon="mail" label="Email" value="drewversedesign@gmail.com" href="mailto:drewversedesign@gmail.com" />
              <ContactInfo icon="call" label="Phone" value="+256 772 653 789" href="tel:+256772653789" />
              <ContactInfo icon="location_on" label="Office" value="Kampala, Uganda" />
            </div>
          </div>
          <div className="bg-[#121212] p-8 rounded-2xl border border-gray-800">
            <h3 className="text-xl font-bold uppercase display-font mb-6">Request A Consultation</h3>
            <form className="space-y-5" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField 
                  name="name" 
                  label="Name" 
                  placeholder="Your name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  error={errors.name}
                />
                <FormField 
                  name="email" 
                  label="Email" 
                  placeholder="Your email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  error={errors.email}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField 
                  name="phone" 
                  label="Phone" 
                  placeholder="Your phone" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                />
                <div className="space-y-2">
                  <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Service</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={`w-full bg-[#1A1A1A] border rounded p-3 text-sm transition-all focus:ring-1 outline-none ${
                      errors.service ? 'border-red-500/50 focus:ring-red-500 text-red-200' : 'border-transparent focus:ring-primary text-gray-400 focus:bg-[#252525]'
                    }`}
                  >
                    <option>Select a service</option>
                    <option>Web Design</option>
                    <option>App Development</option>
                    <option>Branding</option>
                    <option>SEO</option>
                  </select>
                  {errors.service && <p className="text-[10px] text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.service}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full bg-[#1A1A1A] border rounded p-3 text-sm text-white placeholder-gray-600 focus:ring-1 outline-none transition-all ${
                    errors.message ? 'border-red-500/50 focus:ring-red-500 focus:bg-[#250000]' : 'border-transparent focus:ring-primary focus:bg-[#252525]'
                  }`} 
                  placeholder="Tell us about your project" 
                  rows={4}
                ></textarea>
                {errors.message && <p className="text-[10px] text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.message}</p>}
              </div>
              <button 
                disabled={formState === 'loading'}
                className={`w-full ${formState === 'success' ? 'bg-green-600' : 'bg-primary hover:bg-primary-hover'} text-white py-3 rounded text-sm font-bold uppercase tracking-wide transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2`} 
                type="submit"
              >
                {formState === 'loading' ? (
                  <>Processing <span className="animate-spin material-symbols-outlined text-sm">autorenew</span></>
                ) : formState === 'success' ? (
                  <>Message Sent! <span className="material-symbols-outlined text-sm">check_circle</span></>
                ) : (
                  <>Send Message <span className="material-symbols-outlined text-sm">send</span></>
                )}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-10 pb-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-gray-400">
          <FooterColumn title="About" links={['Our Story', 'Blog', 'Careers']} handleScroll={(e, id) => { e.preventDefault(); const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' }); }} />
          <FooterColumn title="Services" links={['Web Development', 'Mobile Apps', 'UI/UX Design', 'Branding']} handleScroll={(e, id) => { e.preventDefault(); const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' }); }} />
          <FooterColumn title="Portfolio" links={['Latest Work', 'Case Studies']} handleScroll={(e, id) => { e.preventDefault(); const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' }); }} />
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase mb-2">Contact</h4>
            <ul className="space-y-2">
              <li className="hover:text-primary transition-colors cursor-default">drewversedesign@gmail.com</li>
              <li className="hover:text-primary transition-colors cursor-default">+256 772 653 789</li>
              <li className="hover:text-primary transition-colors cursor-default">Kampala, Uganda</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600">
          <p>© 2024 DrewVerse Design. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button onClick={() => alert('Privacy Policy updated March 2024')} className="hover:text-white transition-all hover:scale-110">Privacy Policy</button>
            <button onClick={() => alert('Terms of Service are available upon request.')} className="hover:text-white transition-all hover:scale-110">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ContactInfo: React.FC<{ icon: string, label: string, value: string, href?: string }> = ({ icon, label, value, href }) => (
  <div className="flex items-start gap-4 group cursor-default">
    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:bg-primary group-hover:text-white text-gray-400">
      <span className="material-symbols-outlined text-sm">{icon}</span>
    </div>
    <div>
      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 group-hover:text-gray-300 transition-colors">{label}</p>
      {href ? (
        <a className="text-sm font-medium hover:text-primary transition-all inline-block hover:translate-x-1" href={href}>{value}</a>
      ) : (
        <p className="text-sm font-medium group-hover:text-white transition-colors">{value}</p>
      )}
    </div>
  </div>
);

const FormField: React.FC<{ 
  label: string, 
  placeholder: string, 
  type?: string, 
  name: string, 
  value: string, 
  onChange: (e: any) => void, 
  error?: string 
}> = ({ label, placeholder, type = 'text', name, value, onChange, error }) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">{label}</label>
    <input 
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full bg-[#1A1A1A] border rounded p-3 text-sm text-white placeholder-gray-600 focus:ring-1 outline-none transition-all ${
        error ? 'border-red-500/50 focus:ring-red-500 focus:bg-[#250000]' : 'border-transparent focus:ring-primary focus:bg-[#252525] hover:bg-[#202020]'
      }`} 
      placeholder={placeholder} 
      type={type} 
    />
    {error && <p className="text-[10px] text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{error}</p>}
  </div>
);

const FooterColumn: React.FC<{ title: string, links: string[], handleScroll: (e: any, id: string) => void }> = ({ title, links, handleScroll }) => (
  <div className="space-y-4">
    <h4 className="text-white font-bold uppercase mb-2">{title}</h4>
    <ul className="space-y-2">
      {links.map(l => (
        <li key={l}>
          <a 
            className="hover:text-primary transition-all duration-300 cursor-pointer block hover:translate-x-2" 
            onClick={(e) => handleScroll(e, title.toLowerCase())}
            href={`#${title.toLowerCase()}`}
          >
            {l}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Portfolio />
      <Services />
      <Pricing />
      <Process />
      <Footer />
      <AIDesignConsultant />
    </div>
  );
};

export default App;
