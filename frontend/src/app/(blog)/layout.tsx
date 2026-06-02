"use client";

import React from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col bg-[#131026] text-[#E0E0E0]">
      {children}
    </div>
  );
}
