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
        snippet="With nearly 20 years in civil engineering practice, Eng. Jacton “Tony” Mwembe has built a career spanning infrastructure delivery, regulatory governance, and institutional leadership. As a national leader within the Institution of Engineers of Kenya (IEK), he champions transparency, professional dignity, and structured reform to position engineers at the center of Kenya’s development."
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
