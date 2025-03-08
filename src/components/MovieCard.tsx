import { Movie } from "@/app/schemas";
import Image from "next/image";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/500x750/333333/FFFFFF/png?text=No+Image";

export const MovieCard = ({
  movie,
  priority = false,
}: {
  movie: Movie;
  priority?: boolean;
}) => {
  return (
    <a
      href={movie.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block transform cursor-pointer transition duration-200 ease-in hover:scale-105"
    >
      <div className="relative aspect-[2/3]">
        <Image
          src={movie.image || PLACEHOLDER_IMAGE}
          alt={movie.title}
          className="rounded object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          fill
          unoptimized
          priority={priority}
        />

        {/* Always visible info that hides on hover */}
        <div className="absolute bottom-0 w-full rounded-b bg-gradient-to-t from-black via-black/80 to-transparent px-3 pb-4 pt-8 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
          <h2 className="line-clamp-1 text-lg font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {movie.title}
          </h2>
          <p className="text-xs text-gray-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {movie.year} · Score: {movie.score.toFixed(2)}
          </p>
          <p className="line-clamp-1 text-xs text-gray-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {movie.genres.join(", ")}
          </p>
        </div>

        {/* Hover effect overlay with additional details */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute top-0 flex h-full w-full flex-col bg-gradient-to-b from-black/90 to-transparent p-4">
            <h2 className="text-lg font-bold text-white drop-shadow-lg">
              {movie.title}
            </h2>
            <p className="text-sm text-gray-100 drop-shadow-lg">
              {movie.year} · Score: {movie.score.toFixed(6)}
            </p>
            <p className="mb-2 text-xs text-gray-200 drop-shadow-lg">
              {movie.genres.join(", ")}
            </p>
            {movie.extract && (
              <div className="relative flex-1 overflow-hidden">
                <p className="absolute top-[20%] w-full text-sm text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] group-hover:animate-[scrollCredits_40s_linear_infinite]">
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
