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
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  const inputClass =
    "mt-2 block w-full rounded-xl px-4 py-2.5 text-sm text-[#E0E0E0] outline-none transition-all duration-200 placeholder:text-[#4E3473]";
  const inputStyle = {
    background: "rgba(19,16,38,0.8)",
    border: "1px solid rgba(78,52,115,0.6)",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
  };

  return (
    <div className="flex-1 bg-[#131026] py-16 sm:py-24">
      {/* Ambient glow */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(95,45,166,0.2) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-[#8B65BF]">
            ✦ Get In Touch
          </span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-[#E0E0E0] sm:text-5xl mt-2">
            Contact <span className="gradient-text">Earth &amp; Escape</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#8B65BF]/80">
            Have questions about cob building techniques, structural thermal mass, or
            romantic getaway recommendations? Drop us a line below.
          </p>
        </div>

        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div
            className="flex flex-col justify-between p-8 rounded-3xl"
            style={{
              background: "#1F1A40",
              border: "1px solid rgba(78,52,115,0.55)",
              boxShadow: "0 0 30px rgba(95,45,166,0.1)",
            }}
          >
            <div>
              <h2 className="font-sans text-2xl font-bold text-[#E0E0E0] mb-8">
                Connect Directly
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    ),
                    label: "Email Address",
                    value: "hello@earthandescape.com",
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    ),
                    label: "Studio Office",
                    value: "104 Earthcrest Ridge, Boulder, Colorado",
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    label: "Hours",
                    value: "Monday – Friday: 9 AM – 5 PM MST",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 text-[#8B65BF]"
                      style={{ background: "rgba(95,45,166,0.15)", border: "1px solid rgba(78,52,115,0.4)" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#E0E0E0]">{item.label}</h3>
                      <p className="text-sm text-[#8B65BF]/70 mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mt-12 p-4 rounded-2xl text-xs text-[#8B65BF]/60 leading-relaxed"
              style={{ background: "rgba(19,16,38,0.6)", border: "1px solid rgba(78,52,115,0.3)" }}
            >
              ✦ We try to reply to all editorial and natural building consulting inquiries
              within 48 business hours. If you are representing a hotel submission, please
              highlight &quot;HOTEL SUBMISSION&quot; in the message.
            </div>
          </div>

          {/* Form */}
          <div
            className="p-8 rounded-3xl"
            style={{
              background: "#1F1A40",
              border: "1px solid rgba(78,52,115,0.55)",
              boxShadow: "0 0 30px rgba(95,45,166,0.1)",
            }}
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full mb-6 text-[#8B65BF] pulse-glow"
                  style={{ background: "rgba(95,45,166,0.2)", border: "1px solid rgba(95,45,166,0.5)" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 animate-bounce">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h2 className="font-sans text-2xl font-bold text-[#E0E0E0]">
                  Message Sent! ✦
                </h2>
                <p className="text-sm text-[#8B65BF]/70 mt-4 max-w-sm">
                  Thank you for writing. We have received your inquiry and will be in touch shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                  style={{ background: "#5F2DA6", boxShadow: "0 0 14px rgba(95,45,166,0.4)" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#E0E0E0]">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#E0E0E0]">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#E0E0E0]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="Tell us what you're building or looking for..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  style={{
                    background: "#5F2DA6",
                    boxShadow: "0 0 16px rgba(95,45,166,0.4)",
                  }}
                >
                  {isSubmitting ? "Sending… ✦" : "Submit Message ✦"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
