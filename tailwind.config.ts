import type { Config } from "tailwindcss";

/**
 * Design tokens for the GetSeen flagship site.
 * Palette, type scale and spacing live here so they can be swapped in one place.
 * The ultramarine accent is the one swappable brand token.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0C11", // deep blue-black background (matches the glass footage)
        ink: "#F3F4F8", // near-white text
        paper: "#13141B", // raised dark surface
        line: "#262833", // muted border
        accent: {
          DEFAULT: "#1F3BFF", // ultramarine — swap here for official brand hex
          soft: "#141B3D",
          ink: "#162BBF",
        },
      },
      fontFamily: {
        display: ['"Clash Display"', '"Space Grotesk"', "system-ui", "sans-serif"],
        sans: ['"Satoshi"', "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // comfortable body for an older audience
        base: ["1.0625rem", { lineHeight: "1.65" }], // ~17px
        lg: ["1.1875rem", { lineHeight: "1.6" }], // ~19px
        // tight-leading editorial display scale
        "display-sm": ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2.75rem, 7vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(3.25rem, 10vw, 7rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
      },
      spacing: {
        section: "clamp(5rem, 12vw, 9rem)", // vertical rhythm between sections
        gutter: "clamp(1.25rem, 5vw, 4rem)", // page horizontal padding
      },
      maxWidth: {
        shell: "1280px",
        prose: "68ch",
      },
      transitionTimingFunction: {
        reveal: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(9%, 9%)" },
          "70%": { transform: "translate(-9%, 4%)" },
          "90%": { transform: "translate(4%, -2%)" },
        },
        "gradient-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.08)" },
        },
      },
      animation: {
        grain: "grain 8s steps(6) infinite",
        "gradient-drift": "gradient-drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
