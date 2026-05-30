import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-xs text-stone-500 mt-2">Last updated: May 30, 2026</p>

        <div className="mt-8 prose prose-stone dark:prose-invert text-sm text-stone-600 dark:text-stone-400 space-y-6 leading-relaxed">
          <p>
            At Earth & Escape, accessible from earthandescape.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Earth & Escape and how we use it.
          </p>

          <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white pt-4">
            1. Consent
          </h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>

          <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white pt-4">
            2. Information we collect
          </h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p>
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
          </p>

          <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white pt-4">
            3. How we use your information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Send you emails regarding newsletters and inquiries</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white pt-4">
            4. Cookies and Web Beacons
          </h2>
          <p>
            Like any other website, Earth & Escape uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
          </p>
        </div>
      </div>
    </div>
  );
}
