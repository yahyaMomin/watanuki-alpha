import { useRef, useState } from "react";
import { FaArrowCircleRight, FaBars, FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useApi } from "../services/useApi";
import Logo from "./Logo";
import useSidebarStore from "../store/sidebarStore";
import Loader from "./Loader";

const Header = () => {
  const sidebarHandler = useSidebarStore((state) => state.toggleSidebar);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  // Debounce input value
  const changeInput = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${value}`);
    setShowSearchBar(false);
  };

  const emptyInput = () => {
    setValue("");
  };
  return (
    <div className="relative z-[100]">
      <div className="fixed bg-card w-full  py-2">
        <div className="flex gap-2 px-5 md:px-10 md:gap-5 justify-between items-center">
          <div className="left flex gap-2 md:gap-5 items-center">
            <div className="menu" onClick={sidebarHandler}>
              <h1 className="cursor-pointer">
                <FaBars size={25} />
              </h1>
            </div>
            <Logo />
          </div>
          <div className="right justify-end lg:basis-[40%] flex gap-2 md:gap-5 items-center">
            <button
              className="text-xl"
              onClick={() => setShowSearchBar(!showSearchBar)}
            >
              {showSearchBar ? <FaXmark /> : <FaSearch />}
            </button>
          </div>
        </div>
        <form
          action={`/search?keyword=${value}`}
          onSubmit={handleSubmit}
          className={`search mt-2 px-4 relative items-center w-full ${
            showSearchBar ? "flex" : "hidden"
          }`}
        >
          <input
            value={value}
            onChange={changeInput}
            placeholder="search anime"
            type="text"
            className="header-search w-full bg-[#FBF8EF] px-2 text-lg text-black py-1 rounded-md"
          />
          <div className="btns absolute right-8 flex justify-center items-center gap-3">
            {value.length > 1 && (
              <button onClick={emptyInput} type="reset" className="text-black">
                <FaXmark />
              </button>
            )}
            <button type="submit" className="text-black">
              <FaSearch />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;
