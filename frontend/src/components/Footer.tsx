import type { FC } from 'react';
import { Box, Typography, Link, IconButton, Divider, Stack } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer: FC = () => {
  const navigationLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Service', href: '#' },
    { label: 'Contact Us', href: '#' },
  ];

  const socialLinks = [
    { icon: <InstagramIcon />, href: '#', label: 'Instagram' },
    { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
    { icon: <TwitterIcon />, href: '#', label: 'Twitter' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: '#0A0A0A',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        py: 6,
        px: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large Faded Background Text */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: { xs: '4rem', md: '8rem', lg: '10rem' },
          fontWeight: 900,
          color: 'rgba(255, 255, 255, 0.03)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        Pay Stream
      </Box>

      <Box className="max-w-7xl mx-auto" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <Box className="flex justify-center mb-8">
          <Typography
            variant="h3"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #E91E8C 0%, #9B59B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            PayRoll
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Stack
          direction="row"
          spacing={4}
          className="justify-center mb-6"
          sx={{
            flexWrap: 'wrap',
            gap: { xs: 2, md: 4 },
          }}
        >
          {navigationLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              sx={{
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 400,
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#E91E8C',
                },
              }}
            >
              {link.label}
            </Link>
          ))}
        </Stack>

        {/* Social Media Icons */}
        <Stack
          direction="row"
          spacing={2}
          className="justify-center mb-8"
        >
          {socialLinks.map((social, index) => (
            <IconButton
              key={index}
              href={social.href}
              aria-label={social.label}
              sx={{
                width: 40,
                height: 40,
                backgroundColor: '#FFFFFF',
                color: '#0A0A0A',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#E91E8C',
                  color: '#FFFFFF',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              {social.icon}
            </IconButton>
          ))}
        </Stack>

        {/* Divider */}
        <Divider
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.1)',
            mb: 4,
          }}
        />

        {/* Copyright */}
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: '#B0B0B0',
            fontSize: '0.875rem',
          }}
        >
          Copyright payRoll
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;