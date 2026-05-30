import React from "react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Earthen Construction Consulting",
      price: "From $150 / hr",
      description:
        "Speak with our natural building specialists to review your site soil profiles, discuss cob/adobe formulations, foundation options, and structural layouts.",
      features: [
        "Soil composition analysis support",
        "Cob & adobe recipe optimization",
        "Rammed earth formwork advice",
        "Thermal mass calculations",
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      emoji: "🏛️",
    },
    {
      title: "Passive Solar & Thermal Design",
      price: "Custom Quote",
      description:
        "Integrate optimal solar orientation, window sizing, and heavy mass walls to heat and cool your earthen building naturally with zero grid electricity.",
      features: [
        "Solar azimuth & glazing sizing",
        "Diurnal temperature calculations",
        "Active vent integration",
        "Off-grid power alignments",
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M3.05 3.05l1.06 1.06M18.36 18.36l1.06 1.06M3.05 20.95l1.06-1.06M18.36 5.64l1.06-1.06M3 12h1.5m18 0H21M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
        </svg>
      ),
      emoji: "☀️",
    },
    {
      title: "Luxury Romantic Travel Scouting",
      price: "From $99 / itinerary",
      description:
        "Allow our travel editors to curate a customized vacation roadmap. We specialize in secluded luxury retreats that feature private in-room hot tubs and jacuzzis.",
      features: [
        "Unlisted luxury cabin access",
        "Geothermal hot tub selections",
        "Romantic dining recommendations",
        "Fully detailed booking links",
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      ),
      emoji: "🛁",
    },
  ];

  return (
    <div className="flex-1 bg-[#131026] py-16 sm:py-24">
      {/* Ambient glow */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(95,45,166,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-[#8B65BF]">
            ✦ Consultancy &amp; Advisory
          </span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-[#E0E0E0] sm:text-5xl mt-2">
            Services We <span className="gradient-text">Provide</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#8B65BF]/80">
            We partner with home builders and travelers to offer specialized advisory
            support across construction and unique travel planning.
          </p>
        </div>

        {/* Service Cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-8 rounded-3xl hover-lift transition-all duration-300"
              style={{
                background: "#1F1A40",
                border: "1px solid rgba(78,52,115,0.55)",
                boxShadow: "0 0 20px rgba(95,45,166,0.08)",
              }}
            >
              <div>
                {/* Icon badge */}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl mb-6 text-[#8B65BF]"
                  style={{
                    background: "rgba(95,45,166,0.15)",
                    border: "1px solid rgba(78,52,115,0.5)",
                    boxShadow: "0 0 10px rgba(95,45,166,0.2)",
                  }}
                >
                  {service.icon}
                </div>

                <h3 className="font-sans text-xl font-bold text-[#E0E0E0]">
                  {service.title}
                </h3>
                <p
                  className="text-xs font-bold uppercase tracking-wider mt-1"
                  style={{
                    background: "linear-gradient(135deg, #8B65BF 0%, #5F2DA6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {service.price}
                </p>
                <p className="text-sm text-[#8B65BF]/70 mt-4 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-8">
                <ul role="list" className="space-y-3 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-xs text-[#8B65BF]/80">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-3.5 h-3.5 flex-shrink-0"
                        style={{ color: "#5F2DA6" }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block w-full text-center rounded-full py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:scale-105"
                  style={{
                    background: "#5F2DA6",
                    boxShadow: "0 0 12px rgba(95,45,166,0.35)",
                  }}
                >
                  Inquire Now ✦
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto max-w-2xl mt-20 text-center">
          <div
            className="rounded-3xl px-8 py-12"
            style={{
              background: "rgba(95,45,166,0.07)",
              border: "1px solid rgba(78,52,115,0.45)",
              boxShadow: "0 0 40px rgba(95,45,166,0.08)",
            }}
          >
            <p className="text-[#8B65BF]/70 text-sm">
              Not sure which service fits your needs?
            </p>
            <h2 className="font-sans text-2xl font-bold text-[#E0E0E0] mt-2">
              Let&apos;s talk it through. <span className="lotus-badge">🪷</span>
            </h2>
            <Link
              href="/contact"
              className="inline-block mt-6 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{
                background: "#5F2DA6",
                boxShadow: "0 0 16px rgba(95,45,166,0.45)",
              }}
            >
              Get a Free Consultation →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
