"use client";
import { useState, useEffect, useRef } from "react";
import { enhanceQuery, searchMovies } from "./actions";
import { Movie } from "./schemas";
import { useInfiniteQuery } from "@tanstack/react-query";
import useOnScreen from "../hooks/useOnScreen";
import { MovieSkeleton } from "@/components/MovieSkeleton";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { JumpToTopBtn } from "@/components/JumpToTopBtn";
import { SearchExamples } from "@/components/SearchExamples";
import { MovieCard } from "@/components/MovieCard";
import { SearchInput } from "@/components/SearchInput";
import { YearInput } from "@/components/YearInput";
import { Generes } from "@/components/Generes";

type QueryKey = {
  queryName: string;
  queryText: string;
  yearFrom: string;
  yearTo: string;
  genres: string[];
};

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [yearFrom, setYearFrom] = useState<string>("");
  const [yearTo, setYearTo] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [useEnhancedSearch, setUseEnhancedSearch] = useState(false);
  const [queryKey, setQueryKey] = useState<QueryKey>({
    queryName: "searchMovies",
    queryText: "",
    yearFrom: "",
    yearTo: "",
    genres: [],
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: Object.values(queryKey),
    queryFn: ({ pageParam = 0 }) =>
      searchMovies({
        queryText: query,
        yearFrom: parseInt(yearFrom),
        yearTo: parseInt(yearTo),
        genres: selectedGenres,
        page: pageParam,
        limit: 20,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.total > pages.length * 20 ? pages.length : undefined,
    enabled: queryKey.queryText.length > 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const targetRef = useRef<HTMLDivElement>(null);

  const { isIntersecting } = useOnScreen(targetRef, {
    rootMargin: "200px",
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, isIntersecting]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.length === 0) return;
    let queryToUse = query;
    if (useEnhancedSearch && query !== queryKey.queryText) {
      queryToUse = await enhanceQuery(query);
      setQuery(queryToUse);
    }
    setQueryKey((prev) => ({
      ...prev,
      queryText: queryToUse,
      yearFrom: yearFrom,
      yearTo: yearTo,
      genres: selectedGenres,
    }));
  }

  const handleExampleSearch = (example: string) => {
    setQuery(example);
    setQueryKey((prev) => ({
      ...prev,
      queryText: example,
    }));
  };

  // Toggle genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // Clear input handlers
  const clearQuery = () => setQuery("");
  const clearYearFrom = () => setYearFrom("");
  const clearYearTo = () => setYearTo("");

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <div className="container mx-auto px-4 py-6 min-h-screen flex flex-col">
        <div className="w-full max-w-6xl mx-auto mb-8">
          <div className="text-center mb-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent drop-shadow-md">
              CineMind
            </h1>
            <p className="text-gray-400 text-lg">AI-Powered Movie Discovery</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mb-4">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <SearchInput
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onClear={clearQuery}
                  />
                </div>
                <div className="w-32">
                  <YearInput
                    onClear={clearYearFrom}
                    value={yearFrom}
                    onChange={(e) => setYearFrom(e.target.value)}
                  />
                </div>
                <div className="w-32">
                  <YearInput
                    onClear={clearYearTo}
                    value={yearTo}
                    onChange={(e) => setYearTo(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-600 px-8 py-2 rounded hover:bg-red-700 transition"
                >
                  Search
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  id="enhancedSearch"
                  checked={useEnhancedSearch}
                  onChange={(e) => setUseEnhancedSearch(e.target.checked)}
                  className="rounded border-gray-400 text-red-600 focus:ring-red-600"
                />
                <label htmlFor="enhancedSearch">
                  Use AI-enhanced search (improves search accuracy)
                </label>
              </div>

              <div className="mt-3">
                <p className="text-sm text-gray-300 mb-2">Filter by genre:</p>
                <Generes
                  toggleGenre={toggleGenre}
                  selectedGenres={selectedGenres}
                  clearGenres={() => setSelectedGenres([])}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="max-w-6xl mx-auto w-full flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {isFetching && !isFetchingNextPage
              ? Array(20)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index}>
                      <MovieSkeleton />
                    </div>
                  ))
              : data?.pages?.map(({ movies }) =>
                  movies.map((movie: Movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                  ))
                )}
            {(isFetchingNextPage || hasNextPage) && (
              <div
                ref={targetRef}
                className="col-span-full flex justify-center py-4"
              >
                <LoadingIndicator />
              </div>
            )}
          </div>
          {!isFetching && !data && !error && (
            <div className="mt-8">
              <SearchExamples handleClick={handleExampleSearch} />
            </div>
          )}
          {error && (
            <div className="text-center mt-8 space-y-4">
              <p className="text-red-600">
                An error occurred while fetching movies.
              </p>
              <button
                onClick={() => refetch()}
                className="bg-red-600 px-6 py-2 rounded hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      <JumpToTopBtn />
    </div>
  );
}
