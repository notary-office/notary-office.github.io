import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

// Share of the element that must be on screen before it fades in.
const THRESHOLD = 0.15;

// Fades its children up into place the first time they scroll into view, then stays visible.
// Only the vertical axis moves, so nothing needs mirroring in RTL. With prefers-reduced-motion
// (or without IntersectionObserver) the content is shown immediately.
export default function Reveal({ children, delay = 0, sx, ...props }) {
  const ref = useRef(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true });
  const supported = typeof IntersectionObserver !== 'undefined';
  const [revealed, setRevealed] = useState(false);
  const animate = supported && !reducedMotion;
  const visible = revealed || !animate;

  useEffect(() => {
    if (visible) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: THRESHOLD },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <Box
      ref={ref}
      sx={[
        animate && {
          opacity: visible ? 1 : 0,
          // `none` once shown, so the wrapper does not keep a transform (and its stacking context).
          transform: visible ? 'none' : 'translateY(24px)',
          transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}
