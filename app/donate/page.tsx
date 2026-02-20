export default function DonatePage() {
    return (
        <main className="bg-[#f7f1e7] text-[#1a1f38]">

            {/* ================= HERO ================= */}
            <section className="bg-sky-900 text-white px-6 md:px-20 py-32 pt-44">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                        Support the Movement.
                        <br />
                        Invest in Change.
                    </h1>

                    <p className="text-sky-200 text-lg max-w-2xl mx-auto">
                        Your contribution fuels grassroots action, community outreach,
                        and policy-driven leadership.
                    </p>
                </div>
            </section>

            {/* ================= WHY DONATE ================= */}
            <section className="px-6 md:px-20 py-20 max-w-6xl mx-auto">
                <h2 className="text-3xl font-extrabold mb-12 text-center">
                    Why Your Donation Matters
                </h2>

                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        {
                            title: "Community Outreach",
                            text: "Support engagement programs that reach citizens directly."
                        },
                        {
                            title: "Policy Research",
                            text: "Fund research and development of transformative policies."
                        },
                        {
                            title: "Youth & Civic Programs",
                            text: "Empower the next generation of leaders."
                        }
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white p-8 shadow-lg border-t-4 border-amber-600"
                        >
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

            {/* ================= DONATION FORM ================= */}
            <section className="bg-sky-100 px-6 md:px-20 py-24">
                <div className="max-w-3xl mx-auto bg-white shadow-xl p-10 border-t-4 border-amber-600">

                    <h2 className="text-2xl font-extrabold mb-8 text-center text-sky-900">
                        Make a Contribution
                    </h2>

                    {/* Preset Amounts */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {["KES 500", "KES 1,000", "KES 2,500", "KES 5,000"].map((amount, i) => (
                            <button
                                key={i}
                                className="border border-sky-900 py-3 font-bold hover:bg-sky-900 hover:text-white transition"
                            >
                                {amount}
                            </button>
                        ))}
                    </div>

                    {/* Custom Amount */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">
                            Custom Amount (KES)
                        </label>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            className="w-full border border-sky-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-900"
                        />
                    </div>

                    {/* Donor Info */}
                    <div className="space-y-6">
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
                    </div>

                    {/* Payment Methods */}
                    <div className="mt-10">
                        <h3 className="text-lg font-bold mb-4 text-sky-900">
                            Payment Method
                        </h3>

                        <div className="space-y-3">
                            {["M-Pesa", "Card Payment", "Bank Transfer"].map((method, i) => (
                                <label
                                    key={i}
                                    className="flex items-center gap-3 border border-sky-300 p-4 cursor-pointer hover:bg-sky-50 transition"
                                >
                                    <input type="radio" name="payment" />
                                    <span>{method}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-10 bg-amber-600 text-white font-bold tracking-widest py-4 hover:bg-amber-700 transition"
                    >
                        DONATE NOW
                    </button>

                    <p className="text-xs text-slate-500 mt-6 text-center">
                        Contributions are secure and used responsibly in accordance
                        with campaign guidelines.
                    </p>
                </div>
            </section>

            {/* ================= IMPACT SECTION ================= */}
            <section className="px-6 md:px-20 py-20 max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold mb-8">
                    Your Impact
                </h2>

                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        { amount: "KES 500", impact: "Print outreach materials for 50 households." },
                        { amount: "KES 1,000", impact: "Sponsor youth civic training session." },
                        { amount: "KES 5,000", impact: "Support a full community engagement event." }
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white shadow-lg p-8 border-b-4 border-sky-900"
                        >
                            <div className="text-2xl font-black text-amber-600 mb-4">
                                {item.amount}
                            </div>
                            <p className="text-slate-600">{item.impact}</p>
                        </div>
                    ))}
                </div>
            </section>

        </main>
    )
}
