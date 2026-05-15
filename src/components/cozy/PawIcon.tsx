export function PawIcon({
  className = "",
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <ellipse cx="6" cy="9" rx="1.6" ry="2.2" />
      <ellipse cx="10" cy="6" rx="1.6" ry="2.2" />
      <ellipse cx="14" cy="6" rx="1.6" ry="2.2" />
      <ellipse cx="18" cy="9" rx="1.6" ry="2.2" />
      <path d="M12 11c-3 0-5.5 2.2-5.5 4.8 0 1.9 1.7 3.2 3.6 3.2 .9 0 1.4-.4 1.9-.4s1 .4 1.9.4c1.9 0 3.6-1.3 3.6-3.2C17.5 13.2 15 11 12 11Z" />
    </svg>
  );
}