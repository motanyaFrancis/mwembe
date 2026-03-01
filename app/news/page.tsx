import type { Metadata } from "next";
import NewsList from "@/components/NewsList"; // CSR component

import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "News & Press",
  description: "Latest news and press releases from our organization.",
};

export default function NewsPage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section
        className="px-8 pt-40 md:px-20 py-16 min-h-[400px] md:min-h-[500px] 
                bg-no-repeat bg-cover
                bg-[position:75%_center] 
                sm:bg-[position:85%_center]
                bg-[position:0%_top]
                lg:bg-[position:0%_top]
                flex items-center"
        style={{ backgroundImage: "url(/images/hero.jpg)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-black leading-tight text-left">
            News & Press
          </h1>
        </div>
      </section>

      {/* ================= NEWS LIST + PAGINATION (CSR) ================= */}
      <NewsList allPosts={posts} postsPerPage={6} />
    </>
  );
}