import React from "react";
import Image from "next/image";
import Link from "next/link";
import { mockCategories } from "../../../lib/mockData";

export default function CategoriesPage() {
  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-earth-gold">
            Topics
          </span>
          <h1 className="font-serif text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-5xl mt-2">
            Browse by Category
          </h1>
          <p className="mt-4 text-stone-600 dark:text-stone-400">
            Select an architectural style or travel theme to filter articles.
          </p>
        </div>

        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="flex flex-col bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/50 dark:border-stone-850 overflow-hidden shadow-sm hover-lift"
            >
              <div className="h-48 relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  unoptimized
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                  {category.name}
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                  {category.description}
                </p>
                <span className="inline-flex items-center text-xs font-bold text-earth-forest dark:text-earth-gold mt-6 hover:underline">
                  View Category Articles &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
