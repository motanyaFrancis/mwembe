import Hero from "@/components/Hero";
// import Agenda from "@/components/Agenda";
import CallToAction from "@/components/CallToAction";
import Issues from "@/components/Issues";
import AboutUs from "@/components/About";
import BlogList from "@/components/BlogList"
import GalleryCarousel from "@/components/GalleryCarousel";

export default function HomePage() {

  const galleryImages = [
    "/images/architects-checking-documents.jpg",
    "/images/teamwork-cooperation.jpg",
    "/images/executives-comparing-blueprint-with-actual-building.jpg",
    "/images/view-male-engineer-work-engineers-day-celebration.jpg",
    "/images/executives-comparing-blueprint-with-actual-building.jpg",
    "/images/black-female-architect-civil-engineers-with-protective-face-masks-talking-construction-site.jpg",
    "/images/teamwork-cooperation.jpg",
    "/images/black-female-architect-civil-engineers-with-protective-face-masks-talking-construction-site.jpg",
  ];
  return (
    <>
      <Hero />
      <AboutUs
        imageUrl="/images/candidate.png"
        name="Mwembe"
        snippet="Born and raised in Nairobi, Mwembe showed an early passion for science and leadership. After excelling in his studies, he earned a degree in Civil Engineering from the University of Nairobi, where he also led several student initiatives advocating for innovation and community development."
        fullAboutLink="/about"
      />

      <Issues />
      {/* <Agenda /> */}
      <CallToAction />
      <BlogList limit={3} showSeeAll showHeadline />
      <GalleryCarousel images={galleryImages} />
    </>
  );
}
