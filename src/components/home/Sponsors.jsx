const Sponsors = () => {
  const sponsors = [
    "coinbase",
    "spotify",
    "pinterest",
    "google",
    "amazon",
    "netflix",
  ];
  return (
    <section className="py-8 px-8 lg:py-20 bg-gray-200">
      <div className="container mx-auto text-center">
        <div className="text-xl text-blue-950 mb-8">SPONSORED BY</div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {sponsors.map((logo, key) => (
            <img
              key={key}
              src={`/logos/logo-${logo}.svg`}
              alt={logo}
              className="w-40"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Sponsors;
