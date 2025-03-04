"use client";
import { useRouter } from "next/navigation";

// Example searches to help users get started
const EXAMPLE_SEARCHES = [
  "Sci-fi movies with time travel",
  "Comedies with Jim Carrey",
  "Suspenseful thrillers from the 90s",
  "Movies about artificial intelligence",
  "Feel-good family movies",
  "Mind-bending psychological thrillers",
];

export const SearchExamples = () => {
  const router = useRouter();
  const handleClick = (example: string) => {
    router.push(`/?query=${example}`);
  };
  return (
    <div className="text-center space-y-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-medium text-gray-200 mb-3">
          Try these example searches:
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {EXAMPLE_SEARCHES.map((example, index) => (
            <button
              key={index}
              onClick={() => handleClick(example)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-md text-sm transition-colors duration-200 border border-gray-700 hover:border-red-600"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
