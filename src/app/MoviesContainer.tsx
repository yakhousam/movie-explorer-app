"use client";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { MovieCard } from "@/components/MovieCard";
import { MovieSkeleton } from "@/components/MovieSkeleton";
import { SearchExamples } from "@/components/SearchExamples";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import useOnScreen from "../hooks/useOnScreen";
import { searchMovies } from "./actions";
import { Movie } from "./schemas";

export const MoviesContainer = () => {
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const yearFrom = searchParams.get("yearFrom") || "";
  const yearTo = searchParams.get("yearTo") || "";
  const selectedGenres = searchParams.getAll("genre") || [];

  const queryKey = [
    "movies",
    decodeURIComponent(query),
    yearFrom,
    yearTo,
    ...selectedGenres,
  ];
  console.log("queryKey", queryKey);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey,
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
    enabled: query.length > 0,
    staleTime: Infinity,
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
  return (
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
            <div className="col-span-full flex justify-center py-4">
              <LoadingIndicator />
            </div>
          </div>
        )}
      </div>
      {!isFetching && !data && !error && (
        <div className="mt-8">
          <SearchExamples />
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
  );
};
