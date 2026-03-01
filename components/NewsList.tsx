"use client";

import { useState } from "react";
import BlogList from "@/components/BlogList";
import Pagination from "@/components/Pagination";

type NewsListProps = {
  allPosts: typeof import("@/data/posts").posts;
  postsPerPage: number;
};

export default function NewsList({ allPosts, postsPerPage }: NewsListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const currentPosts = allPosts.slice(startIndex, endIndex);

  return (
    <>
      <BlogList posts={currentPosts} />

      <div className="flex justify-center bg-primary-50 pb-20">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
    </>
  );
}