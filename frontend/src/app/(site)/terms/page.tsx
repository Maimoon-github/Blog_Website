import React from "react";

export default function TermsPage() {
  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
          Terms of Service
        </h1>
        <p className="text-xs text-stone-500 mt-2">Last updated: May 30, 2026</p>

        <div className="mt-8 prose prose-stone dark:prose-invert text-sm text-stone-600 dark:text-stone-400 space-y-6 leading-relaxed">
          <p>
            Welcome to Earth & Escape. These terms and conditions outline the rules and regulations for the use of Earth & Escape&apos;s Website.
          </p>

          <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white pt-4">
            1. Terms
          </h2>
          <p>
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Earth & Escape&apos;s website if you do not accept all of the terms and conditions stated on this page.
          </p>

          <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white pt-4">
            2. License
          </h2>
          <p>
            Unless otherwise stated, Earth & Escape and/or its licensors own the intellectual property rights for all material on Earth & Escape. All intellectual property rights are reserved. You may view and/or print pages from http://earthandescape.com for your own personal use subject to restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Republish material from this website</li>
            <li>Sell, rent, or sub-license material from this website</li>
            <li>Reproduce, duplicate, or copy material from this website</li>
            <li>Redistribute content from Earth & Escape (unless content is specifically made for redistribution)</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white pt-4">
            3. Disclaimer of Liability
          </h2>
          <p>
            The construction guidelines, blueprints, and chemical recipes provided on this site are for educational and planning purposes only. Earth & Escape does not take legal responsibility for any structural failures, construction accidents, or permitting issues resulting from building attempts based on tutorials published in this journal. Always hire licensed local structural engineers before building.
          </p>
        </div>
      </div>
    </div>
  );
}
