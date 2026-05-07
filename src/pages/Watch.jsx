import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { MdGridView, MdViewList } from "react-icons/md";

import Loader from "../components/Loader";
import Player from "../components/Player";
import EpisodeCard from "../components/EpisodeCard";
import PageNotFound from "./PageNotFound";

import { useApi } from "../services/useApi";

const Watch = () => {
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const [layout, setLayout] = useState("grid");
  const [page, setPage] = useState(1);

  const ep = Number(searchParams.get("ep"));

  const { data, isLoading, isError } = useApi(
    `/anime/${id}/episodes?page=${page}`,
  );

  const episodes = data?.data || [];
  const pagination = data?.pagination;

  const currentEp = useMemo(() => {
    return episodes.find((episode) => episode.mal_id === ep);
  }, [episodes, ep]);

  useEffect(() => {
    if (!ep && episodes.length > 0) {
      updateEpisode(episodes[0].mal_id);
    }
  }, [episodes]);

  const updateEpisode = (episodeId) => {
    setSearchParams({ ep: episodeId.toString() });
  };

  const currentIndex = episodes.findIndex(
    (episode) => episode.mal_id === currentEp?.mal_id,
  );

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < episodes.length - 1;

  const changeEpisode = (direction) => {
    if (direction === "next" && hasNext) {
      updateEpisode(episodes[currentIndex + 1].mal_id);
    }

    if (direction === "prev" && hasPrev) {
      updateEpisode(episodes[currentIndex - 1].mal_id);
    }
  };

  if (isError) return <PageNotFound />;

  if (isLoading) {
    return <Loader className="h-screen" />;
  }

  return (
    <div className="min-h-screen bg-backGround text-white">
      <Helmet>
        <title>Watch Anime - Watanuki</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link to="/home" className="hover:text-primary">
            Home
          </Link>

          <span>/</span>

          <Link to={`/anime/${id}`} className="hover:text-primary capitalize">
            {id.replaceAll("-", " ")}
          </Link>

          <span>/</span>

          <span className="text-primary">Episode {currentEp?.mal_id}</span>
        </div>

        {/* Player */}
        {currentEp && (
          <Player
            id={id}
            currentEp={currentEp}
            changeEpisode={changeEpisode}
            hasNextEp={hasNext}
            hasPrevEp={hasPrev}
          />
        )}

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Episodes</h2>

          <div className="flex bg-lightbg rounded-lg overflow-hidden">
            <button
              onClick={() => setLayout("list")}
              className={`p-2 ${
                layout === "list" ? "bg-primary text-black" : "text-white"
              }`}
            >
              <MdViewList size={20} />
            </button>

            <button
              onClick={() => setLayout("grid")}
              className={`p-2 ${
                layout === "grid" ? "bg-primary text-black" : "text-white"
              }`}
            >
              <MdGridView size={20} />
            </button>
          </div>
        </div>

        {/* Episodes */}
        <div
          className={`grid gap-3 ${
            layout === "list"
              ? "grid-cols-1"
              : "grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10"
          }`}
        >
          {episodes.map((episode) => (
            <EpisodeCard
              key={episode.mal_id}
              animeId={id}
              episode={episode}
              currentEp={currentEp}
              layout={layout}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 pt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 rounded bg-lightbg disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-gray-400">Page {page}</span>

          <button
            disabled={!pagination?.last_visible_page}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 rounded bg-primary text-black disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Watch;
