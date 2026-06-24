Füge der angegebenen Komponente zurückhaltende, professionelle Scroll-Reveal-
Animationen hinzu. Strikte Regeln:

- Verwende NUR `<Reveal>` und `<TextReveal>` aus src/components sowie die
  Variants aus src/lib/motion.ts. Erfinde keine neuen Inline-Variants.
- Easing immer ease.out ([0.16, 1, 0.3, 1]). Niemals easeInOut oder default.
- Nur Section-Header und Kerninhalt animieren — NICHT jedes Element. Dekoratives
  bleibt statisch.
- y-Travel 16–24px, Dauer 0.4–0.7s, Stagger 0.06–0.08s, viewport once: true.
- Nur transform & opacity. useReducedMotion respektieren.
- Headlines bevorzugt mit <TextReveal> (zeilenweiser Mask-Reveal).

Frage nach der Ziel-Komponente, falls keine genannt wurde.
