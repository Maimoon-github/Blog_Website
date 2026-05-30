"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-earth-gold">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-5xl mt-2">
            Contact Earth &amp; Escape
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-stone-600 dark:text-stone-400">
            Have questions about cob building techniques, structural thermal mass, or romantic getaway recommendations? Drop us a line below.
          </p>
        </div>

        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details Column */}
          <div className="flex flex-col justify-between p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/50 dark:border-stone-850 shadow-md">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mb-6">
                Connect Directly
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-earth-forest/10 text-earth-forest dark:text-earth-gold flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-white">Email Address</h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">hello@earthandescape.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-earth-forest/10 text-earth-forest dark:text-earth-gold flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-white">Studio Office</h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">104 Earthcrest Ridge, Boulder, Colorado</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-earth-forest/10 text-earth-forest dark:text-earth-gold flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-white">Hours</h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">Monday - Friday: 9 AM - 5 PM MST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/50 dark:border-stone-850 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              We try to reply to all editorial and natural building consulting inquiries within 48 business hours. If you are representing a hotel submission, please highlight &quot;HOTEL SUBMISSION&quot; in the message.
            </div>
          </div>

          {/* Form Column */}
          <div className="p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/50 dark:border-stone-850 shadow-md">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 animate-bounce">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                  Message Sent Successfully!
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-4 max-w-sm">
                  Thank you for writing. We have received your inquiry and will be in touch with you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 rounded-full bg-earth-forest px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-800 transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-stone-900 dark:text-white">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 block w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 focus:border-earth-forest focus:bg-white focus:ring-1 focus:ring-earth-forest dark:border-stone-800 dark:bg-stone-950 dark:text-white dark:focus:bg-stone-900 text-sm"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-stone-900 dark:text-white">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 block w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 focus:border-earth-forest focus:bg-white focus:ring-1 focus:ring-earth-forest dark:border-stone-800 dark:bg-stone-950 dark:text-white dark:focus:bg-stone-900 text-sm"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-stone-900 dark:text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-2 block w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 focus:border-earth-forest focus:bg-white focus:ring-1 focus:ring-earth-forest dark:border-stone-800 dark:bg-stone-950 dark:text-white dark:focus:bg-stone-900 text-sm"
                    placeholder="Tell us what you're building or looking for..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-earth-forest py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-800 transition hover-lift disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Submit Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
