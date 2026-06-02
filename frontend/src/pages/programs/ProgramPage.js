import React, { useState, lazy, Suspense } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { LogoFull } from '../../components/shared/Logo';
import Footer from '../../components/shared/Footer';

const ConsultationModal = lazy(() => import('../../components/shared/ConsultationModal'));

const L = 'rgba(120,160,230,.14)';
const BLUE = '#2e6bff';
const CYAN = '#43d0ff';

const PROGRAMS = {
  'weight-loss': {
    ic: '🔥',
    name: 'Weight Loss',
    tagline: 'Sustainable fat-loss built around food you actually enjoy and a schedule you can keep.',
    hero: 'Stop chasing crash diets. Start building real, lasting change — guided by a certified trainer who maps every week around your body, your meals, and your life.',
    stats: [['8–12 kg', 'Avg. loss in 12 wks'], ['90%', 'Completion rate'], ['2×', 'Faster than solo'], ['₹499', 'From / month']],
    benefits: [
      ['Custom meal plans', 'Built around Indian food — no banned foods, no starvation.'],
      ['Smart cardio + strength', 'A combination proven to burn fat while preserving muscle.'],
      ['Weekly check-ins', 'Your plan adapts every week to what actually happened.'],
      ['Body composition tracking', 'We measure fat %, not just the scale number.'],
      ['Habit coaching', 'Long-term behaviours, not short-term hacks.'],
      ['24/7 trainer chat', 'Message your trainer anytime — no waiting for the next session.'],
    ],
    forList: ['People 5–50 kg from their target weight', 'Post-pregnancy weight management', 'Desk workers with limited exercise time', 'Anyone who has tried dieting and failed before'],
    steps: [
      ['Assessment', 'We review your current weight, diet habits, lifestyle, and any medical history that affects fat loss.'],
      ['Plan creation', 'A trainer builds your week-by-week workout and nutrition plan within 48 hours.'],
      ['Weekly adaptation', 'Results are logged every week and the plan is tweaked in real time.'],
      ['Target achieved', 'Once you hit your goal, we shift into a maintenance protocol to keep the results permanent.'],
    ],
  },
  'strength-muscle': {
    ic: '💪',
    name: 'Strength & Muscle',
    tagline: 'Progressive overload programming to build real, visible strength.',
    hero: 'No guesswork, no plateaus. A structured, periodised lifting programme with a trainer who ensures every rep counts and every week moves you forward.',
    stats: [['6–10 kg', 'Avg. muscle gain in 16 wks'], ['3×/wk', 'Recommended frequency'], ['85%', 'Hit strength PRs'], ['₹499', 'From / month']],
    benefits: [
      ['Periodised lifting plans', 'Phases for hypertrophy, strength and deload — mapped to your schedule.'],
      ['Compound + isolation work', 'A balanced programme that builds functional strength and aesthetics.'],
      ['Form coaching', 'Video review on key lifts to keep you injury-free and progressing.'],
      ['Progressive overload tracking', 'Automatic load progressions so you never stagnate.'],
      ['Nutrition for muscle', 'Protein targets, meal timing, and calorie guidance for your goal.'],
      ['Recovery guidance', 'Sleep, deload weeks, and mobility work built into every block.'],
    ],
    forList: ['Beginners wanting to build a strong foundation', 'Intermediate lifters hitting plateaus', 'Athletes who want sport-specific strength', 'Anyone who wants visible, functional muscle'],
    steps: [
      ['Strength baseline', 'We log your current lifts, training history, and equipment access (gym, home, or both).'],
      ['Programme design', 'A 4–16 week block is built with progressive overload baked in.'],
      ['Technique review', 'First two weeks include form-check videos on your main lifts.'],
      ['Block progression', 'After each block, we retest and build the next phase on your new baseline.'],
    ],
  },
  'pcod-hormonal': {
    ic: '🌸',
    name: 'PCOD & Hormonal Health',
    tagline: 'Training and nutrition designed with specialists for hormonal balance.',
    hero: 'Generic fitness plans often make hormonal conditions worse. Our PCOD programme is built around your cycle, your symptoms, and the latest evidence-based guidance from specialist coaches.',
    stats: [['78%', 'Report symptom improvement'], ['3 mo', 'Avg. to see results'], ['Specialist', 'Certified coaches'], ['₹499', 'From / month']],
    benefits: [
      ['Hormone-friendly workouts', 'Intensity is synced to your cycle phase — follicular, ovulatory, luteal, menstrual.'],
      ['Anti-inflammatory nutrition', 'Foods that support insulin sensitivity and reduce androgen levels.'],
      ['Stress management protocol', 'Cortisol drives PCOD — we build recovery and breathwork into your week.'],
      ['Specialist trainer matching', 'Paired with a coach certified in women\'s hormonal health.'],
      ['Supplement guidance', 'Evidence-based supplements reviewed alongside your current medications.'],
      ['Symptom tracking', 'Log mood, energy, and cycle data — your plan adapts month by month.'],
    ],
    forList: ['Women diagnosed with PCOD or PCOS', 'Irregular or painful menstrual cycles', 'Hormonal weight gain (especially abdomen)', 'Post-pill hormonal recovery', 'Women trying to conceive naturally'],
    steps: [
      ['Health intake', 'A detailed form covers your diagnosis, current medications, symptoms, and cycle regularity.'],
      ['Specialist match', 'You\'re matched with a trainer who specialises in women\'s hormonal health.'],
      ['Cycle-aware programme', 'Your first 4-week plan is built around your current cycle phase.'],
      ['Monthly recalibration', 'Every 4 weeks your trainer reviews your symptom log and adjusts accordingly.'],
    ],
  },
  'diabetes-thyroid': {
    ic: '🩺',
    name: 'Diabetes & Thyroid',
    tagline: 'Safe, condition-aware coaching that works alongside your medical care.',
    hero: 'Exercise is one of the most effective tools for managing diabetes and thyroid conditions — when done correctly. Our coaches work within your medical guidelines to make movement safe, effective, and sustainable.',
    stats: [['Blood sugar', 'Improves in 8 wks'], ['Safe', 'Medically reviewed guidelines'], ['Specialist', 'Trained coaches'], ['₹499', 'From / month']],
    benefits: [
      ['Blood-sugar safe workouts', 'Exercise timing and intensity matched to your medication and meal schedule.'],
      ['Medical guideline compliance', 'All plans are reviewed against ADA/IDF guidelines for safe exercise in diabetes.'],
      ['Thyroid-aware training', 'Fatigue, joint pain and weight changes common in thyroid conditions are accounted for.'],
      ['Metabolic nutrition plan', 'Low-GI Indian meal templates that stabilise blood sugar and support thyroid function.'],
      ['Daily monitoring prompts', 'Log your blood glucose, energy, and symptoms so we can fine-tune your plan.'],
      ['GP/endocrinologist coordination', 'We provide exercise summaries you can share with your doctor.'],
    ],
    forList: ['Type 2 diabetes or pre-diabetes', 'Hypothyroidism or hyperthyroidism', 'Insulin resistance or metabolic syndrome', 'Those cleared for exercise by their doctor but unsure where to start'],
    steps: [
      ['Medical intake', 'Share your diagnosis, current medications, last lab results, and your doctor\'s exercise clearance.'],
      ['Condition-aware plan', 'Your programme is built with safe intensity ranges, timing, and nutrition for your condition.'],
      ['First-week orientation', 'A slower first week to monitor your body\'s response to exercise.'],
      ['Ongoing adaptation', 'As your condition improves, the programme scales up safely month by month.'],
    ],
  },
  'beginner-kickstart': {
    ic: '🌱',
    name: 'Beginner Kickstart',
    tagline: 'Brand new to fitness? Start with confidence and zero overwhelm.',
    hero: 'The hardest part is starting. We make it easier with a structured 8-week programme that teaches you everything you need — from how to move to how to eat — one step at a time.',
    stats: [['8 weeks', 'Foundation programme'], ['0', 'Experience needed'], ['98%', 'Complete the first month'], ['₹499', 'From / month']],
    benefits: [
      ['Foundational movement patterns', 'Learn squats, hinges, pushes and pulls correctly before adding load.'],
      ['Gradual progression', 'Week-by-week intensity increases that feel challenging but never impossible.'],
      ['Daily check-ins', 'Your trainer messages you every day in week one to keep you on track.'],
      ['Form check videos', 'Upload clips of your key exercises — your trainer gives video feedback.'],
      ['No equipment needed to start', 'Begin at home with bodyweight only; add equipment when you\'re ready.'],
      ['Mindset coaching', 'Practical strategies to build the habit before willpower runs out.'],
    ],
    forList: ['Complete beginners with no exercise history', 'Returning to fitness after 6+ months away', 'Those who feel intimidated by gyms', 'People who have started and quit multiple times before'],
    steps: [
      ['Quick onboarding', 'A short chat with your trainer to understand your starting point, schedule, and fears.'],
      ['Week 1: Movement basics', 'Bodyweight only. Low intensity. Build the habit first.'],
      ['Weeks 2–4: Foundation building', 'Introduce resistance, increase duration, track your first wins.'],
      ['Weeks 5–8: Progression', 'Structured increases in load and complexity — you\'ll feel the difference.'],
    ],
  },
  'nutrition-coaching': {
    ic: '🥗',
    name: 'Nutrition Coaching',
    tagline: 'Smart, flexible meal guidance — no crash diets, no banned foods.',
    hero: 'You don\'t need a perfect diet. You need a sustainable one. Our nutrition coaches build flexible, practical meal plans around real Indian food that fits your schedule, your budget, and your taste.',
    stats: [['No', 'Banned foods'], ['100%', 'Indian-food friendly'], ['Flexible', 'Works with your lifestyle'], ['₹499', 'From / month']],
    benefits: [
      ['Macro planning', 'Protein, carbs, and fat targets calibrated for your specific goal and body.'],
      ['Indian meal templates', '30+ weekly meal templates built around dal, roti, rice, sabzi, and more.'],
      ['Restaurant & travel guidance', 'How to eat out, order in, or travel without falling off track.'],
      ['Supplement guidance', 'What actually works, what\'s a waste of money, and what interacts with your meds.'],
      ['Blood work review', 'If you share recent labs, your coach will factor deficiencies into the plan.'],
      ['Weekly meal prep coaching', 'Sunday prep strategy so you\'re never caught with nothing to eat.'],
    ],
    forList: ['Anyone struggling with diet consistency', 'Weight-loss plateaus despite training', 'Those with a complicated relationship with food', 'Athletes wanting performance nutrition', 'Anyone who wants to understand how to eat well for life'],
    steps: [
      ['Diet audit', 'Log three typical days of eating — your coach reviews your current patterns without judgement.'],
      ['Goal setting', 'Together you agree on a realistic, sustainable first target (weight, energy, health marker).'],
      ['Plan delivery', 'A full weekly meal plan with shopping list is ready within 48 hours.'],
      ['Fortnightly reviews', 'Check-ins every two weeks to review adherence, results, and make adjustments.'],
    ],
  },
};

