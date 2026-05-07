import { Link } from "react-router-dom";

const EpisodeCard = ({ animeId, episode, currentEp, layout }) => {
  const isActive = currentEp?.mal_id === episode.mal_id;

  return (
    <Link
      to={`/watch/${animeId}?ep=${episode.mal_id}`}
      className={`
        rounded-xl transition-all duration-200
        ${
          isActive
            ? "bg-primary text-black"
            : episode.filler
              ? "bg-red-500/20 border border-red-500"
              : "bg-lightbg hover:bg-btnbg"
        }
      `}
    >
      {layout === "list" ? (
        <div className="p-4 flex items-center gap-4">
          <span className="font-bold min-w-[40px]">{episode.mal_id}</span>

          <p className="truncate flex-1">{episode.title}</p>

          {episode.filler && <span>👻</span>}
        </div>
      ) : (
        <div className="p-3 text-center">
          <p className="font-semibold">{episode.mal_id}</p>
        </div>
      )}
    </Link>
  );
};

export default EpisodeCard;
