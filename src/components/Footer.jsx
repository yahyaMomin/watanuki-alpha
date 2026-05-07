import Logo from "./Logo";

import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="row mx-2  mt-5">
      <div className="logo w-full flex justify-center items-center">
        <Logo />
      </div>
      <div className="my-2 h-1 border-b border-b-neutral-700 "></div>

      <div className="desclaimer mt-5 mb-2 flex flex-col justify-center items-center">
        <p className="text-sm text-center text-gray-500">
          Watanuki does not store any files on our server, <br /> we only linked
          to the media which is hosted on 3rd party services.{" "}
        </p>
        <p className="mt-4 text-gray-500">© watanuki All rights reserved.</p>
        <div className="btns flex justify-center my-2 items-center gap-2">
          <a
            href="https://github.com/yahyaMomin"
            target="_blank"
            className="text-gray-500 hover:text-white text-2xl"
          >
            <FaGithub />
          </a>
          {/* <a
            href="https://t.me/Mst83din"
            target="_blank"
            className="text-gray-500 hover:text-blue-300 text-2xl"
          >
            <FaTelegram />
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
