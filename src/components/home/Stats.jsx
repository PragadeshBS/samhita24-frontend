import { Typography } from "@material-tailwind/react";
import StatsCard from "./StatsCard";

const STATS = [
  {
    count: "1,000+",
    title: "Participants",
  },
  {
    count: "1L",
    title: "Prize Money",
  },
  {
    count: "24",
    title: "Events",
  },
  {
    count: "2",
    title: "Days",
  },
];

const OurStats = () => {
  return (
    <section className="container mx-auto grid gap-10 px-8 py-44 lg:grid-cols-1 lg:gap-20 xl:grid-cols-2 xl:place-items-center">
      <div>
        <Typography variant="h6" className="mb-6 font-medium text-primaryLight">
          Our Stats
        </Typography>
        <Typography
          className="text-5xl font-bold leading-tight lg:w-3/4"
          color="white"
        >
          Symposium Highlights
        </Typography>
        <Typography
          variant="lead"
          className="mt-3 w-full !text-gray-500 lg:w-9/12"
        >
          This two-day extravaganza brings together the brightest minds, leading
          innovators, and top companies in the field of Information Technology.
        </Typography>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-8 gap-x-28">
          {STATS.map((props, key) => (
            <StatsCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStats;
