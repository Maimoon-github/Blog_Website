import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1 bg-[#131026] py-16 sm:py-24">
      {/* Ambient glow */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(95,45,166,0.15) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <span className="text-sm font-semibold tracking-wider uppercase text-[#8B65BF]">
          ✦ Legal
        </span>
        <h1 className="font-sans text-3xl font-extrabold tracking-tight text-[#E0E0E0] sm:text-4xl mt-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#4E3473] mt-2">Last updated: May 30, 2026</p>

        <div
          className="mt-10 rounded-3xl p-8 space-y-6 text-sm text-[#8B65BF]/80 leading-relaxed"
          style={{
            background: "#1F1A40",
            border: "1px solid rgba(78,52,115,0.5)",
          }}
        >
          <p>
            At Earth &amp; Escape, accessible from earthandescape.com, one of our main
            priorities is the privacy of our visitors. This Privacy Policy document contains
            types of information that is collected and recorded by Earth &amp; Escape and how
            we use it.
          </p>

          <h2 className="font-sans text-xl font-bold text-[#E0E0E0] pt-4 flex items-center gap-2">
            <span style={{ color: "#5F2DA6" }}>✦</span> 1. Consent
          </h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its
            terms.
          </p>

          <h2 className="font-sans text-xl font-bold text-[#E0E0E0] pt-4 flex items-center gap-2">
            <span style={{ color: "#5F2DA6" }}>✦</span> 2. Information We Collect
          </h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you
            are asked to provide it, will be made clear to you at the point we ask you to
            provide your personal information.
          </p>
          <p>
            If you contact us directly, we may receive additional information about you such
            as your name, email address, phone number, the contents of the message and/or
            attachments you may send us, and any other information you may choose to provide.
          </p>

          <h2 className="font-sans text-xl font-bold text-[#E0E0E0] pt-4 flex items-center gap-2">
            <span style={{ color: "#5F2DA6" }}>✦</span> 3. How We Use Your Information
          </h2>
          <ul className="space-y-2 pl-4">
            {[
              "Provide, operate, and maintain our website",
              "Improve, personalize, and expand our website",
              "Understand and analyze how you use our website",
              "Develop new products, services, features, and functionality",
              "Send you emails regarding newsletters and inquiries",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-[#5F2DA6] flex-shrink-0">✦</span>
                {item}
              </li>
            ))}
          </ul>

          <h2 className="font-sans text-xl font-bold text-[#E0E0E0] pt-4 flex items-center gap-2">
            <span style={{ color: "#5F2DA6" }}>✦</span> 4. Cookies and Web Beacons
          </h2>
          <p>
            Like any other website, Earth &amp; Escape uses &quot;cookies&quot;. These cookies
            are used to store information including visitors&apos; preferences, and the pages
            on the website that the visitor accessed or visited. The information is used to
            optimize the users&apos; experience by customizing our web page content based on
            visitors&apos; browser type and/or other information.
          </p>
        </div>
      </div>
    </div>
  );
}
