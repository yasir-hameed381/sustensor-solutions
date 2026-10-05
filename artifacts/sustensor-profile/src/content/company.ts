const whatsappNumber = '966570786381';
const email = 'sustensor.solutions@gmail.com';

export const company = {
  name: 'Sustensor Solutions',
  legalName: 'Sustensor Solutions LLC',
  shortName: 'Sustensor',
  tagline: 'A better, sustainable future',
  location: 'Riyadh, KSA',
  locationLong: 'Riyadh, Kingdom of Saudi Arabia',
  region: 'Saudi Arabia / Middle East',
  email,
  emailUrl: `mailto:${email}`,
  phone: '+966 57 078 6381',
  whatsappUrl: `https://wa.me/${whatsappNumber}`,
  whatsappGreetingUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Sustensor Solutions, I would like to discuss your advisory and sustainability services.',
  )}`,
  logo: {
    onDark: '/sustensor-logo.png',
    onLight: '/sustensor-logo-on-light.png',
  },
  pdfFileName: 'sustensor-solutions-profile.pdf',
} as const;
