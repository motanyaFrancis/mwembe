import { issues } from "@/data/issues";
import IssueListCSR from "@/components/IssueList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Explore our key issues and policies that will drive change.",
};

export default function IssuesPageSSR() {
    // Only the first page data for SSR (optional, can pass all issues)
    const initialIssues = issues.slice(0, 5);

    return (
        <main className="min-h-screen bg-[#E9E4D8]">

            {/* Header Section */}
            <section
                className="relative px-2 md:px-20 pt-40 pb-10 bg-primary-800 text-white"
                style={{
                    backgroundImage: "url('/gallery/gallery-6.jpeg')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 bg-dark-800/40"></div>

                <div className="relative max-w-7xl mx-auto">
                    <p className="uppercase tracking-widest text-gold-400 font-extrabold mb-2">
                        My Policy Platform:
                    </p>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                        WE DESERVE GOOD THINGS
                    </h1>

                    <p className="mt-3 text-white text-lg font-bold">
                        And we don’t have to settle
                    </p>
                </div>
            </section>

            {/* CSR Issue List */}
            <IssueListCSR initialIssues={initialIssues} allIssues={issues} />
        </main>
    );
}