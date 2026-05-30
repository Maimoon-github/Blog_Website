"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-6 py-24 text-center dark:bg-stone-950 sm:py-32 lg:px-8">
      <div className="max-w-md rounded-2xl border border-stone-200/50 bg-white p-8 shadow-xl dark:border-stone-800/50 dark:bg-stone-900">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400 mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        
        <p className="text-sm font-semibold tracking-wider uppercase text-red-600 dark:text-red-400">
          Application Error
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
          Something went wrong
        </h1>
        <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-400">
          An unexpected error occurred while rendering this page. We apologize for the inconvenience.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs font-mono text-stone-400 dark:text-stone-500">
            Error digest: {error.digest}
          </p>
        )}
        
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700/50"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
