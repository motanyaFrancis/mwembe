import Hero from "@/components/Hero";
import Agenda from "@/components/Agenda";
import CallToAction from "@/components/CallToAction";
import Issues from "@/components/Issues";
import AboutUs from "@/components/About";
import BlogList from "@/components/BlogList"

export default function HomePage() {
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
      <BlogList limit={3}/>
      <Agenda />
      <CallToAction />
    </>
  );
}
