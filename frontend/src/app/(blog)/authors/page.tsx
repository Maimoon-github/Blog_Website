import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getAuthors } from "@/lib/api";

export const metadata: Metadata = {
  title: "Authors | Earthen Homes",
  description: "The professional architects, sustainability consultants, and travel journalists behind our guides.",
};

export default async function AuthorsPage() {
  const authorsResponse = await getAuthors().catch(() => ({ results: [] }));
  const authors = authorsResponse.results;

  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-earth-gold">
            Our Writers
          </span>
          <h1 className="font-serif text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-5xl mt-2">
            Meet the Authors
          </h1>
          <p className="mt-4 text-stone-600 dark:text-stone-400">
            The professional architects, sustainability consultants, and travel journalists behind our guides.
          </p>
        </div>

        <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-8">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.slug}`}
              className="flex flex-col items-center text-center p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/50 dark:border-stone-850 shadow-sm hover-lift transition-all"
            >
                {author.photo?.url && (
                    <Image
                        src={author.photo.url}
                        alt={author.title}
                        width={112}
                        height={112}
                        className="h-28 w-28 rounded-full object-cover shadow-md mb-6 border-2 border-earth-gold/20"
                    />
                )}
              <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                {author.title}
              </h2>
              <p className="text-xs font-semibold text-earth-forest dark:text-earth-gold uppercase tracking-wider mt-1">
                {author.role}
              </p>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-4 leading-relaxed line-clamp-3">
                {author.bio}
              </p>
              <span className="mt-6 text-xs font-bold text-earth-forest dark:text-earth-gold hover:underline">
                View Articles &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
