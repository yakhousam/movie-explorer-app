"use client";
import { useState } from "react";
import { POPULAR_GENRES } from "@/constants";

type GeneresProps = {
  genres: string[];
};

export const Generes = ({ genres }: GeneresProps) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>(genres);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };
  const clearGenres = () => {
    setSelectedGenres([]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {POPULAR_GENRES.map((genre) => (
        <label
          key={genre}
          className={`px-3 py-1 text-sm rounded-full transition-colors cursor-pointer ${
            selectedGenres.includes(genre)
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          <input
            type="checkbox"
            checked={selectedGenres.includes(genre)}
            onChange={() => toggleGenre(genre)}
            className="sr-only" // Hide default checkbox but keep it functional
            name={genre}
          />
          {genre}
        </label>
      ))}
      {selectedGenres.length > 0 && (
        <button
          type="button"
          onClick={clearGenres}
          className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-400 hover:text-white"
        >
          Clear
        </button>
      )}
    </div>
  );
};
