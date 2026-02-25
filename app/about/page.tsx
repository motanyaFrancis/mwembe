import React from "react";
import AboutTabs from "@/components/AboutTabs";
import CallToAction from "@/components/CallToAction";
import PillarBlock from "@/components/PillarBlock";

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-white font-sans overflow-x-hidden">

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
            <p className="uppercase tracking-widest text-gold-400 font-semibold text-sm md:text-base">
              Engineering Leadership for a New Era
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
              Restoring Dignity.
              <br className="hidden md:block" />
              Strengthening Influence.
            </h1>

            <p className="text-base md:text-xl text-neutral-200 max-w-3xl ">
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

        {/* ================= STORY SECTION ================= */}
        {/* <section className="max-w-6xl mx-auto px-6 md:px-20 py-20">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

            <div className="space-y-6 text-dark-800">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary-800">
                A Profession at a Crossroads
              </h2>

              <p className="text-lg">
                Engineers design systems that endure. We solve problems that shape societies.
                Yet too often, our influence ends where implementation begins.
              </p>

              <p>
                Eng. Jacton “Tony” Mwembe believes engineers must move
                from the margins of policy to the center of national development.
                Institutions must not merely regulate — they must empower.
              </p>

              <p className="font-semibold text-gold-600 italic">
                This is not about personality. It is about institutional reform.
              </p>
            </div>

            <div className="overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500">
              <img
                src="/images/smile.png"
                alt="Eng. Jacton Mwembe"
                className="w-full h-auto object-cover border-8 border-gold-500/40"
              />
            </div>

          </div>
        </section> */}

        {/* ================= TAB SECTION ================= */}
        <AboutTabs />

        {/* ================= VISION & MISSION ================= */}
        {/* <section className="bg-neutral-50 py-20 px-6 md:px-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

            <div className="bg-white p-10 shadow-lg hover:shadow-2xl transition">
              <h3 className="text-2xl font-bold text-primary-800 mb-4">
                Vision
              </h3>
              <p className="text-dark-700">
                A respected, empowered, and nationally influential engineering
                profession at the center of Kenya’s development — shaping
                policy, driving innovation, and setting standards of excellence.
              </p>
            </div>

            <div className="bg-white p-10 shadow-lg hover:shadow-2xl transition">
              <h3 className="text-2xl font-bold text-primary-800 mb-4">
                Mission
              </h3>
              <p className="text-dark-700">
                To restore dignity, strengthen institutional influence, and expand
                opportunity through transparent leadership, youth inclusion,
                and structured professional reform.
              </p>
            </div>

          </div>
        </section> */}

        {/* ================= STRATEGIC REFORM PILLARS ================= */}
        {/* <section className="bg-neutral-100 py-24 px-6 md:px-20">
          <div className="max-w-7xl mx-auto">

            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-950 mb-16 text-center">
              Strategic Reform Pillars
            </h2>

            <div className="grid md:grid-cols-2 gap-12">

              <PillarBlock pillar={{
                title: "Professional Dignity & Fair Compensation",
                description:
                  "Establishing clear compensation standards and recognition frameworks that reflect the value engineers contribute to society."
              }} />

              <PillarBlock pillar={{
                title: "Regulatory Strength & Enforcement",
                description:
                  "Strengthening institutional authority to protect standards, enforce compliance, and uphold public trust."
              }} />

              <PillarBlock pillar={{
                title: "Youth Employment & Mentorship",
                description:
                  "Creating structured mentorship programs and employment pathways for graduate and early-career engineers."
              }} />

              <PillarBlock pillar={{
                title: "National Policy Influence",
                description:
                  "Positioning engineers at the center of development planning and national policy conversations."
              }} />

              <PillarBlock pillar={{
                title: "Institutional Transparency",
                description:
                  "Launching transparency dashboards, performance audits, and accountability frameworks."
              }} />

              <PillarBlock pillar={{
                title: "Inclusive Representation",
                description:
                  "Ensuring generational, regional, and disciplinary inclusivity across leadership structures."
              }} />

            </div>
          </div>
        </section> */}

        {/* ================= 90 DAY ACTION PLAN ================= */}
        {/* <section className="bg-primary-800 text-white py-24 px-6 md:px-20">
          <div className="max-w-6xl mx-auto text-center">

            <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
              The First 90 Days
            </h2>

            <div className="grid md:grid-cols-2 gap-8 text-left">

              {[
                "Launch Institutional Transparency Dashboard",
                "Initiate Independent Operational & Financial Audit",
                "Establish Youth Advisory & Employment Council",
                "Strengthen Regulatory Enforcement Framework",
                "Activate National Policy Engagement Strategy",
              ].map((item, idx) => (
                <div key={idx} className="bg-white text-dark-900 p-8 shadow-lg">
                  <h3 className="font-bold text-primary-800 mb-3">
                    Initiative {idx + 1}
                  </h3>
                  <p>{item}</p>
                </div>
              ))}

            </div>
          </div>
        </section> */}

        {/* ================= LEADERSHIP MANIFESTO ================= */}
        {/* <section className="max-w-6xl mx-auto px-6 md:px-20 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-800 mb-10">
            A Leadership Charter
          </h2>

          <div className="space-y-6 text-lg text-dark-800 max-w-3xl mx-auto">
            <p>“Engineers deserve dignity.”</p>
            <p>“Leadership must be transparent.”</p>
            <p>“Integrity must guide every decision.”</p>
            <p>“Inclusivity strengthens institutions.”</p>

            <p className="font-bold text-primary-800 text-xl pt-6">
              If elected, I will lead not for position — but for progress.
            </p>
          </div>
        </section> */}

      </main>

      <CallToAction />
    </>
  );
}
