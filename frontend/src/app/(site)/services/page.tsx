import React from "react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Earthen Construction Consulting",
      price: "From $150 / hr",
      description: "Speak with our natural building specialists to review your site soil profiles, discuss cob/adobe formulations, foundation options, and structural layouts.",
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
    },
    {
      title: "Passive Solar & Thermal Design",
      price: "Custom Quote",
      description: "Integrate optimal solar orientation, window sizing, and heavy mass walls to heat and cool your earthen building naturally with zero grid electricity.",
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
    },
    {
      title: "Luxury Romantic Travel Scouting",
      price: "From $99 / itinerary",
      description: "Allow our travel editors to curate a customized vacation roadmap. We specialize in secluded luxury retreats that feature private in-room hot tubs and jacuzzis.",
      features: [
        "Unlisted luxury cabin access",
        "Geothermal hot tub selections",
        "Romantic dining recommendations",
        "Fully detailed booking links",
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.25 2.25 0 01-1.6-2.098V7.962c0-.706-.404-1.343-1.04-1.607L14.47 5.252a2.25 2.25 0 01-1.242-1.243L12.124 2.88a2.25 2.25 0 00-4.07 0L6.95 4.01a2.25 2.25 0 01-1.243 1.242L2.776 6.355C2.14 6.62 1.737 7.256 1.737 7.962v2.198a2.25 2.25 0 01-1.6 2.098l-1.135 1.135a2.25 2.25 0 000 3.182l1.135 1.135a2.25 2.25 0 011.6 2.098v2.198c0 .706.404 1.343 1.04 1.607l2.942 1.106a2.25 2.25 0 011.243 1.243l1.106 2.942a2.25 2.25 0 004.07 0l1.106-2.942a2.25 2.25 0 011.243-1.243l2.942-1.106c.636-.264 1.04-1.901 1.04-2.607v-2.198a2.25 2.25 0 011.6-2.098l1.135-1.135a2.25 2.25 0 000-3.182z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-earth-gold">
            Consultancy &amp; Advisory
          </span>
          <h1 className="font-serif text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-5xl mt-2">
            Services We Provide
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-stone-600 dark:text-stone-400">
            We partner with home builders and travelers to offer specialized advisory support across construction and unique travel planning.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/50 dark:border-stone-850 shadow-md hover-lift"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-earth-forest/10 text-earth-forest dark:text-earth-gold mb-6">
                  {service.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-xs font-bold text-earth-gold uppercase tracking-wider mt-1">
                  {service.price}
                </p>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-4 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-8">
                <ul role="list" className="space-y-3 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-earth-forest dark:text-earth-gold flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block w-full text-center rounded-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 py-2.5 text-xs font-semibold shadow-sm transition"
                >
                  Inquire Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
