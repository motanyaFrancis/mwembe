import Link from "next/link"

export default function VolunteerPage() {
    return (
        <main className="bg-[#f7f1e7] text-[#1a1f38]">

            {/* ================= HERO ================= */}
            <section className="bg-sky-900 text-white px-6 md:px-20 py-32 pt-44">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                        Join the Movement.
                        <br />
                        Volunteer With Us.
                    </h1>

                    <p className="text-sky-200 text-lg max-w-2xl mx-auto">
                        Real change happens when committed citizens step forward.
                        Be part of the team shaping a better future.
                    </p>

                    <div className="mt-10">
                        <a
                            href="#volunteer-form"
                            className="bg-amber-600 text-white font-bold tracking-widest px-8 py-4 hover:bg-amber-700 transition"
                        >
                            SIGN UP TODAY
                        </a>
                    </div>
                </div>
            </section>

            {/* ================= WHY VOLUNTEER ================= */}
            <section className="px-6 md:px-20 py-20 max-w-6xl mx-auto">
                <h2 className="text-3xl font-extrabold mb-12 text-center">
                    Why Volunteer?
                </h2>

                <div className="grid md:grid-cols-3 gap-12">
                    {[
                        {
                            title: "Drive Change",
                            text: "Support policies and initiatives that directly impact communities."
                        },
                        {
                            title: "Build Community",
                            text: "Connect with like-minded individuals committed to progress."
                        },
                        {
                            title: "Make Your Voice Heard",
                            text: "Play an active role in shaping the direction of leadership."
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-white shadow-lg p-8 border-t-4 border-amber-600">
                            <h3 className="font-serif font-bold text-xl mb-4 text-sky-900">
                                {item.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= OPPORTUNITIES ================= */}
            <section className="bg-sky-100 px-6 md:px-20 py-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-extrabold mb-12 text-center text-sky-900">
                        Volunteer Opportunities
                    </h2>

                    <div className="grid md:grid-cols-2 gap-10">
                        {[
                            "Community Outreach",
                            "Event Coordination",
                            "Social Media Advocacy",
                            "Fundraising Support",
                            "Policy Research",
                            "Youth Engagement"
                        ].map((role, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 shadow-md hover:shadow-xl transition border-l-4 border-sky-900"
                            >
                                <h4 className="font-semibold text-lg text-sky-900">
                                    {role}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= FORM ================= */}
            <section
                id="volunteer-form"
                className="px-6 md:px-20 py-24 max-w-4xl mx-auto"
            >
                <h2 className="text-3xl font-extrabold mb-10 text-center">
                    Sign Up to Volunteer
                </h2>

                <form className="bg-white shadow-xl p-10 space-y-6 border-t-4 border-amber-600">

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="w-full border border-sky-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="w-full border border-sky-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            className="w-full border border-sky-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Area of Interest
                        </label>
                        <select className="w-full border border-sky-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-900">
                            <option>Community Outreach</option>
                            <option>Event Coordination</option>
                            <option>Social Media Advocacy</option>
                            <option>Fundraising Support</option>
                            <option>Policy Research</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Why do you want to volunteer?
                        </label>
                        <textarea
                            rows={4}
                            className="w-full border border-sky-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-900"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-sky-900 text-white font-bold tracking-widest py-4 hover:bg-sky-800 transition"
                    >
                        SUBMIT APPLICATION
                    </button>
                </form>
            </section>

            {/* ================= CTA ================= */}
            <section className="bg-amber-600 text-white px-6 md:px-20 py-16 text-center">
                <h3 className="text-2xl font-extrabold mb-4">
                    Together, We Can Make a Difference.
                </h3>
                <Link
                    href="/donate"
                    className="inline-block bg-sky-900 px-8 py-4 font-bold hover:bg-sky-800 transition"
                >
                    SUPPORT THE MOVEMENT
                </Link>
            </section>

        </main>
    )
}
