// components/EarthenHomes/subcomponents/RelatedCluster.tsx
import React from 'react';
import { ClusterArticle } from '../types';

/**
 * Related in Cluster sidebar/footer (X06)
 * Makes the hub-and-spoke architecture visible to readers.
 */
export const RelatedCluster: React.FC<{ clusterName: string; articles: ClusterArticle[] }> = ({
  clusterName,
  articles,
}) => (
  <aside className="bg-earth-cream-dark rounded-card p-6 lg:p-8 border border-earth-stone">
    <h3 className="text-xs font-semibold tracking-widest uppercase text-earth-green mb-4">
      More in {clusterName}
    </h3>
    <ul className="space-y-3">
      {articles.map((article) => (
        <li key={article.href}>
          <a
            href={article.href}
            className={`block text-sm leading-snug transition-colors ${
              article.isCurrent
                ? 'font-semibold text-earth-brown'
                : 'text-earth-text-secondary hover:text-earth-brown'
            }`}
            aria-current={article.isCurrent ? 'page' : undefined}
          >
            {article.title}
          </a>
        </li>
      ))}
    </ul>
  </aside>
);