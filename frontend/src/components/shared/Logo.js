import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MF = "'Montserrat', 'Hanken Grotesk', system-ui, sans-serif";

/*
 * Scales all design tokens proportionally from the reference design:
 *   badge=88px · text=38px · gap(badge↔text)=26px · text-block-gap=9px
 *   tagline=10.5px · brand-gap=11px
 */
export const LogoConcept3 = ({ height = 50, style }) => {
  const brandNameRef = useRef(null);
  const taglineRef   = useRef(null);

  useEffect(() => {
    const align = () => {
      if (!brandNameRef.current || !taglineRef.current) return;
      taglineRef.current.style.width = brandNameRef.current.offsetWidth + 'px';
    };

    // Run immediately (handles already-cached fonts on re-renders)
    align();

    // Run again once Montserrat has loaded — critical for correct measurement
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(align);
    }

    window.addEventListener('resize', align);
    return () => window.removeEventListener('resize', align);
  }, [height]);

  // Design reference: badge=88, text=38, lockup-gap=26, stack-gap=9, tagline=10.5, brand-gap=11
  const scale      = height / 88;            // height prop = badge height
  const badgeSize  = height;
  const fontSize   = Math.round(38 * scale);
  const lockupGap  = Math.round(26 * scale);
  const stackGap   = Math.round(9  * scale);
  const tagSize    = Math.max(8, Math.round(10.5 * scale));
  const brandGap   = Math.round(11 * scale);
  const radius     = Math.round(9  * scale);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: lockupGap, userSelect: 'none', ...style }}>

      {/* ── MP Badge ── */}
      <div style={{
        width: badgeSize, height: badgeSize,
        background: '#0d1729',
        borderRadius: radius,
        border: '1.5px solid #1b2d4a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: 'inset 0 1px 0 rgba(100,160,255,0.07)',
      }}>
        <span style={{
          fontFamily: MF,
          fontWeight: 900,
          fontSize: Math.round(44 * scale),
          color: '#1d80e6',
          letterSpacing: `${(-3 * scale).toFixed(2)}px`,   /* -3px at full 88px, scaled at smaller sizes */
          lineHeight: 1,
          marginTop: '-1px',
          paddingRight: `${(3 * scale).toFixed(2)}px`,
        }}>MP</span>
      </div>

      {/* ── Text block — hidden on ≤480px via .logo-text-block ── */}
      <div className="logo-text-block" style={{ display: 'flex', flexDirection: 'column', gap: stackGap, alignItems: 'flex-start' }}>

        {/* Brand name — measured for tagline width */}
        <div
          ref={brandNameRef}
          style={{ display: 'flex', alignItems: 'baseline', whiteSpace: 'nowrap', lineHeight: 1 }}
        >
          <span style={{ fontFamily: MF, fontWeight: 800, fontSize, color: '#ffffff', letterSpacing: `${(-0.5 * scale).toFixed(2)}px` }}>
            Mpower
          </span>
          <span style={{ display: 'inline-block', width: brandGap }} />
          <span style={{ fontFamily: MF, fontWeight: 300, fontSize, color: '#ffffff', letterSpacing: `${(0.5 * scale).toFixed(2)}px` }}>
            Fitness
          </span>
        </div>

        {/* Tagline — width set by JS to match brand name exactly; hidden on ≤768px */}
        <div
          ref={taglineRef}
          className="logo-tagline"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span style={{ fontFamily: MF, fontSize: tagSize, fontWeight: 600, letterSpacing: '0.08em', color: '#3f5878', textTransform: 'uppercase' }}>Strength</span>
          <span style={{ fontFamily: MF, fontSize: Math.round(10 * scale), fontWeight: 300, color: '#1d80e6', opacity: 0.75 }}>|</span>
          <span style={{ fontFamily: MF, fontSize: tagSize, fontWeight: 600, letterSpacing: '0.08em', color: '#3f5878', textTransform: 'uppercase' }}>Health</span>
          <span style={{ fontFamily: MF, fontSize: Math.round(10 * scale), fontWeight: 300, color: '#1d80e6', opacity: 0.75 }}>|</span>
          <span style={{ fontFamily: MF, fontSize: tagSize, fontWeight: 600, letterSpacing: '0.08em', color: '#3f5878', textTransform: 'uppercase' }}>Nutrition</span>
        </div>

      </div>
    </div>
  );
};

export const LogoFull = ({ height = 50, linkTo = '/', style }) => {
  const logo = <LogoConcept3 height={height} style={style} />;
  if (!linkTo) return logo;
  return (
    <Link to={linkTo} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} aria-label="Mpower Fitness">
      {logo}
    </Link>
  );
};

export const LogoIcon = ({ size = 40, style }) => {
  const scale = size / 88;
  return (
    <div style={{
      width: size, height: size,
      borderRadius: Math.round(9 * scale),
      background: '#0d1729',
      border: '1.5px solid #1b2d4a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: 'inset 0 1px 0 rgba(100,160,255,0.07)',
      ...style,
    }}>
      <span style={{
        fontFamily: MF,
        fontWeight: 900,
        fontSize: Math.round(44 * scale),
        color: '#1d80e6',
        letterSpacing: `${(-3 * scale).toFixed(2)}px`,
        lineHeight: 1,
        paddingRight: `${(3 * scale).toFixed(2)}px`,
      }}>MP</span>
    </div>
  );
};

export const LogoMark = ({ height = 50 }) => <LogoFull height={height} linkTo={null} />;

export default LogoFull;
