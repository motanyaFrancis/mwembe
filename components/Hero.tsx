export default function Hero() {
    return (
        <section
            className="
            relative min-h-screen overflow-hidden
            bg-dark-950
            bg-no-repeat bg-cover
            bg-[position:85%_center]
            sm:bg-[position:70%_center]
            lg:bg-[position:85%_bottom]
            flex items-center
        "
            style={{
                backgroundImage: "url('/images/background-1.png')",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-dark-950/95 via-dark-950/20 to-transparent" />
            <div className="run-pinstripes undefined css-wyqlws-Pinstripes"></div>
            {/* Dark gradient overlay */}

            {/* Diagonal texture */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(255,255,255,0.8) 0px,rgba(255,255,255,0.0) 1px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 8px)",
                }}
            />

            {/* CONTENT */}
            <div className="relative z-10 w-7xl mx-auto px-0 sm:px-6 flex flex-col justify-end md:justify-center min-h-screen sm:mt-32">
                <div className="max-w-3xl mx-0 sm:mx-0 text-left sm:text-left py-12 px-4 bg-gradient-to-b from-primary-800/10 to-primary-950 sm:bg-none"                >
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gold-50 mb-6">
                        Lead. Innovate. Empower.
                    </h1>
                    <p className="text-lg md:text-2xl font-bold text-gold-50 mb-6">
                        Vying for President of the Engineers Board — driving collaboration, growth, and excellence.
                    </p>
                    <p className="text-md md:text-xl font-semibold text-gold-500">
                        Join me to shape a brighter future for our engineering community.
                    </p>
                </div>

            </div>

        </section>
    );
}
