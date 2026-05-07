import Footer from "../components/Footer";

import { Helmet } from "react-helmet";
import AnimeList from "../components/AnimeList";
import Genres from "../components/Genres";
import Heading from "../components/Heading";
const Home = () => {
  return (
    <div className="relative">
      <Helmet>
        <title>
          Watch Anime Online, Free Anime Streaming Online on watanuki Anime
          Website
        </title>
        <meta
          name="description"
          content=" watanuki to is a free no ads anime site to watch free anime. Online anime streaming at watanuki with DUB, SUB in HD watanuki.shop."
        />
        <meta property="og:title" content="home - watanuki" />
      </Helmet>

      <>
        <div className="xl:mx-10 pt-14">
          <AnimeList title="Most Popular" endpoint="bypopularity" />
          <div className="mb-5">
            <Heading className="mb-2">Genres</Heading>
            <div className="sm:bg-lightbg bg-none rounded-sm px-2 py-1">
              <Genres className="sm:w-1/3 px-2 rounded-sm py-1 mb-2 line-clamp-1 bg-lightbg sm:bg-transparent mx-1 sm:mx-0 text-center font-bold text-lg xl:text-base" />
            </div>
          </div>
          <AnimeList title="Most Favorite" endpoint="favorite" />
          <AnimeList title="Top Airing" endpoint="airing" />
        </div>
        <Footer />
      </>
    </div>
  );
};

export default Home;
