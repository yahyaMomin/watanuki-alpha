/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import AudioInfo from "./AudioInfo";

const Image = ({ data }) => {
  return (
    <div>
      <Link to={`/anime/${data.mal_id}`}>
        <div className="film-poster md:hover:opacity-[.7] transition-all rounded-sm w-full h-full pb-[140%] mb-2 relative overflow-hidden bg-[#545454] block">
          <LazyLoadImage
            className="absolute h-full w-full inset-0 object-cover object-center"
            wrapperClassName="h-full w-full absolute"
            effect="blur"
            src={data.images.webp.image_url}
            alt={data.title_english}
          />
        </div>
      </Link>
      <Link to={`/anime/${data.mal_id}`}>
        <div
          title={data.title_english ?? data.title}
          className="title line-clamp-1 text-sm md:text-base hover:text-primary"
        >
          <h1>{data.title_english ?? data.title}</h1>
        </div>
      </Link>
      {data.type && (
        <div className="type flex gray gap-1 items-center text-sm">
          <AudioInfo data={data} />
          <div className="h-1 w-1 bg-primary rounded-full"></div>
          <h4>{data.duration}</h4>
        </div>
      )}
    </div>
  );
};

export default Image;
