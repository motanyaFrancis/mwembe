"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import IssueCard from "./IssueCard";
import Pagination from "./Pagination";
import { Issue } from "@/data/issues"; // <- import the type

type Props = {
    initialIssues: Issue[];
    allIssues: Issue[];
};

const ITEMS_PER_PAGE = 5;

export default function IssueListCSR({ initialIssues, allIssues }: Props) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Filtered Issues
    const filteredIssues = useMemo(() => {
        return allIssues.filter((issue) =>
            issue.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, allIssues]);

    const totalPages = Math.ceil(filteredIssues.length / ITEMS_PER_PAGE);

    const paginatedIssues = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredIssues.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredIssues, currentPage]);

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    return (
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
                <div className="md:col-span-2 space-y-6">
                    {(paginatedIssues.length ? paginatedIssues : initialIssues).map((issue) => (
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
    );
}