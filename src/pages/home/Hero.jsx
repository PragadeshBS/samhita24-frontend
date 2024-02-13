import { Countdown } from "./Countdown";

const Hero = () => {
  return (
    <div className="relative w-full bg-[url('/bg.png')] bg-cover bg-no-repeat cover-bg">
      <div className="absolute inset-0 h-full w-full bg-gray-900/20" />
      <div className="px-8">
        <div className="container relative z-10 my-auto mx-auto hero-grid">
          <div className="text-white logo-text-grid">
            <div className="logo-text ">SAMHITA</div>
            <div className="logo-text">2024</div>
            <div className="text-3xl">Engage. Express. Evolve</div>
          </div>
          <div className="countdown-grid">
            <Countdown />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
