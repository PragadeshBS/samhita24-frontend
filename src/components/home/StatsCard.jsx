import { Typography, Card } from "@material-tailwind/react";

export function StatsCard({ count, title }) {
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h1" className="font-bold" color="white">
        {count}
      </Typography>
      <Typography variant="h6" className="mt-1 font-medium text-gray-300">
        {title}
      </Typography>
    </Card>
  );
}

export default StatsCard;
