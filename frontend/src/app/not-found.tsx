import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-6 py-24 text-center dark:bg-stone-950 sm:py-32 lg:px-8">
      <div className="max-w-md rounded-2xl border border-stone-200/50 bg-white p-8 shadow-xl dark:border-stone-800/50 dark:bg-stone-900">
        <p className="text-sm font-bold tracking-wider uppercase text-earth-gold">
          404 Error
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-400">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </p>
        
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 cursor-pointer"
          >
            Go back home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700/50"
          >
            Browse Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
