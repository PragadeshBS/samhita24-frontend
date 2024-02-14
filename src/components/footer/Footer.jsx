import { Typography, Button, IconButton } from "@material-tailwind/react";
import { FaInstagram } from "react-icons/fa";

const LINKS = ["About ITA", "Contact Us", "Privacy Policy"];

function Footer() {
  return (
    <footer className="pb-5 p-10 md:pt-10">
      <div className="container flex flex-col mx-auto">
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
        <div className="flex flex-col md:flex-row items-center !justify-between">
          <Typography as="a" href="#" variant="h6" className="text-gray-400">
            SAMHITA 2024
          </Typography>
          <ul className="flex justify-center my-4 md:my-0 w-max mx-auto items-center gap-4">
            {LINKS.map((link, index) => (
              <li key={index}>
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="white"
                  className="font-normal !text-gray-400 hover:!text-gray-100 transition-colors"
                >
                  {link}
                </Typography>
              </li>
            ))}
          </ul>
          <div className="flex w-fit justify-center gap-2">
            <IconButton size="sm" color="blue" variant="text">
              <a href="https://www.instagram.com/samhita_mit" target="_blank">
                <FaInstagram className="text-white" />
              </a>
            </IconButton>
          </div>
        </div>
        <Typography
          color="blue-gray"
          className="text-center mt-12 font-normal !text-gray-700"
        >
          Made with ❤️ by the{" "}
          <a
            href="https://github.com/PragadeshBS/samhita24-frontend"
            target="_blank"
            className="underline"
          >
            SAMHITA team
          </a>{" "}
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
