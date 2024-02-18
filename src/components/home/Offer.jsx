import { Button, Typography } from "@material-tailwind/react";

const Offer = () => {
  return (
    <div className="flex !w-full py-10 mb-5 md:mb-20 flex-col justify-center !items-center bg-gray-900 max-w-6xl mx-auto rounded-2xl p-5 ">
      <Typography
        className="text-2xl md:text-3xl text-center font-bold "
        color="white"
      >
        Get a referral to avail 30% OFF!
      </Typography>
      <Typography
        color="white"
        className=" md:w-7/12 text-center my-3 !text-base"
      >
        Don&apos;t miss out on this exclusive offer that will end soon.
      </Typography>
      <div className="flex w-full md:w-fit gap-3 mt-2 flex-col md:flex-row">
        <Button className="bg-primaryLight" size="md">
          buy ticket
        </Button>
      </div>
    </div>
  );
};
export default Offer;
