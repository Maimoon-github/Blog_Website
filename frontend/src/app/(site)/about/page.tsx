import React from "react";
import { mockAuthors } from "../../../lib/mockData";

export default function AboutPage() {
  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* About Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-earth-gold">
            Our Story
          </span>
          <h1 className="font-serif text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-5xl mt-2">
            Eco-Architectural Harmony
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-stone-600 dark:text-stone-400">
            Earth & Escape is a digital journal bridging the gap between natural building practices and romantic retreats. We believe architecture should be clean, low-impact, and aesthetically breath-taking.
          </p>
        </div>

        {/* Core Values Section */}
        <div className="mx-auto max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
              Why We Care About Earth Building
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-400 leading-relaxed text-sm">
              Earthen construction methods like cob, rammed earth, and adobe utilize local clay-rich soils, straw, and gravel. They avoid carbon-heavy manufacturing processes and are completely non-toxic. They are highly energy-efficient because they absorb heat during the day and release it when the air cools down. Earthen structures represent a thousands-of-years-old tradition that remains fully viable today.
            </p>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mt-8">
              The Escape Element
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-400 leading-relaxed text-sm">
              Every sustainable structure needs to inspire. We pair our architectural tutorials with the finest romantic escapes that utilize natural materials, geothermal energy, or beautiful outdoor wellness integrations like hot tubs and jacuzzis. We show that luxury travel doesn't have to cost the planet.
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[350px] border border-stone-200/50 dark:border-stone-850">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80"
              alt="Natural landscape"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Authors Section */}
        <div className="mx-auto max-w-5xl mt-24">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
              Meet Our Team
            </h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400">
              The writers, architects, and scouts curating content for Earth & Escape.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            {mockAuthors.map((author) => (
              <div
                key={author.slug}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/50 dark:border-stone-850 shadow-sm hover-lift"
              >
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-24 w-24 rounded-2xl object-cover shadow-md mx-auto sm:mx-0 flex-shrink-0"
                />
                <div className="text-center sm:text-left">
                  <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                    {author.name}
                  </h3>
                  <p className="text-xs font-semibold text-earth-forest dark:text-earth-gold uppercase tracking-wider mt-1">
                    {author.role}
                  </p>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mt-3 leading-relaxed">
                    {author.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
