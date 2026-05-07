import { Link, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { useApi } from "../services/useApi";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import { FaArrowCircleRight } from "react-icons/fa";

const AnimeInfo = () => {
  const { id } = useParams();

  const { data, isError, error, isLoading } = useApi(`/anime/${id}`);

  if (isError) {
    return <PageNotFound />;
  }

  return (
    <main>
      <Helmet>
        <title>anime</title>
        <meta property="og:title" content="detail - watanuki" />
      </Helmet>
      {data && (
        <div className="AnimeInfo relative pt-10 px-6 max-w-7xl mx-auto text-white">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Poster */}
            <div className="col-span-1">
              <img
                src={data.data.images.webp.large_image_url}
                alt={data.data.title}
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>

            {/* Main Info */}
            <div className="col-span-2 space-y-4">
              <h1 className="text-4xl font-bold">{data.data.title}</h1>

              <p className="text-gray-400">{data.data.title_japanese}</p>

              <div className="flex flex-wrap gap-2">
                {data.data.genres.map((g) => (
                  <span
                    key={g.mal_id}
                    className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              <button className="bg-primary px-4 py-1 text-lg rounded-lg text-black ">
                <Link
                  to={`/watch/${data.data.mal_id}?ep=1`}
                  className="flex justify-center items-center gap-2"
                >
                  <span>Watch Now</span>
                  <FaArrowCircleRight />
                </Link>
              </button>
              <p className="text-sm text-gray-300 leading-relaxed">
                {data.data.synopsis}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
                <p>
                  <span className="text-gray-400">Score:</span>{" "}
                  {data.data.score}
                </p>
                <p>
                  <span className="text-gray-400">Rank:</span> #{data.data.rank}
                </p>
                <p>
                  <span className="text-gray-400">Status:</span>{" "}
                  {data.data.status}
                </p>
                <p>
                  <span className="text-gray-400">Episodes:</span>{" "}
                  {data.data.episodes ?? "?"}
                </p>
                <p>
                  <span className="text-gray-400">Duration:</span>{" "}
                  {data.data.duration}
                </p>
                <p>
                  <span className="text-gray-400">Aired:</span>{" "}
                  {data.data.aired.string}
                </p>
              </div>

              {/* Studios */}
              <div className="pt-4">
                <p className="text-gray-400 mb-1">Studio</p>
                <p>{data.data.studios.map((s) => s.name).join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
};

export default AnimeInfo;
