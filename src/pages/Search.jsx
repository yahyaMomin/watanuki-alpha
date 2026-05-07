/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApi } from "../services/useApi";
import Loader from "../components/Loader";
import PageNotFound from "./PageNotFound";
import Image from "../components/Image";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import Pagination from "../components/Pagination";

const Search = () => {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page") || 1;

  const navigate = useNavigate();

  const onChangePage = (page) => {
    navigate(`/search?keyword=${keyword}&page=${page}`);
  };

  const endpoint = `/anime?q=${keyword}&page=${page}`;

  const { data, isLoading, isError } = useApi(endpoint);

  if (isLoading) {
    return <Loader className="h-[100dvh]" />;
  }

  if (isError || !data) {
    return <PageNotFound />;
  }

  return (
    <div className="list-page pt-14">
      <Helmet>
        <title>search result of {keyword}</title>
        <meta property="og:title" content="search - watanuki" />
      </Helmet>

      <Heading>Search results of {keyword}</Heading>

      <div className="flex flex-wrap justify-around items-center">
        {data?.data.map((item, index) => (
          <div key={item.mal_id + index} className="flw-item">
            <Image data={item} />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={data?.pagination?.current_page}
        totalPages={data?.pagination?.last_visible_page}
        onChange={onChangePage}
      />

      <Footer />
    </div>
  );
};

export default Search;
