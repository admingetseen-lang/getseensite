/** GetSeen cloud-G mark + wordmark. mark-only via showWord={false}. */
export function Logo({
  showWord = true,
  className = "",
}: {
  showWord?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="h-8 w-8 shrink-0"
        role="img"
        aria-label="GetSeen Logo"
      >
        <defs>
          <linearGradient id="gs-mark" x1="0" y1="0" x2="64" y2="64">
            <stop stopColor="#7C5CFF" />
            <stop offset="1" stopColor="#36B6FF" />
          </linearGradient>
        </defs>
        <path
          d="M20 46a14 14 0 1 1 2-27.9A16 16 0 0 1 52 24a11 11 0 0 1-3 22H20Z"
          fill="url(#gs-mark)"
        />
        <path
          d="M33 22a10 10 0 1 0 9.6 12.6h-9.1v-5.2H48a14.7 14.7 0 0 1-15 11.6 13 13 0 1 1 0-26 12.9 12.9 0 0 1 9.4 4l-3.7 3.5A7.7 7.7 0 0 0 33 22Z"
          fill="#fff"
        />
      </svg>
      {showWord && (
        <span className="font-display text-xl font-semibold tracking-tight text-ink">
          GetSeen
        </span>
      )}
    </span>
  );
}
