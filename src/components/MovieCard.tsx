import { Movie } from "@/app/schemas";
import Image from "next/image";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/500x750/333333/FFFFFF/png?text=No+Image";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <a
      href={movie.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative transition duration-200 ease-in transform hover:scale-105 cursor-pointer block"
    >
      <div className="relative aspect-[2/3]">
        <Image
          src={movie.image || PLACEHOLDER_IMAGE}
          alt={movie.title}
          fill
          className="object-cover rounded"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-0 p-4 w-full h-full flex flex-col bg-gradient-to-b from-black/90 to-transparent">
            <h2 className="text-lg font-bold text-white drop-shadow-lg">
              {movie.title}
            </h2>
            <p className="text-sm text-gray-100 drop-shadow-lg">
              {movie.year} · Score: {movie.score.toFixed(6)}
            </p>
            <p className="text-xs text-gray-200 drop-shadow-lg mb-2">
              {movie.genres.join(", ")}
            </p>
            {movie.extract && (
              <div className="flex-1 overflow-hidden relative">
                <p className="text-sm text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] absolute w-full top-[20%] invisible group-hover:visible group-hover:animate-[scrollCredits_40s_linear_infinite]">
                  {movie.extract}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};
