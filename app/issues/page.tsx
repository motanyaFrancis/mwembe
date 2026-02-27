"use client";

import { useMemo, useState } from "react";
import { issues } from "@/data/issues";
import IssueCard from "@/components/IssueCard";
import Pagination from "@/components/Pagination";
import { Search } from "lucide-react";


const ITEMS_PER_PAGE = 5;

export default function IssuesPage() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Filtered Issues
    const filteredIssues = useMemo(() => {
        return issues.filter((issue) =>
            issue.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const totalPages = Math.ceil(filteredIssues.length / ITEMS_PER_PAGE);

    const paginatedIssues = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredIssues.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredIssues, currentPage]);

    // Reset page when searching
    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    return (
        <main className="min-h-screen bg-[#E9E4D8] ">
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
                {/* Dark overlay */}
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


            {/* Content Section */}
            <section className="px-6 md:px-20 pt-20 pb-20 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-16">
                    {/* Search Sidebar */}
                    <div>
                        <div className="border border-neutral-400 flex items-center px-4 py-3 bg-white">
                            <input
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full outline-none text-primary-800"
                            />
                            <Search className="text-primary-800 ml-2" size={18} />
                        </div>
                    </div>

                    {/* Issues List */}
                    <div className="md:col-span-2">
                        {paginatedIssues.map((issue) => (
                            <IssueCard key={issue.id} issue={issue} />
                        ))}

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
