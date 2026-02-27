import React from "react";
import AboutTabs from "@/components/AboutTabs";
import CallToAction from "@/components/CallToAction";
import PillarBlock from "@/components/PillarBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Read the official manifesto of Eng. Jacton Mwembe for IEK President 2026–2028. Integrity. Inclusion. Impact.",
};

export default function AboutPage() {
  return (
    <>
      <main className="bg-white relative">

        {/* ================= HERO SECTION ================= */}
        <section
          className="relative px-6 md:px-20 pt-32 md:pt-40 pb-24 md:pb-28 text-white"
          style={{
            backgroundImage: "url('/gallery/gallery-3.jpeg')",
            backgroundPosition: "top ",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

          <div className="relative max-w-6xl mx-auto text-left space-y-6">
            <p className="uppercase tracking-widest text-gold-400 font-bold text-sm md:text-base">
              Engineering Leadership for a New Era
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight">
              Restoring Dignity
              <br />
              Strengthening Influence
            </h1>

            <p className="text-base font-semibold md:text-xl max-w-3xl ">
              Engineers built this nation’s infrastructure.
              It is time we shape its direction.
            </p>

            {/* <div className="pt-6">
              <button className="bg-gold-500 hover:bg-gold-600 transition px-8 py-3 font-semibold text-black">
                Read the Reform Agenda
              </button>
            </div> */}
          </div>
        </section>

        {/* ================= TAB SECTION ================= */}
        <div className="relative mx-auto">
          <AboutTabs />
        </div>
      </main>
      <CallToAction />
    </>
  );
}
