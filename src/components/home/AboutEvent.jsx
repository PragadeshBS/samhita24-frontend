import { Typography } from "@material-tailwind/react";
import AboutCard from "./AboutCard";

const EVENT_INFO = [
  {
    title: "Code, Create, Conquer",
    description:
      "Dive into challenges that test your technical skills, from coding marathons to robotics showdowns. Innovation meets execution in a series of mind-bending competitions.",
    subTitle: "Technical Events",
    bg: "tech.jpg",
    gridAreaName: "technical-area",
  },
  {
    title: "Skills Beyond Screens",
    description:
      "Ignite your creativity with a range of non-technical activities. Take a break from the digital world and let your imagination run wild.",
    subTitle: "Non-Technical Events",
    bg: "non-tech.jpg",
    gridAreaName: "non-technical-area",
  },
  {
    title: "From Novice to Ninja",
    description:
      "Elevate your skills with hands-on workshops led by experts. Whether you're a beginner or an enthusiast, these sessions provide a unique opportunity to learn, collaborate, and gain practical knowledge.",
    subTitle: "Workshops",
    bg: "workshop.jpg",
    gridAreaName: "workshops-area",
  },
  {
    title: "The Pinnacle of Samhita!",
    description:
      "Our signature events encompass a dynamic hackathon challenging your technical acumen, engaging paper presentations to showcase your research and ideas, and a mega surprise event hosted by ITA that promises to be an unforgettable highlight.",
    subTitle: "Signature Events",
    bg: "signature.jpg",
    gridAreaName: "signature-area",
  },
];

const AboutEvent = () => {
  return (
    <section className="container mx-auto flex flex-col items-center px-4 py-10 bg-primary">
      <Typography variant="h3" className="text-center text-primaryLight">
        About Samhita
      </Typography>
      <Typography
        variant="lead"
        className="mt-2 lg:max-w-4xl mb-8 w-full text-center font-normal !text-gray-500"
      >
        SAMHITA serves as the culmination of masterful minds and the ideas those
        minds portray. Over 5000 students from 150 colleges rally together for
        this festival of Information Technology. SAMHITA establishes a platform
        for these students to showcase their swaggering talents in the fast-
        growing field of IT and AI.
      </Typography>
      <div className="mt-8 w-full about-samhita-grid">
        {EVENT_INFO.map((props, idx) => (
          <AboutCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
};

export default AboutEvent;
