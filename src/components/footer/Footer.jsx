import { Typography, Button, IconButton } from "@material-tailwind/react";
import { FaInstagram } from "react-icons/fa";

const LINKS = ["About ITA", "Contact Us", "Privacy Policy"];

function Footer() {
  return (
    <footer className="pb-5 p-10 md:pt-10">
      <div className="container flex flex-col mx-auto">
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
