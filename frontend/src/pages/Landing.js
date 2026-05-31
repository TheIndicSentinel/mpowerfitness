import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Dumbbell, BarChart3, Salad, Flame, Globe, Check, ArrowRight, Target, Users, ChevronRight } from 'lucide-react';
import { LogoFull } from '../components/shared/Logo';
import Footer from '../components/shared/Footer';
import useAuthStore from '../store/authStore';

const ConsultationModal = lazy(() => import('../components/shared/ConsultationModal'));

const Landing = () => {
  const heroRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showConsult, setShowConsult] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user: authUser, isAuthenticated } = useAuthStore();
  const [browserConsultDone, setBrowserConsultDone] = useState(() => {
    try { return localStorage.getItem('mpower-consultation-done') === '1'; } catch { return false; }
  });
  const consultationDone = (isAuthenticated && authUser?.consultationDone) || browserConsultDone;
  const refreshConsultDone = () => {
    try { setBrowserConsultDone(localStorage.getItem('mpower-consultation-done') === '1'); } catch (_) {}
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    { Icon: Zap,       title: 'Smart Workouts',       desc: 'Expert-crafted plans tailored to your goals, level and progress.' },
    { Icon: Dumbbell,  title: 'Expert Trainers',       desc: 'Certified trainers available 1-on-1 for personalized guidance and support.' },
    { Icon: BarChart3, title: 'Progress Intelligence',  desc: 'Deep analytics tracking every rep, calorie and milestone of your journey.' },
    { Icon: Salad,     title: 'Nutrition System',       desc: 'Custom meal plans and calorie tracking aligned with your fitness goals.' },
    { Icon: Flame,     title: 'Streak Gamification',    desc: 'Badges, rewards and streaks that keep you motivated and coming back.' },
    { Icon: Globe,     title: 'Train Anywhere',         desc: 'A fully responsive web platform — train from any phone, tablet or desktop browser.' },
  ];

  const plans = [
    {
      name: 'Starter', price: 499, period: 'month', tag: null,
      features: ['Unlimited workout library', 'Progress & streak tracking', 'Standard nutrition plan', 'Community access', 'Workout reminders'],
      cta: 'Get Started',
    },
    {
      name: 'Pro', price: 1499, period: 'month', tag: 'Most Popular',
      features: ['Everything in Starter', '2 trainer sessions / month', 'Custom workout plans', 'Personalised nutrition', 'Priority support', 'Advanced analytics'],
      cta: 'Go Pro',
    },
    {
      name: 'Elite', price: 2999, period: 'month', tag: 'Premium',
      features: ['Everything in Pro', 'Dedicated personal trainer', 'Weekly 1-on-1 sessions', 'Daily check-ins', 'Body composition analysis', 'Transformation coaching'],
      cta: 'Go Elite',
    },
  ];

  const stats = [
    { value: '5K+', label: 'Active Online Members' },
    { value: '25', label: 'Active Offline Members' },
    { value: '30K+', label: 'Workouts Completed' },
    { value: '₹499', label: 'Plans Start From' },
  ];

  return (
    <div style={{ background: 'var(--deep-black)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* ── Navigation ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled
          ? 'rgba(10,25,49,0.92)'
          : 'linear-gradient(180deg, rgba(10,25,49,0.95) 0%, rgba(10,25,49,0.6) 60%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}>
        <div style={{
          height: 72, display: 'flex', alignItems: 'center',
          padding: '0 clamp(16px, 4vw, 40px)', justifyContent: 'space-between',
          maxWidth: 1280, margin: '0 auto',
        }}>
          <LogoFull height={56} />

          {/* Desktop nav links */}
          <div className="flex items-center gap-md landing-nav-links">
            <a href="#features" className="landing-nav-link">Features</a>
            <a href="#plans" className="landing-nav-link">Plans</a>
            <Link to="/trainer/login" className="landing-nav-link">Trainers</Link>
            <Link to="/admin/login" style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Admin</Link>
          </div>

          {/* Right: CTA buttons + hamburger */}
          <div className="flex items-center gap-sm">
            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
            {/* Hamburger — mobile only */}
            <button
              className="landing-hamburger"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              style={{
                display: 'none', background: 'none', border: '1px solid var(--border)',
                borderRadius: 8, cursor: 'pointer', color: 'var(--text-secondary)',
                padding: '6px 8px', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {mobileMenuOpen
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              }
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div style={{
            background: 'rgba(10,25,49,0.97)', borderTop: '1px solid var(--border)',
            padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <a href="#features" className="landing-mobile-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#plans" className="landing-mobile-link" onClick={() => setMobileMenuOpen(false)}>Plans</a>
            <Link to="/trainer/login" className="landing-mobile-link" onClick={() => setMobileMenuOpen(false)}>Trainers</Link>
            <Link to="/admin/login" style={{ color: 'var(--text-muted)', fontSize: '13px', padding: '10px 4px' }} onClick={() => setMobileMenuOpen(false)}>Admin</Link>
            {!consultationDone && (
              <button className="btn btn-ghost btn-full" style={{ marginTop: 8 }}
                onClick={() => { setMobileMenuOpen(false); setShowConsult(true); }}><Target size={16}/> Free Consultation</button>
            )}
            <Link to="/login" className="btn btn-primary btn-full" style={{ marginTop: 8 }} onClick={() => setMobileMenuOpen(false)}>Login</Link>
          </div>
        )}
      </nav>

      {/* ── Hero — split layout with image ── */}
      <section ref={heroRef} style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: 'clamp(100px,14vw,140px) clamp(16px,5vw,60px) clamp(60px,8vw,80px)',
        position: 'relative', overflow: 'hidden',
        '--mouse-x': '0px', '--mouse-y': '0px'
      }}>
        {/* Background blobs */}
        <div style={{
          position: 'absolute', top: '15%', right: '10%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(46,138,255,0.08) 0%, transparent 70%)',
          transform: 'translate(calc(var(--mouse-x, 0px) * 0.5), calc(var(--mouse-y, 0px) * 0.5))',
          transition: 'transform 0.3s ease', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '5%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(91,168,255,0.07) 0%, transparent 70%)',
          transform: 'translate(calc(var(--mouse-x, 0px) * -0.3), calc(var(--mouse-y, 0px) * -0.3))',
          transition: 'transform 0.3s ease', pointerEvents: 'none'
        }} />

        {/* Grid pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(46,138,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(46,138,255,0.025) 1px, transparent 1px)',
          backgroundSize: '80px 80px', pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }} className="hero-grid">
            {/* Left column — text */}
            <div style={{ animation: 'fadeIn 0.8s ease forwards' }}>
              <div className="badge badge-neon" style={{ marginBottom: 24, display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                <Flame size={14} /> India's most complete fitness platform
              </div>
              <h1 className="display" style={{
                fontSize: 'clamp(42px, 7vw, 96px)',
                lineHeight: 0.95,
                marginBottom: 24,
              }}>
                <span style={{ color: 'var(--text-primary)', display: 'block' }}>Train</span>
                <span style={{ color: 'var(--lime)', display: 'block' }}>Harder.</span>
                <span style={{ color: 'var(--text-primary)', display: 'block' }}>Live</span>
                <span style={{ color: 'var(--orange)', display: 'block' }}>Stronger.</span>
              </h1>
              <p style={{
                fontSize: 'clamp(15px,2vw,18px)', color: 'var(--text-secondary)',
                maxWidth: 480, marginBottom: 36, lineHeight: 1.7,
                fontFamily: 'var(--font-body)', fontWeight: 400,
              }}>
                Personalized workouts, expert trainers, smart nutrition and real results — all in one place.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                {!consultationDone ? (
                  <button onClick={() => setShowConsult(true)} className="btn btn-primary btn-xl" style={{ fontFamily:'var(--font-body)' }}>
                    <Target size={18}/> Free Consultation
                    <ArrowRight size={18}/>
                  </button>
                ) : isAuthenticated ? (
                  <Link to="/user/dashboard" className="btn btn-primary btn-xl">
                    Go to Dashboard <ArrowRight size={18}/>
                  </Link>
                ) : (
                  <Link to="/register" className="btn btn-primary btn-xl">
                    Create Free Account <ArrowRight size={18}/>
                  </Link>
                )}
                <a href="#plans" className="btn btn-ghost btn-xl" style={{ fontFamily:'var(--font-body)' }}>
                  View Plans
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 36 }}>
                <div style={{ display: 'flex' }}>
                  {[
                    'linear-gradient(135deg, #2E8AFF 0%, #1A6FE0 100%)',
                    'linear-gradient(135deg, #5BA8FF 0%, #2E8AFF 100%)',
                    'linear-gradient(135deg, #22D97A 0%, #17A85E 100%)',
                    'linear-gradient(135deg, #FFB020 0%, #E89B00 100%)',
                    'linear-gradient(135deg, #2E8AFF 0%, #5BA8FF 100%)',
                  ].map((bg, i) => (
                    <div key={i} style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: bg,
                      border: '2px solid var(--deep-black)',
                      marginLeft: i > 0 ? -10 : 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 700, color: '#fff',
                      zIndex: 5 - i, position: 'relative'
                    }}>
                      <Users size={14}/>
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>5,000+</strong> members transforming daily
                </span>
              </div>
            </div>

            {/* Right column — hero image */}
            <div style={{
              position: 'relative',
              animation: 'fadeIn 1s ease 0.2s forwards', opacity: 0,
            }} className="hero-image-col">
              <div style={{
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid rgba(46,138,255,0.15)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 80px rgba(46,138,255,0.08)',
                position: 'relative',
              }}>
                <img
                  src="/hero-fitness.png"
                  alt="Athlete training with dumbbells in a modern gym"
                  style={{
                    width: '100%', height: 'auto', display: 'block',
                    objectFit: 'cover', aspectRatio: '1/1',
                  }}
                />
                {/* Gradient overlay to blend bottom into bg */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                  background: 'linear-gradient(to top, var(--deep-black) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}/>
              </div>
              {/* Floating stat card */}
              <div style={{
                position: 'absolute', bottom: 24, left: -20,
                background: 'rgba(10,25,49,0.85)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(46,138,255,0.2)',
                borderRadius: 14, padding: '14px 20px',
                display: 'flex', alignItems: 'center', gap: 12,
                animation: 'slideUp 0.6s ease 0.6s forwards', opacity: 0,
              }} className="hero-float-card">
                <div style={{
                  width: 42, height: 42, borderRadius: 10,
                  background: 'rgba(46,138,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <BarChart3 size={20} color="#2E8AFF"/>
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--t1)', lineHeight: 1 }}>30K+</div>
                  <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Workouts completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{ background: 'var(--carbon)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: 'clamp(24px,4vw,40px)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16 }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', animation: `fadeIn 0.6s ease ${i * 0.1}s forwards`, opacity: 0 }}>
                <div className="display" style={{ fontSize: 48, color: 'var(--lime)', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: 'clamp(60px,8vw,100px) clamp(16px,4vw,40px)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 className="display" style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              marginBottom: 16,
            }}>
              Everything you need to <span style={{ color: 'var(--lime)' }}>win</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 520, margin: '0 auto', fontWeight: 400 }}>
              One platform. Infinite possibilities. Built for the ones who refuse to settle.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {features.map((f, i) => (
              <div key={i} className="card card-hover" style={{
                display: 'flex', flexDirection: 'column', gap: 16,
                animation: `fadeIn 0.6s ease ${i * 0.08}s forwards`, opacity: 0
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 'var(--radius-md)',
                  background: 'rgba(46,138,255,0.08)', border: '1px solid rgba(46,138,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <f.Icon size={24} color="#2E8AFF" strokeWidth={1.8}/>
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' }}>{f.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, fontWeight: 400 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="plans" style={{ padding: 'clamp(60px,8vw,100px) clamp(16px,4vw,40px)', background: 'var(--carbon)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="badge badge-orange" style={{ marginBottom: 16, display: 'inline-flex' }}>Pricing Plans</div>
            <h2 className="display" style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              marginBottom: 16,
            }}>
              Invest in your <span style={{ color: 'var(--orange)' }}>best self</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 480, margin: '0 auto', fontWeight: 400 }}>
              Plans start from just <strong style={{ color: 'var(--lime)' }}>₹499/month</strong> — all in Indian Rupees. Cancel anytime.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, maxWidth: 1000, margin: '0 auto' }}>
            {plans.map((plan, i) => (
              <div key={i} className="card" style={{
                position: 'relative',
                border: plan.tag === 'Most Popular' ? '1px solid rgba(46,138,255,0.4)' : '1px solid var(--border)',
                background: plan.tag === 'Most Popular' ? 'linear-gradient(135deg, rgba(46,138,255,0.05) 0%, var(--surface) 100%)' : undefined,
                transform: plan.tag === 'Most Popular' ? 'scale(1.03)' : undefined,
                animation: `fadeIn 0.6s ease ${i * 0.15}s forwards`, opacity: 0
              }}>
                {plan.tag && (
                  <div className={`badge ${plan.tag === 'Most Popular' ? 'badge-neon' : 'badge-orange'}`} style={{
                    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)'
                  }}>{plan.tag}</div>
                )}
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' }}>{plan.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: 20 }}>₹</span>
                    <span className="display" style={{ fontSize: 48, color: plan.tag === 'Most Popular' ? 'var(--lime)' : 'var(--text-primary)' }}>{plan.price.toLocaleString()}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>/{plan.period}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                      <Check size={16} color="var(--lime)" strokeWidth={2.5}/>
                      <span style={{ color: 'var(--text-secondary)' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/register" className={`btn ${plan.tag === 'Most Popular' ? 'btn-primary' : 'btn-outline'} btn-full`}>
                  {plan.cta} <ChevronRight size={16}/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: 'clamp(60px,8vw,100px) clamp(16px,4vw,40px)',
        background: 'linear-gradient(135deg, rgba(46,138,255,0.06) 0%, transparent 50%, rgba(91,168,255,0.06) 100%)',
        borderTop: '1px solid var(--border)'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="display" style={{
            fontSize: 'clamp(40px, 6vw, 68px)',
            marginBottom: 24, lineHeight: 1,
          }}>
            Your <span style={{ color: 'var(--lime)' }}>transformation</span><br />starts today
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px', fontWeight: 400 }}>
            Join 5,000+ members who've chosen to invest in their health and never looked back.
          </p>
          <div className="flex items-center justify-center gap-md flex-wrap">
            {!consultationDone ? (
              <button onClick={() => setShowConsult(true)} className="btn btn-primary btn-xl" style={{ fontFamily:'var(--font-body)' }}>
                <Target size={18}/> Free Consultation
              </button>
            ) : isAuthenticated ? (
              <Link to="/user/dashboard" className="btn btn-primary btn-xl">Go to Dashboard</Link>
            ) : (
              <Link to="/register" className="btn btn-primary btn-xl">Create Free Account</Link>
            )}
            <Link to="/login" className="btn btn-ghost btn-xl">Login</Link>
          </div>
        </div>
      </section>
      <Footer variant="landing"/>
      {showConsult && (
        <Suspense fallback={null}>
          <ConsultationModal onClose={() => { setShowConsult(false); refreshConsultDone(); }}/>
        </Suspense>
      )}
    </div>
  );
};

export default Landing;
