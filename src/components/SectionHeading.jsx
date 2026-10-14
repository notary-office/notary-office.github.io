import Typography from '@mui/material/Typography';

import Reveal from './Reveal.jsx';

// Reusable eyebrow + title + subtitle block. `align` is 'left' or 'center'.
export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', titleId, sx }) {
  const centered = align === 'center';

  return (
    <Reveal
      sx={{
        textAlign: centered ? 'center' : 'start',
        maxWidth: centered ? 720 : 'none',
        mx: centered ? 'auto' : 0,
        mb: { xs: 5, md: 6 },
        ...sx,
      }}
    >
      {eyebrow && (
        <Typography variant="eyebrow" component="p" sx={{ mb: 2 }}>
          {eyebrow}
        </Typography>
      )}
      <Typography variant="h2" id={titleId}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {subtitle}
        </Typography>
      )}
    </Reveal>
  );
}
