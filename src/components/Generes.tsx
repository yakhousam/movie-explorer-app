// Popular genres for quick filtering
const POPULAR_GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Thriller",
];

type GeneresProps = {
  selectedGenres: string[];
  toggleGenre: (genre: string) => void;
  clearGenres: () => void;
};

export const Generes = ({
  clearGenres,
  selectedGenres,
  toggleGenre,
}: GeneresProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {POPULAR_GENRES.map((genre) => (
        <button
          key={genre}
          type="button"
          onClick={() => toggleGenre(genre)}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            selectedGenres.includes(genre)
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {genre}
        </button>
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
