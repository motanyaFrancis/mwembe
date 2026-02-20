"use client";

import { useState } from "react";
import { posts } from "@/data/posts";
import BlogList from "@/components/BlogList";
import Pagination from "@/components/Pagination";

const POSTS_PER_PAGE = 6;

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <>
      <section
        className="px-8 pt-40 md:px-20 py-16 min-h-[400px] md:min-h-[500px] text-white"
        style={{
          backgroundImage: "url('/images/background-1.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay to darken background for text readability */}
        {/* <div className="absolute inset-0 bg-slate-900/10"></div> */}

        {/* Content container */}
        <div className="max-w-7xl mx-auto">
          {/* <p className="uppercase tracking-widest text-white font-semibold mb-2">
                        Engineering is out of touch:
                    </p> */}

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            News & Press
          </h1>
        </div>
      </section>
      <BlogList posts={currentPosts} />

      <div className="flex justify-center bg-sky-50 pb-20">
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
