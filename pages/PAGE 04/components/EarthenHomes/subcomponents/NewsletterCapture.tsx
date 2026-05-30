// components/EarthenHomes/subcomponents/NewsletterCapture.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterCaptureProps {
  title?: string;
  description?: string;
  variant?: 'inline' | 'card';
}

/**
 * Email Capture (X03) — Conversion UI for the Affordable page and other high-intent areas.
 */
export const NewsletterCapture: React.FC<<NewsletterCaptureProps> = ({
  title = 'Get the Free Cost Breakdown',
  description = 'Join 5,000+ builders. Get our PDF checklist and weekly guides.',
  variant = 'card',
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1200);
  };

  const wrapper =
    variant === 'card'
      ? 'bg-white rounded-card p-8 shadow-soft border border-earth-stone max-w-md'
      : 'bg-earth-cream-dark rounded-card p-6 border border-earth-stone';

  return (
    <div className={wrapper}>
      <h3 className="text-lg font-bold text-earth-brown mb-2">{title}</h3>
      <p className="text-sm text-earth-text-secondary mb-5">{description}</p>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-earth-green font-medium text-sm"
          >
            Thank you! Check your inbox for the download link.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-2.5 rounded-pill border border-earth-stone text-sm focus:outline-none focus:ring-2 focus:ring-earth-green focus:border-transparent bg-earth-cream"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-6 py-2.5 bg-earth-brown text-white text-sm font-medium rounded-pill hover:bg-earth-brown-dark transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-earth-brown focus:ring-offset-2 whitespace-nowrap"
            >
              {status === 'submitting' ? 'Sending...' : 'Get It Free'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};