// components/EarthenHomes/subcomponents/ArticleCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { Tag } from './Tag';
import { fadeInUp } from '../animations/variants';

interface ArticleCardProps {
  article: Article;
}

/**
 * Card grid molecule for the Featured Articles section.
 * Replaces the anti-pattern of encoding articles as a 2-column table.
 */
export const ArticleCard: React.FC<<ArticleCardProps> = ({ article }) => (
  <motion.article
    variants={fadeInUp}
    className="group bg-white rounded-card border border-earth-stone overflow-hidden hover:shadow-soft transition-all duration-300 focus-within:shadow-soft"
  >
    <a href={article.href} className="block p-6 lg:p-8 h-full flex flex-col">
      <Tag>{article.category}</Tag>
      <h3 className="text-xl font-bold text-earth-brown mt-4 mb-3 group-hover:text-earth-green transition-colors leading-snug">
        {article.title}
      </h3>
      {article.description && (
        <p className="text-earth-text-secondary text-sm leading-relaxed mb-4 flex-grow">{article.description}</p>
      )}
      <span className="inline-flex items-center gap-1 text-sm font-medium text-earth-green mt-auto group-hover:gap-2 transition-all">
        Read more
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  </motion.article>
);