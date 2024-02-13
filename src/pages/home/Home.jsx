import AboutEvent from "../../components/home/AboutEvent";
import Faq from "../../components/home/Faq";
import Sponsors from "../../components/home/Sponsors";
import OurStats from "../../components/home/Stats";
import Hero from "./Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <Sponsors />
      <AboutEvent />
      <OurStats />
      <Faq />
    </>
  );
};

export default Home;
