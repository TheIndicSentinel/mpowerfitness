import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Brand logo — original artwork recolored via CSS mask:
 *   • MP mark + "MPower Fitness" → solid brand blue (#3E92FF)
 *   • "strength | health | nutrition" tagline → light (--t2, same as nav menu text)
 * LogoIcon / favicon use the same blue "MP" mark (/mp_blue.png).
 */
const FILL = '#3E92FF';
const WORD = '/oglogo_final1.png';
const WORD_RATIO = 798 / 312;

const maskStyle = (src) => ({
  position: 'absolute', inset: 0,
  WebkitMaskImage: `url(${src})`, maskImage: `url(${src})`,
  WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain', maskSize: 'contain',
  WebkitMaskPosition: 'center', maskPosition: 'center',
});

const WordLogo = ({ height, style }) => (
  <div role="img" aria-label="Mpower Fitness"
    style={{ position: 'relative', height, width: Math.round(height * WORD_RATIO), ...style }}>
    {/* base: whole logo in brand blue */}
    <div style={{ ...maskStyle(WORD), background: FILL }} />
    {/* overlay: paint only the bottom tagline band in the light nav-text colour */}
    <div style={{ ...maskStyle(WORD), background: 'var(--t2)', clipPath: 'inset(74% 0 0 0)' }} />
  </div>
);

export const LogoFull = ({ height = 50, linkTo = '/', style }) => {
  const logo = <WordLogo height={height} style={style} />;
  if (!linkTo) return logo;
  return (
    <Link to={linkTo} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} aria-label="Mpower Fitness">
      {logo}
    </Link>
  );
};

/* Icon-only mark — blue "MP" in a navy chip (collapsed sidebar, etc.) */
export const LogoIcon = ({ size = 40, style }) => (
  <div style={{
    width: size, height: size, borderRadius: 10,
    background: 'var(--s1)', border: '1px solid var(--border-bright)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', ...style,
  }}>
    <img src="/mp_blue.png" alt="MP" style={{ height: size * 0.5, width: 'auto', objectFit: 'contain' }} />
  </div>
);

export const LogoMark = ({ height = 50 }) => <LogoFull height={height} linkTo={null} />;

export default LogoFull;
