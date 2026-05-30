// components/EarthenHomes/EarthenHomes.tsx
import React from 'react';
import { SkipLink } from './subcomponents/SkipLink';
import { Header } from './subcomponents/Header';
import { Hero } from './subcomponents/Hero';
import { SectionHeader } from './subcomponents/SectionHeader';
import { StatCallout } from './subcomponents/StatCallout';
import { NumberedReasonCard } from './subcomponents/NumberedReasonCard';
import { FeaturedArticlesGrid } from './subcomponents/FeaturedArticlesGrid';
import { AudienceCallout } from './subcomponents/AudienceCallout';
import { Footer } from './subcomponents/Footer';
import { Article, ReasonCardData } from './types';

const featuredArticles: Article[] = [
  {
    id: '1',
    category: 'Beginner\'s Guide',
    title: 'Natural Building 101: Complete Beginner\'s Guide to Earthen Homes',
    href: '/beginners-guide',
  },
  {
    id: '2',
    category: 'Most Popular',
    title: 'Cob vs. Adobe vs. Rammed Earth: Which Technique Is Right for You?',
    href: '/cob-vs-adobe',
  },
  {
    id: '3',
    category: 'Practical',
    title: 'How Much Does It Really Cost to Build an Earthen Home?',
    href: '/cost-guide',
  },
  {
    id: '4',
    category: 'Inspiring',
    title: '12 Stunning Earthen Homes Built for Under $30,000',
    href: '/inspiring-homes',
  },
  {
    id: '5',
    category: 'Scientific',
    title: 'The Thermal Mass Advantage: Why Earthen Homes Stay Comfortable Year-Round',
    href: '/thermal-mass',
  },
  {
    id: '6',
    category: 'Getting Started',
    title: 'Your First Weekend with Earth: A Beginner\'s Cob Workshop Guide',
    href: '/cob-workshop',
  },
];

const reasons: ReasonCardData[] = [
  {
    number: 1,
    title: 'Dramatically Lower Cost',
    description:
      'The raw materials for earthen building — clay-rich soil, sand, straw, and water — are found almost everywhere on Earth and cost little to nothing. A competent owner-builder can construct a modest cob or adobe home for a fraction of the price of conventional construction.',
  },
  {
    number: 2,
    title: 'Extraordinary Energy Efficiency',
    description:
      'Earthen walls possess exceptional thermal mass — the ability to absorb heat slowly during the day and release it gradually at night. Earth-sheltered homes in particular can achieve energy savings of 50% or more compared to conventional houses.',
  },
  {
    number: 3,
    title: 'Superior Indoor Air Quality & Health',
    description:
      'Earthen walls, plastered with natural clay, actively regulate indoor humidity to around 50%, the ideal range for human health. They filter allergens, suppress mold growth, and create a living environment of remarkable purity and calm.',
  },
  {
    number: 4,
    title: 'Structural Durability',
    description:
      'Properly built earthen walls are astonishingly strong. Rammed-earth and compressed-earth-block walls can match the compressive strength of concrete. Cob homes in England have stood intact for 600 years.',
  },
  {
    number: 5,
    title: 'Minimal Environmental Impact',
    description:
      'Earthen building uses no fossil-fuel-intensive manufactured products. At end of life, earthen walls literally return to the earth. They produce no toxic waste, no pollution, and no landfill burden.',
  },
  {
    number: 6,
    title: 'Beauty & Creative Freedom',
    description:
      'Earth is a sculptor\'s medium. Cob allows curves, alcoves, built-in shelving, and organic forms that no other building method can match. Adobe creates warm, honey-colored walls that absorb and transform light.',
  },
];

/**
 * Homepage Template (T01)
 * Composes atoms, molecules, and organisms into the full homepage structure.
 */
export const EarthenHomesHomepage: React.FC = () => (
  <div className="min-h-screen bg-earth-cream font-sans antialiased">
    <SkipLink />
    <Header />

    <main id="main-content">
      <Hero />

      {/* Intro: "Ready to build smarter?" */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            title="Ready to build smarter?"
            subtitle="Explore modern earth homes you can actually live in."
          />
        </div>
      </section>

      {/* "A Living Archive of Earth Architecture" */}
      <section className="py-20 lg:py-28 bg-earth-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="A Living Archive of Earth Architecture" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <p className="text-earth-text-secondary leading-relaxed text-lg">
              The Earthen Homes is updated weekly with new guides, project spotlights, builder interviews,
              and research summaries. We draw on thousands of years of global building tradition, the latest
              research in sustainable construction, and conversations with real people who are actively building
              and living in earthen homes around the world — from rural Pakistan to suburban California, from
              the Scottish Highlands to the Australian Outback.
            </p>
            <p className="text-earth-text-secondary leading-relaxed text-lg">
              Our mission is not to romanticize the past or to advocate for a single approach. It is to give you
              the clearest, most honest, most practically useful information available so that you can make the
              best choices for your own home, your own land, and your own life. Earth building is not for everyone.
              But for those it calls to, there is nothing else quite like it.
            </p>
          </div>
        </div>
      </section>

      {/* Stat Callout: Did You Know? */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatCallout
            value="30%"
            label="of the world's population"
            context="Approximately 2.4 billion people currently live in homes built with earth. From ancient Jericho (10,000 BC) to the rammed-earth sections of China's Great Wall, to the living cob cottages of Devon, England (some dating to the 14th century), earthen architecture is humanity's oldest and most enduring building tradition."
          />
        </div>
      </section>

      {/* Six Compelling Reasons */}
      <section className="py-20 lg:py-28 bg-earth-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Why Earthen Homes?" title="Six Compelling Reasons" />
          <div className="space-y-10 lg:space-y-14">
            {reasons.map((reason, index) => (
              <NumberedReasonCard key={reason.number} data={reason} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="py-20 lg:py-28 bg-white" id="explore">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Start Here" title="Featured Articles to Start Your Journey" />
          <FeaturedArticlesGrid articles={featuredArticles} />
        </div>
      </section>

      {/* Audience Callout */}
      <section className="py-16 bg-earth-green/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AudienceCallout title="Who This Site Is For">
            Whether you are a curious beginner who just watched a documentary about cob houses and can&apos;t stop
            thinking about it, an architect or builder exploring natural materials, a homesteader planning an
            off-grid life, a sustainability advocate researching low-carbon housing, or simply someone who wants
            to understand why so many people are choosing to build with mud — this site was made for you. Every
            article is written to be accessible to beginners while remaining substantively useful to experienced
            builders.
          </AudienceCallout>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20 lg:py-28 bg-earth-cream text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xl lg:text-2xl text-earth-brown font-serif italic leading-relaxed mb-6">
            &ldquo;Explore. Ask questions. Start small. Build something with your hands. The earth is waiting.&rdquo;
          </p>
          <p className="text-sm font-semibold tracking-widest uppercase text-earth-green">
            The Earthen Homes
          </p>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);