import Countdown from "./Countdown";

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full bg-[url('/static/images/bg.png')] bg-cover bg-no-repeat">
      <div className="absolute inset-0 h-full w-full bg-gray-900/80 lg:bg-gray-900/20" />
      <div className="grid min-h-screen">
        <div className="container relative z-10 my-auto mx-auto hero-grid">
          <div className="text-white text-center logo-text-area text-7xl 2xl:text-8xl">
            <div className="samhita-font">SAMHITA</div>
            <div className="samhita-font">2024</div>
            <div className="text-3xl mt-2">Engage. Express. Evolve.</div>
          </div>
          <div className="countdown-area">
            <Countdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
