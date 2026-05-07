/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useApi } from "../services/useApi";
import Loader from "../components/Loader";
import PageNotFound from "./PageNotFound";
import Image from "../components/Image";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import Pagination from "../components/Pagination";

const Explore = () => {
  const validQueryType = [
    "tv",
    "movie",
    "ova",
    "special",
    "ona",
    "music",
    "cm",
    "pv",
    "tv_special",
  ];
  const validQueryFilter = ["airing", "upcoming", "bypopularity", "favorite"];

  const [searchParams] = useSearchParams();
  const { query } = useParams();
  const page = searchParams.get("page") || 1;

  const isType = validQueryType.includes(query);
  const isFilter = validQueryFilter.includes(query);

  if (!isType && !isFilter) {
    return <PageNotFound />;
  }

  const navigate = useNavigate();
  const onChangePage = (page) => {
    navigate(`/${query}?page=${page}`);
  };
  const path = "/top/anime";
  const endpoint = isType
    ? `${path}?type=${query}&page=${page}`
    : `${path}?filter=${query}&page=${page}`;
  const { data, isError, error, isLoading } = useApi(endpoint);

  if (isError) {
    return <PageNotFound />;
  }

  return (
    <div className="list-page pt-14">
      <Helmet>
        <title>{query} anime</title>
        <meta property="og:title" content="explore - watanuki" />
      </Helmet>

      <Heading>{query} Anime</Heading>
      {data && (
        <>
          <div className="flex flex-wrap justify-around items-center">
            {data?.data.map((item, index) => (
              <div key={item.mal_id + index} className="flw-item">
                <Image data={item} />
              </div>
            ))}
          </div>
          <Pagination
            currentPage={data?.pagination.current_page}
            totalPages={data?.pagination?.last_visible_page}
            onChange={onChangePage}
          />
        </>
      )}
    </div>
  );
};

export default Explore;
