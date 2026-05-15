export function SteamParticles({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute flex flex-col items-center gap-1 ${className}`}
    >
      <div
        className="w-2.5 h-5 rounded-full bg-white/60 blur-md animate-vapor"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="w-3 h-6 rounded-full bg-white/50 blur-md animate-vapor"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="w-2 h-4 rounded-full bg-white/60 blur-md animate-vapor"
        style={{ animationDelay: "2.4s" }}
      />
    </div>
  );
}
