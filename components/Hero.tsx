import Image from "next/image";

export default function Hero() {
    return (
        <section
            className="
            relative min-h-screen overflow-hidden
            bg-dark-800
            bg-no-repeat bg-cover
            bg-[position:85%_center]
            sm:bg-[position:75%_center]
            lg:bg-[position:85%_bottom]
            flex items-center
        "
            style={{
                backgroundImage: "url('/images/hero-bg2.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800/90 via-dark-800/20 to-transparent" />
            <div className="run-pinstripes undefined css-wyqlws-Pinstripes"></div>

            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(255,255,255,0.8) 0px,rgba(255,255,255,0.0) 1px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 8px)",
                }}
            />

            {/* CONTENT */}
            <div className="relative z-10 w-7xl mx-auto px-0 sm:px-6 flex flex-col justify-end md:justify-center min-h-screen sm:mt-32">
                <div className="max-w-3xl mx-0 sm:mx-0 text-left py-12 pb-4 px-8 bg-gradient-to-b from-transparent via-primary-800/10 to-primary-800 sm:bg-none">
                    <Image src="/images/vote.png" alt="Vote Logo" width={200} height={40} />
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        Engineering Integrity. Institutional Reform. National Impact.
                    </h1>

                    <p className="text-lg md:text-2xl font-bold text-white mb-6">
                        Eng. Jacton Mwembe Achieng for President — Engineers Board of Kenya
                    </p>

                    <p className="text-md md:text-xl font-semibold text-gold-500">
                        A bold vision to strengthen regulation, restore professional dignity,
                        and position engineers at the center of Kenya’s sustainable development.
                    </p>

                </div>
            </div>
        </section>
    );
}