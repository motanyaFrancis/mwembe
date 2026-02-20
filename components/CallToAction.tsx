import Link from "next/link"

export default function CallToAction() {
  return (
    <section className="relative bg-primary-950 text-white overflow-hidden">

      {/* gold Power Strip */}
      <div className="absolute top-0 left-0 w-full h-3 bg-gold-600" />

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:24px_24px]" />

      <div className="relative px-6 md:px-20 py-28 max-w-6xl mx-auto text-center">

        {/* Momentum Line */}
        <div className="text-gold-400 uppercase tracking-[0.25em] text-xs font-semibold mb-6">
          Join 10,000+ Supporters Across The Nation
        </div>

        {/* Headline */}
        <h3 className="text-4xl md:text-5xl font-extrabold leading-tight mb-8">
          This Is Our Moment.
          <br />
          Let’s Build The Future Together.
        </h3>

        {/* Supporting Copy */}
        <p className="text-primary-200 text-lg max-w-2xl mx-auto mb-14">
          Every movement is powered by people who choose to act.
          Volunteer your time. Support the mission. Stand for progress.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">

          <Link
            href="/volunteer"
            className="bg-gold-600 text-white font-bold tracking-widest px-10 py-5 border-b-4 border-gold-400 hover:bg-gold-700 hover:-translate-y-1 transition-all duration-300"
          >
            VOLUNTEER NOW
          </Link>

          <Link
            href="/donate"
            className="bg-white text-primary-950 font-bold tracking-widest px-10 py-5 border-b-4 border-primary-700 hover:bg-primary-100 hover:-translate-y-1 transition-all duration-300"
          >
            CONTRIBUTE TODAY
          </Link>

        </div>

      </div>

      {/* Angled Divider Bottom */}
      {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0V46.29c47.79,22,103.59,29,158,17C230,44,284,8,339,2.67c59-5.7,112,18.36,167,35.67C598,58,654,58,709,43.67c55-14.67,109-44,164-43.67,59,.33,113,31.33,168,40.67V0Z"
            className="fill-[#f7f1e7]"
          />
        </svg>
      </div> */}

    </section>
  )
}