const Tick = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

const ProgramPage = () => {
  const { slug } = useParams();
  const [showConsult, setShowConsult] = useState(false);

  const program = PROGRAMS[slug];
  if (!program) return <Navigate to="/" replace />;

  const { ic, name, tagline, hero, stats, benefits, forList, steps } = program;
  const wrap = { maxWidth: 1100, margin: '0 auto', padding: '0 28px' };

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* NAV */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(14px)', background: 'rgba(8,17,33,.92)', borderBottom: `1px solid ${L}` }}>
        <nav style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
          <LogoFull height={42} />
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Link to="/#programs" style={{ color: 'var(--t2)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>← All Programs</Link>
            <button onClick={() => setShowConsult(true)} className="btn btn-primary" style={{ padding: '10px 18px', fontSize: 14 }}>Free Consultation</button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ position: 'relative', padding: 'clamp(72px,10vw,100px) 0 64px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${L} 1px,transparent 1px),linear-gradient(90deg,${L} 1px,transparent 1px)`, backgroundSize: '64px 64px', WebkitMaskImage: 'radial-gradient(120% 90% at 60% 20%,#000 30%,transparent 75%)', maskImage: 'radial-gradient(120% 90% at 60% 20%,#000 30%,transparent 75%)', opacity: .5 }} />
        <div style={{ position: 'absolute', width: 480, height: 480, borderRadius: '50%', background: `radial-gradient(circle,${BLUE},transparent 70%)`, filter: 'blur(70px)', opacity: .4, top: -160, right: -100, pointerEvents: 'none' }} />
        <div style={{ ...wrap, position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 14px', border: `1px solid ${L}`, borderRadius: 999, background: 'rgba(46,107,255,.07)', marginBottom: 24 }}>
            <span style={{ fontSize: 22 }}>{ic}</span>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', color: 'var(--orange)', textTransform: 'uppercase' }}>Program</span>
          </div>
          <h1 style={{ fontSize: 'clamp(44px,6vw,80px)', fontWeight: 800, lineHeight: 1.02, margin: '0 0 18px', maxWidth: 720 }}>{name}</h1>
          <p style={{ fontSize: 'clamp(17px,2vw,21px)', color: 'var(--t2)', lineHeight: 1.55, maxWidth: 620, margin: '0 0 32px' }}>{hero}</p>
          <button onClick={() => setShowConsult(true)} className="btn btn-primary" style={{ fontSize: 16, padding: '15px 28px' }}>Book Free Consultation →</button>
        </div>
      </section>

      {/* STATS */}
      <div style={{ borderTop: `1px solid ${L}`, borderBottom: `1px solid ${L}`, background: 'rgba(7,15,32,.5)' }}>
        <div style={{ ...wrap, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 20, padding: '28px 28px' }}>
          {stats.map(([v, l]) => (
            <div key={l}>
              <div className="display" style={{ fontSize: 30, lineHeight: 1, color: 'var(--orange)' }}>{v}</div>
              <div style={{ fontSize: 12, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--t3)', marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TAGLINE */}
      <section style={{ padding: '64px 0 0' }}>
        <div style={wrap}>
          <p style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 700, lineHeight: 1.45, color: 'var(--t1)', maxWidth: 740, borderLeft: `3px solid ${BLUE}`, paddingLeft: 22 }}>{tagline}</p>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section style={{ padding: '72px 0' }}>
        <div style={wrap}>
          <span className="eyebrow" style={{ marginBottom: 18, display: 'block' }}>What's included</span>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 800, marginBottom: 36 }}>Everything you need to succeed.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 18 }}>
            {benefits.map(([title, desc]) => (
              <div key={title} style={{ border: `1px solid ${L}`, borderRadius: 16, padding: '22px 24px', background: 'rgba(10,25,49,.5)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(46,107,255,.16)', display: 'grid', placeItems: 'center', flexShrink: 0, color: 'var(--orange)', marginTop: 1 }}><Tick /></div>
                <div>
                  <b style={{ fontWeight: 700, fontSize: 15 }}>{title}</b>
                  <p style={{ color: 'var(--t2)', fontSize: 13.5, marginTop: 4, lineHeight: 1.5 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={{ paddingBottom: '72px' }}>
        <div style={wrap}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40, alignItems: 'start' }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: 18, display: 'block' }}>Who it's for</span>
              <h2 style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 800, marginBottom: 24 }}>Is this programme right for you?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {forList.map(item => (
                  <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--orange)', flexShrink: 0, marginTop: 3 }}><Tick /></span>
                    <span style={{ color: 'var(--t2)', fontSize: 15.5, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* HOW IT WORKS */}
            <div>
              <span className="eyebrow" style={{ marginBottom: 18, display: 'block' }}>How it works</span>
              <h2 style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 800, marginBottom: 24 }}>Your journey, step by step.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {steps.map(([title, desc], i) => (
                  <div key={title} style={{ display: 'flex', gap: 16, position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg,${BLUE},${CYAN})`, display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 14, color: '#fff', flexShrink: 0 }}>{i + 1}</div>
                      {i < steps.length - 1 && <div style={{ width: 2, flex: 1, background: `linear-gradient(${BLUE},transparent)`, marginTop: 4, minHeight: 32 }} />}
                    </div>
                    <div style={{ paddingBottom: i < steps.length - 1 ? 28 : 0 }}>
                      <b style={{ fontWeight: 700, fontSize: 15 }}>{title}</b>
                      <p style={{ color: 'var(--t2)', fontSize: 14, marginTop: 5, lineHeight: 1.5 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ paddingBottom: '80px' }}>
        <div style={wrap}>
          <div style={{ position: 'relative', border: `1px solid ${L}`, borderRadius: 26, padding: 'clamp(40px,6vw,64px) clamp(24px,5vw,48px)', textAlign: 'center', overflow: 'hidden', background: `linear-gradient(135deg,rgba(46,107,255,.18),rgba(10,25,49,.6))` }}>
            <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${BLUE},transparent 70%)`, filter: 'blur(60px)', opacity: .35, top: -160, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{ic}</div>
              <h2 className="display" style={{ fontSize: 'clamp(30px,4.5vw,54px)', lineHeight: 1 }}>
                Start your {name} journey.<br />
                <span style={{ background: `linear-gradient(120deg,var(--orange),${CYAN})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Your first consultation is free.</span>
              </h2>
              <p style={{ margin: '18px auto 28px', color: 'var(--t2)', fontSize: 17, maxWidth: 480 }}>
                Book a free call with a specialist trainer. We'll review your goals, answer your questions, and build your first plan together.
              </p>
              <button onClick={() => setShowConsult(true)} className="btn btn-primary" style={{ fontSize: 16, padding: '16px 32px' }}>Book Free Consultation →</button>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="landing" />

      {showConsult && (
        <Suspense fallback={null}>
          <ConsultationModal onClose={() => setShowConsult(false)} />
        </Suspense>
      )}
    </div>
  );
};

export default ProgramPage;
