import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { LogoFull } from '../components/shared/Logo';
import Footer from '../components/shared/Footer';
import useAuthStore from '../store/authStore';

const ConsultationModal = lazy(() => import('../components/shared/ConsultationModal'));

/* ── helpers ─────────────────────────────────────────────────────── */
const L = 'rgba(120,160,230,.14)';   // --line alias for inline use
const BLUE = '#2e6bff';
const CYAN = '#43d0ff';

const Tick = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

/* ── Landing ─────────────────────────────────────────────────────── */
const Landing = () => {
  const heroRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const plans = [
    {
      name: 'Starter', price: '₹499', period: '/mo', tag: null,
      sub: 'Your assessment + a starter plan.',
      features: ['Personalised assessment', 'Starter workout plan', 'Progress tracking', 'Community access'],
      cta: 'Get started', primary: false,
    },
    {
      name: 'Pro', price: '₹1,499', period: '/mo', tag: 'Most popular',
      sub: 'A dedicated trainer + full personalisation.',
      features: ['Everything in Starter', '2 trainer sessions / month', 'Personalised nutrition plan', 'Unlimited chat support', 'Advanced analytics'],
      cta: 'Start free trial', primary: true,
    },
    {
      name: 'Elite', price: '₹2,999', period: '/mo', tag: null,
      sub: '1-on-1 coaching + condition specialists.',
      features: ['Everything in Pro', 'Weekly 1-on-1 video calls', 'Daily check-ins', 'Body composition analysis', 'Condition specialist access'],
      cta: 'Choose Elite', primary: false,
    },
  ];

  const programs = [
    { ic: '🔥', name: 'Weight Loss', desc: 'Sustainable fat-loss built around food you actually enjoy and a schedule you can keep.', tag: 'Most popular' },
    { ic: '💪', name: 'Strength & Muscle', desc: 'Progressive overload programming to build real, visible strength.', tag: 'Explore' },
    { ic: '🌸', name: 'PCOD & Hormonal Health', desc: 'Training and nutrition designed with specialists for hormonal balance.', tag: 'Explore' },
    { ic: '🩺', name: 'Diabetes & Thyroid', desc: 'Safe, condition-aware coaching that works alongside your medical care.', tag: 'Explore' },
    { ic: '🌱', name: 'Beginner Kickstart', desc: 'Brand new to fitness? Start with confidence and zero overwhelm.', tag: 'Explore' },
    { ic: '🥗', name: 'Nutrition Coaching', desc: 'Smart, flexible meal guidance — no crash diets, no banned foods.', tag: 'Explore' },
  ];

  const testimonials = [
    { q: '"My trainer actually understood my PCOD. For the first time a plan worked with my body, not against it."', name: 'Priya M.', sub: 'Lost 8kg · Bengaluru', init: 'P', bg: BLUE },
    { q: '"I travel constantly. Having my whole plan adapt to a hotel room kept me consistent for the first time ever."', name: 'Arjun K.', sub: 'Down 2 sizes · Mumbai', init: 'A', bg: CYAN, dark: true },
    { q: '"Started as a complete beginner. The Kickstart program made it feel doable from day one."', name: 'Ritika S.', sub: '6-month streak · Pune', init: 'R', bg: '#1b3f8f' },
  ];

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    backdropFilter: 'blur(14px)',
    background: scrolled ? 'rgba(8,17,33,.92)' : 'rgba(8,17,33,.72)',
    borderBottom: `1px solid ${L}`,
    transition: 'background .3s',
  };

  const wrap = { maxWidth: 1200, margin: '0 auto', padding: '0 28px' };

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── NAV ──────────────────────────────────────────────────── */}
      <header style={navStyle}>
        <nav style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 74 }}>
          <LogoFull height={46} />

          <div className="landing-nav-links" style={{ display: 'flex', gap: 34, fontSize: 15, fontWeight: 600, color: 'var(--t2)' }}>
            <a href="#how" className="landing-nav-link">How it works</a>
            <a href="#programs" className="landing-nav-link">Programs</a>
            <a href="#pricing" className="landing-nav-link">Pricing</a>
            <Link to="/trainer/login" className="landing-nav-link">Trainers</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <Link to="/login" style={{ fontWeight: 600, fontSize: 15, color: 'var(--t2)', textDecoration: 'none' }} className="landing-nav-links">Login</Link>
            <button onClick={() => setShowConsult(true)} className="btn btn-primary" style={{ padding: '11px 20px', fontSize: 14 }}>Free Consultation</button>
            {/* Hamburger */}
            <button className="landing-hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu"
              style={{ display: 'none', background: 'none', border: `1px solid ${L}`, borderRadius: 8, cursor: 'pointer', color: 'var(--t2)', padding: '6px 8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div style={{ background: 'rgba(8,17,33,.97)', borderTop: `1px solid ${L}`, padding: '12px 28px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[['#how','How it works'],['#programs','Programs'],['#pricing','Pricing']].map(([h,l]) => (
              <a key={h} href={h} className="landing-mobile-link" onClick={() => setMobileOpen(false)}>{l}</a>
            ))}
            <Link to="/login" className="landing-mobile-link" onClick={() => setMobileOpen(false)}>Login</Link>
            {true && (
              <button className="btn btn-primary btn-full" style={{ marginTop: 8 }}
                onClick={() => { setMobileOpen(false); setShowConsult(true); }}>Free Consultation</button>
            )}
          </div>
        )}
      </header>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ position: 'relative', padding: 'clamp(92px,12vw,120px) 0 70px', overflow: 'hidden' }}>
        {/* grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${L} 1px,transparent 1px),linear-gradient(90deg,${L} 1px,transparent 1px)`,
          backgroundSize: '64px 64px',
          WebkitMaskImage: 'radial-gradient(120% 90% at 70% 10%,#000 30%,transparent 75%)',
          maskImage: 'radial-gradient(120% 90% at 70% 10%,#000 30%,transparent 75%)',
          opacity: .6,
        }}/>
        {/* orbs */}
        <div style={{ position:'absolute', width:520, height:520, borderRadius:'50%', background:'radial-gradient(circle,#2e6bff,transparent 70%)', filter:'blur(70px)', opacity:.55, top:-160, right:-120, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', width:380, height:380, borderRadius:'50%', background:`radial-gradient(circle,${CYAN},transparent 70%)`, filter:'blur(70px)', opacity:.3, bottom:-180, left:-100, pointerEvents:'none' }}/>

        <div style={{ ...wrap, position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 50, alignItems: 'center' }} className="hero-inner">
          <div>
            <span style={{ display:'inline-flex', alignItems:'center', gap:9, padding:'8px 15px', border:`1px solid ${L}`, borderRadius:999, background:'rgba(46,107,255,.08)', fontSize:12.5, fontWeight:700, letterSpacing:'.06em', color:'var(--orange)', textTransform:'uppercase' }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:CYAN, boxShadow:`0 0 10px ${CYAN}`, flexShrink:0 }}/>
              India's most complete fitness platform
            </span>

            <h1 className="display" style={{ fontSize:'clamp(54px,7.4vw,104px)', margin:'26px 0 0' }}>
              <span style={{ display:'block', color:'var(--t1)' }}>Train</span>
              <span style={{ display:'block', background:`linear-gradient(120deg,var(--orange),${CYAN})`, WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent' }}>harder.</span>
              <span style={{ display:'block', color:'transparent', WebkitTextStroke:'1.6px var(--orange)' }}>live</span>
              <span style={{ display:'block', color:'transparent', WebkitTextStroke:'1.6px var(--orange)' }}>stronger.</span>
            </h1>

            <p style={{ margin:'26px 0 0', fontSize:18.5, lineHeight:1.55, color:'var(--t2)', maxWidth:440 }}>
              Personalised workouts, certified trainers and smart nutrition — built around your body, your goals and your schedule.
            </p>

            <div style={{ display:'flex', gap:14, marginTop:34, flexWrap:'wrap' }}>
              <button onClick={() => setShowConsult(true)} className="btn btn-primary" style={{ fontSize:15, padding:'15px 26px' }}>Free Consultation →</button>
              <a href="#how" className="btn btn-ghost" style={{ fontSize:15, padding:'15px 26px' }}>See how it works</a>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:16, marginTop:34 }}>
              <div style={{ display:'flex' }}>
                {[['#2e6bff','A'],[`${CYAN};color:#06203a`,'S'],['#1b3f8f','R'],['#3b6','N'],['#16315a','+']].map(([bg, l], i) => (
                  <div key={i} style={{ width:38, height:38, borderRadius:'50%', border:'2px solid var(--black)', marginLeft:i>0?-10:0, display:'grid', placeItems:'center', fontWeight:800, fontSize:13, color:'#fff', background:bg.includes(';')?bg.split(';')[0]:bg, zIndex:5-i, position:'relative', flexShrink:0 }}>{l}</div>
                ))}
              </div>
              <div><strong>5,000+</strong> <span style={{ color:'var(--t3)', fontSize:13.5, display:'block' }}>members transforming daily</span></div>
            </div>
          </div>

          {/* Progress panel */}
          <div style={{ border:`1px solid ${L}`, borderRadius:24, background:'linear-gradient(180deg,rgba(22,49,90,.5),rgba(10,25,49,.4))', padding:30, backdropFilter:'blur(6px)' }} className="hero-panel-hide">
            <div style={{ display:'flex', alignItems:'center', gap:22, marginBottom:24 }}>
              <div style={{ position:'relative', width:96, height:96, flexShrink:0 }}>
                <svg width="96" height="96" style={{ transform:'rotate(-90deg)' }}>
                  <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="9"/>
                  <circle cx="48" cy="48" r="40" fill="none" stroke="url(#g1)" strokeWidth="9" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="55"/>
                  <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={BLUE}/><stop offset="1" stopColor={CYAN}/></linearGradient></defs>
                </svg>
                <div style={{ position:'absolute', inset:0, display:'grid', placeItems:'center', textAlign:'center' }}>
                  <div><b className="display" style={{ fontSize:24 }}>78%</b><div style={{ fontSize:9, letterSpacing:'.12em', color:'var(--t3)', textTransform:'uppercase' }}>goal</div></div>
                </div>
              </div>
              <div>
                <b style={{ fontSize:17, fontWeight:800 }}>Your weekly progress</b>
                <p style={{ color:'var(--t2)', fontSize:13.5, marginTop:3, lineHeight:1.4 }}>On track to hit your weight-loss target 3 weeks early.</p>
              </div>
            </div>
            {[['Workouts','5 / 6',83],['Nutrition','92%',92],['Sleep & recovery','71%',71]].map(([l,v,p]) => (
              <div key={l} style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, fontWeight:600 }}>
                  <span>{l}</span><span style={{ color:'var(--orange)', fontWeight:800 }}>{v}</span>
                </div>
                <div style={{ height:8, borderRadius:99, background:'rgba(255,255,255,.06)', overflow:'hidden' }}>
                  <div style={{ height:'100%', borderRadius:99, width:`${p}%`, background:`linear-gradient(90deg,${BLUE},${CYAN})` }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────── */}
      <div style={{ borderTop:`1px solid ${L}`, borderBottom:`1px solid ${L}`, background:'rgba(7,15,32,.5)' }}>
        <div style={{ ...wrap, display:'flex', flexWrap:'wrap', justifyContent:'space-between', gap:24, padding:'30px 28px' }}>
          {[['30K+','Workouts completed'],['5K+','Active members'],['4.9★','Average rating'],['₹499','Plans start from']].map(([v,l]) => (
            <div key={l}>
              <div className="display" style={{ fontSize:34, lineHeight:1, color:'var(--t1)' }}>
                {v.includes('★') ? <>{v.replace('★','')}<em style={{ fontStyle:'normal', color:'var(--orange)' }}>★</em></> :
                 v.includes('+') ? <>{v.replace('+','')}<em style={{ fontStyle:'normal', color:'var(--orange)' }}>+</em></> :
                 v.includes('₹') ? <><em style={{ fontStyle:'normal', color:'var(--orange)' }}>₹</em>{v.replace('₹','')}</> :
                 v}
              </div>
              <div style={{ fontSize:12.5, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--t3)', marginTop:7 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section id="how" style={{ padding:'96px 0' }}>
        <div style={wrap}>
          <div style={{ maxWidth:640, marginBottom:54 }}>
            <span className="eyebrow">How it works</span>
            <h2 style={{ fontSize:'clamp(34px,4.4vw,54px)', marginTop:16, lineHeight:1.02, fontWeight:800 }}>Three steps to a stronger you.</h2>
            <p style={{ marginTop:18, color:'var(--t2)', fontSize:17, lineHeight:1.6 }}>No guesswork, no generic plans. We build everything around a quick assessment — then adapt as you progress.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:22 }}>
            {[
              ['01','Take the assessment','Two minutes on your goals, lifestyle, health history and any conditions like PCOD or thyroid.'],
              ['02','Get matched','We pair you with a certified trainer and a fully personalised workout + nutrition plan.'],
              ['03','Train & transform','Train anywhere, track every session, and watch your plan adapt automatically to your results.'],
            ].map(([n,h,p]) => (
              <div key={n} style={{ border:`1px solid ${L}`, borderRadius:20, padding:30, background:'linear-gradient(180deg,rgba(22,49,90,.32),transparent)', position:'relative', overflow:'hidden' }}>
                <div className="display" style={{ fontSize:64, color:'rgba(77,139,255,.16)', lineHeight:.8 }}>{n}</div>
                <h3 style={{ fontSize:21, fontWeight:800, margin:'14px 0 10px' }}>{h}</h3>
                <p style={{ color:'var(--t2)', fontSize:15, lineHeight:1.55 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ─────────────────────────────────────────────── */}
      <section id="programs" style={{ paddingBottom:'96px' }}>
        <div style={wrap}>
          <div style={{ maxWidth:640, marginBottom:54 }}>
            <span className="eyebrow">Programs</span>
            <h2 style={{ fontSize:'clamp(34px,4.4vw,54px)', marginTop:16, lineHeight:1.02, fontWeight:800 }}>A plan for every body and every goal.</h2>
            <p style={{ marginTop:18, color:'var(--t2)', fontSize:17, lineHeight:1.6 }}>From your first workout to specialised, condition-aware coaching — guided by trainers who've done it before.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:18 }}>
            {programs.map(({ ic, name, desc, tag }) => (
              <div key={name} className="card card-hover" style={{ border:`1px solid ${L}`, borderRadius:18, padding:26, background:'rgba(10,25,49,.5)', cursor:'pointer' }}
                onClick={() => setShowConsult(true)}>
                <div style={{ width:48, height:48, borderRadius:13, display:'grid', placeItems:'center', background:'rgba(46,107,255,.14)', marginBottom:18, fontSize:24 }}>{ic}</div>
                <h3 style={{ fontSize:18.5, fontWeight:800, fontFamily:'var(--font-body)' }}>{name}</h3>
                <p style={{ color:'var(--t2)', fontSize:14, lineHeight:1.5, marginTop:9 }}>{desc}</p>
                <div style={{ marginTop:16, fontSize:12.5, fontWeight:700, color:'var(--orange)', display:'inline-flex', alignItems:'center', gap:6 }}>{tag} →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE SPLIT ────────────────────────────────────────── */}
      <section style={{ paddingBottom:'96px' }}>
        <div style={{ ...wrap, display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:48, alignItems:'center' }}>
          <div>
            <span className="eyebrow">Built for busy people</span>
            <h2 style={{ fontSize:'clamp(32px,4vw,46px)', fontWeight:800, lineHeight:1.04, marginTop:14 }}>Everything in one place — so nothing slips.</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:18, marginTop:26 }}>
              {[
                ['Adaptive programming','Plans recalibrate every week based on what you actually completed.'],
                ['Trainer in your pocket','Message your trainer, share form videos and get real feedback fast.'],
                ['Train anywhere','Home, gym or hotel room — every workout scales to your equipment.'],
                ['One clear dashboard','Workouts, nutrition, sleep and progress photos, all in a single view.'],
              ].map(([t,p]) => (
                <div key={t} style={{ display:'flex', gap:15, alignItems:'flex-start' }}>
                  <div style={{ width:26, height:26, borderRadius:8, background:'rgba(46,107,255,.16)', display:'grid', placeItems:'center', flexShrink:0, color:'var(--orange)' }}><Tick/></div>
                  <div>
                    <b style={{ fontWeight:700, fontSize:16 }}>{t}</b>
                    <p style={{ color:'var(--t2)', fontSize:14.5, marginTop:3, lineHeight:1.5 }}>{p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ border:`1px solid ${L}`, borderRadius:24, background:'linear-gradient(180deg,rgba(22,49,90,.4),rgba(10,25,49,.3))', padding:34, position:'relative', overflow:'hidden' }}>
            <svg viewBox="0 0 400 200" fill="none" style={{ width:'100%', display:'block' }}>
              <defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={BLUE}/><stop offset="1" stopColor={CYAN}/></linearGradient></defs>
              <polyline points="0,120 60,120 80,120 95,60 115,170 135,90 150,120 220,120 240,120 255,40 275,180 295,100 310,120 400,120" stroke="url(#pg)" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
            <div style={{ position:'absolute', top:26, right:26, backdropFilter:'blur(8px)', background:'rgba(8,17,33,.7)', border:`1px solid ${L}`, borderRadius:13, padding:'12px 15px', fontSize:13 }}>
              <b className="display" style={{ fontSize:20 }}>−6.2kg</b><div style={{ color:'var(--t2)', fontSize:11 }}>in 12 weeks</div>
            </div>
            <div style={{ position:'absolute', bottom:26, left:26, backdropFilter:'blur(8px)', background:'rgba(8,17,33,.7)', border:`1px solid ${L}`, borderRadius:13, padding:'12px 15px', fontSize:13 }}>
              <b className="display" style={{ fontSize:20 }}>5×</b><div style={{ color:'var(--t2)', fontSize:11 }}>weekly streak</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section style={{ paddingBottom:'96px' }}>
        <div style={wrap}>
          <div style={{ maxWidth:640, marginBottom:54 }}>
            <span className="eyebrow">Trainers</span>
            <h2 style={{ fontSize:'clamp(34px,4.4vw,54px)', marginTop:16, lineHeight:1.02, fontWeight:800 }}>Certified coaches who get results.</h2>
            <p style={{ marginTop:18, color:'var(--t2)', fontSize:17, lineHeight:1.6 }}>Hand-picked, certified, and specialised — matched to your goals and your health profile.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:18 }}>
            {testimonials.map(({ q, name, sub, init, bg, dark }) => (
              <div key={name} style={{ border:`1px solid ${L}`, borderRadius:18, padding:28, background:'rgba(10,25,49,.5)' }}>
                <div style={{ color:CYAN, letterSpacing:2, fontSize:14 }}>★★★★★</div>
                <p style={{ margin:'16px 0 22px', fontSize:15.5, lineHeight:1.6, color:'#dce6fb' }}>{q}</p>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:42, height:42, borderRadius:'50%', display:'grid', placeItems:'center', fontWeight:800, color: dark ? '#06203a' : '#fff', background:bg, flexShrink:0 }}>{init}</div>
                  <div><b style={{ fontWeight:700, fontSize:14.5 }}>{name}</b><div style={{ color:'var(--t3)', fontSize:12.5 }}>{sub}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section id="pricing" style={{ paddingBottom:'96px' }}>
        <div style={wrap}>
          <div style={{ maxWidth:640, marginBottom:54 }}>
            <span className="eyebrow">Pricing</span>
            <h2 style={{ fontSize:'clamp(34px,4.4vw,54px)', marginTop:16, lineHeight:1.02, fontWeight:800 }}>Start free. Upgrade when you're ready.</h2>
            <p style={{ marginTop:18, color:'var(--t2)', fontSize:17, lineHeight:1.6 }}>No contracts. Cancel anytime. Every paid plan includes a 7-day free trial.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))', gap:18, alignItems:'stretch' }}>
            {plans.map(({ name, price, period, tag, sub, features, cta, primary }) => (
              <div key={name} style={{
                border: `1px solid ${primary ? 'rgba(77,139,255,.55)' : L}`,
                borderRadius:22, padding:32, display:'flex', flexDirection:'column',
                background: primary ? 'linear-gradient(180deg,rgba(46,107,255,.18),rgba(10,25,49,.5))' : 'rgba(10,25,49,.5)',
                boxShadow: primary ? '0 24px 60px -24px rgba(46,107,255,.6)' : 'none',
              }}>
                {tag && <div style={{ alignSelf:'flex-start', fontSize:11, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#fff', background:'var(--lime)', padding:'5px 11px', borderRadius:99, marginBottom:14 }}>{tag}</div>}
                <div style={{ fontWeight:800, fontSize:16, letterSpacing:'.04em', textTransform:'uppercase' }}>{name}</div>
                <div className="display" style={{ fontSize:52, margin:'14px 0 4px', letterSpacing:'.01em', lineHeight:1 }}>
                  {price}<span style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--t3)', fontWeight:600 }}>{period}</span>
                </div>
                <p style={{ color:primary ? 'var(--t2)' : 'var(--t3)', fontSize:14, marginBottom:22 }}>{sub}</p>
                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:13, marginBottom:26, flex:1 }}>
                  {features.map(f => (
                    <li key={f} style={{ display:'flex', gap:11, fontSize:14.5, color:'var(--t2)', alignItems:'flex-start' }}>
                      <span style={{ color:'var(--orange)', flexShrink:0, marginTop:2 }}><Tick/></span>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => !primary && null} className={`btn ${primary ? 'btn-primary' : 'btn-ghost'}`} style={{ justifyContent:'center', marginTop:'auto', padding:'13px 20px', fontSize:15 }}>
                  {cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────────── */}
      <section style={{ paddingBottom:'96px' }}>
        <div style={wrap}>
          <div style={{ position:'relative', border:`1px solid ${L}`, borderRadius:30, padding:'64px 48px', textAlign:'center', overflow:'hidden', background:'linear-gradient(135deg,rgba(46,107,255,.22),rgba(10,25,49,.6))' }}>
            <div style={{ position:'absolute', width:460, height:460, borderRadius:'50%', background:`radial-gradient(circle,${BLUE},transparent 70%)`, filter:'blur(60px)', opacity:.4, top:-200, left:'50%', transform:'translateX(-50%)', pointerEvents:'none' }}/>
            <div style={{ position:'relative', zIndex:2 }}>
              <h2 className="display" style={{ fontSize:'clamp(36px,5vw,64px)', lineHeight:1 }}>
                Your strongest self<br/>
                <span style={{ background:`linear-gradient(120deg,var(--orange),${CYAN})`, WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent' }}>starts today.</span>
              </h2>
              <p style={{ margin:'20px auto 32px', color:'var(--t2)', fontSize:18, maxWidth:520 }}>
                Take the 2-minute assessment and get your first personalised plan free.
              </p>
              <button onClick={() => setShowConsult(true)} className="btn btn-primary" style={{ fontSize:16, padding:'17px 34px' }}>Free Consultation →</button>
            </div>
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
