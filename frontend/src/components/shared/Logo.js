import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Brand logo — original artwork recolored to the brand's electric blue (single,
 * solid tone) via a CSS mask, so it matches the navy theme and stays legible.
 *   LogoFull  → full "MP + MPower Fitness" wordmark  (/oglogo_final1.png)
 *   LogoIcon  → the "MP" mark only                   (/fav_icon.png)
 */
const FILL  = '#3E92FF';                 // solid electric blue
const WORD  = '/oglogo_final1.png';      // full wordmark, 798×312
const MARK  = '/fav_icon.png';           // MP mark, 287×211
const WORD_RATIO = 798 / 312;
const MARK_RATIO = 287 / 211;

const Masked = ({ src, ratio, height, style }) => (
  <div
    role="img"
    aria-label="Mpower Fitness"
    style={{
      height,
      width: Math.round(height * ratio),
      background: FILL,
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      WebkitMaskPosition: 'left center',
      maskPosition: 'center',
      ...style,
    }}
  />
);

export const LogoFull = ({ height = 50, linkTo = '/', style }) => {
  const logo = <Masked src={WORD} ratio={WORD_RATIO} height={height} style={style} />;
  if (!linkTo) return logo;
  return (
    <Link to={linkTo} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} aria-label="Mpower Fitness">
      {logo}
    </Link>
  );
};

/* Icon-only mark — the "MP" mark in a navy chip (collapsed sidebar, etc.) */
export const LogoIcon = ({ size = 40, style }) => (
  <div style={{
    width: size, height: size, borderRadius: 10,
    background: 'var(--s1)', border: '1px solid var(--border-bright)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', ...style,
  }}>
    <Masked src={MARK} ratio={MARK_RATIO} height={Math.round(size * 0.56)} />
  </div>
);

export const LogoMark = ({ height = 50 }) => <LogoFull height={height} linkTo={null} />;

export default LogoFull;
