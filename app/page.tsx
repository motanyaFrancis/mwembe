import Hero from "@/components/Hero";
// import Agenda from "@/components/Agenda";
import CallToAction from "@/components/CallToAction";
import Issues from "@/components/Issues";
import AboutUs from "@/components/About";
import BlogList from "@/components/BlogList"
import GalleryCarousel from "@/components/GalleryCarousel";
import { gallery } from "@/data/gallery";



export default function HomePage() {
  const imageGallery = gallery.filter((item) => item.type === "image").map((item) => item.src);


  return (
    <>
      <Hero />
      <AboutUs
        imageUrl="/images/mwembe-about.jpg"
        name="Mwembe"
        snippet={`With nearly two decades of experience in civil engineering, Eng. Jacton Mwembe Achieng has cultivated a distinguished career spanning infrastructure development, regulatory oversight, and institutional leadership. His work reflects a deep commitment to technical excellence, ethical governance, and sustainable nation-building.

As a national leader within the Institution of Engineers of Kenya (IEK), he advocates for transparency, professional integrity, and structured reform. He is committed to elevating the dignity of the engineering profession and positioning engineers at the forefront of Kenya’s development agenda — not merely as implementers of policy, but as strategic drivers of progress.`}
        fullAboutLink="/about"
      />

      <Issues />
      {/* <Agenda /> */}
      <CallToAction />
      <BlogList limit={3} showSeeAll showHeadline />
      <GalleryCarousel images={imageGallery} />
    </>
  );
}
