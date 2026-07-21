/** Minimal stroke icons (currentColor, 24x24). */
type P = { className?: string };
const base = "h-6 w-6";
const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconWeb = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M7 6.5h.01M9.5 6.5h.01" />
  </svg>
);

export const IconSeo = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-3.5-3.5M9 11h4M11 9v4" />
  </svg>
);

export const IconAi = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <rect x="5" y="7" width="14" height="11" rx="2" />
    <path d="M12 7V4M9 12h.01M15 12h.01M3 12h2M19 12h2M9 18v2M15 18v2" />
  </svg>
);

export const IconMegaphone = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <path d="M4 10v4a1 1 0 0 0 1 1h3l7 4V5L8 9H5a1 1 0 0 0-1 1ZM18 9a3 3 0 0 1 0 6" />
  </svg>
);

export const IconLock = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3M12 15v2" />
  </svg>
);

export const IconShare = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" />
  </svg>
);

export const IconHistory = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4M12 8v4l3 2" />
  </svg>
);

export const IconFile = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 16h4" />
  </svg>
);

export const IconShield = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <path d="M12 3 5 6v5c0 4.2 2.8 7.7 7 9 4.2-1.3 7-4.8 7-9V6z" />
    <path d="m9.5 12 1.8 1.8L15 10" />
  </svg>
);

export const IconCloud = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <path d="M7 18a4 4 0 0 1 .5-8 5 5 0 0 1 9.6 1.4A3.3 3.3 0 0 1 17 18z" />
  </svg>
);

export const IconArrow = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconMail = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const IconPhone = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <path d="M6 3h3l1.5 5-2 1.5a12 12 0 0 0 6 6l1.5-2 5 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z" />
  </svg>
);

export const IconPin = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const IconCheck = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <path d="m5 12 4.5 4.5L19 7" />
  </svg>
);

export const IconInstagram = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17 7h.01" />
  </svg>
);

export const IconTiktok = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <path d="M13.8 13.6a3.4 3.4 0 1 1-3.4-3.4" />
    <path d="M13.8 13.6V4c.5 2.4 2.4 4.1 4.7 4.3" />
  </svg>
);

export const IconFacebook = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <path d="M14.5 6.5H14c-1.1 0-2 .9-2 2V20" />
    <path d="M9.5 12.5h5" />
  </svg>
);

export const IconLinkedin = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
    <path d="M7 10v6M7 7.5h.01M11 16v-3.5a2 2 0 0 1 4 0V16" />
  </svg>
);
