import Link from "next/link";
import { FilmIcon } from "./icons/FilmIcon";

// Example searches to help users get started - improved with more specific queries
const EXAMPLE_SEARCHES = [
  "Sci-fi movies with time travel",
  "Award-winning comedies with Jim Carrey",
  "Cult classic thrillers from the 90s",
  "Dystopian movies about artificial intelligence",
  "Animated family adventures with high ratings",
];

export const SearchExamples = () => {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto max-w-2xl">
        {/* Film icon SVG */}
        <div className="mb-4 flex justify-center">
          <FilmIcon />
        </div>

        <h2 className="mb-2 text-2xl font-semibold text-gray-100">
          Discover Your Next Favorite Film
        </h2>
        <p className="mb-5 text-gray-400">
          Need inspiration? Try one of these curated searches:
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {EXAMPLE_SEARCHES.map((example, index) => (
            <Link
              key={index}
              href={`?query=${encodeURIComponent(example)}`}
              className="rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-200 transition-colors duration-200 hover:border-red-600 hover:bg-gray-700"
            >
              {example}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
