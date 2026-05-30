export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50/50 dark:bg-stone-950/50">
      <div className="relative flex items-center justify-center">
        {/* Outer pulse ring */}
        <div className="absolute h-16 w-16 animate-ping rounded-full bg-earth-gold/10 opacity-75"></div>
        {/* Inner rotating gradient spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-earth-gold dark:border-stone-800 dark:border-t-earth-gold"></div>
      </div>
      <p className="mt-4 text-sm font-medium tracking-wide text-stone-500 dark:text-stone-400 animate-pulse">
        Loading...
      </p>
    </div>
  );
}
