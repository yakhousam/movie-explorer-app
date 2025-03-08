"use client";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { MovieCard } from "@/components/MovieCard";
import { MovieSkeleton } from "@/components/MovieSkeleton";
import { SearchExamples } from "@/components/SearchExamples";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { searchMovies } from "./actions";
import { Movie } from "./schemas";

export const MoviesContainer = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const enhanceSearch = searchParams.get("enhance-search") === "true";

  const queryKey = ["movies", query, enhanceSearch];

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
        query,
        enhanceSearch,
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

  useEffect(() => {
    const currentTarget = targetRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isFetching && !isFetchingNextPage
          ? Array(10)
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <MovieSkeleton />
                </div>
              ))
          : data?.pages?.map(({ movies }, parentIdx) =>
              movies.map((movie: Movie, idx) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  priority={parentIdx === 0 && idx <= 10}
                />
              )),
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
          <SearchExamples />
        </div>
      )}
      {error && (
        <div className="mt-8 space-y-4 text-center">
          <p className="text-red-600">
            An error occurred while fetching movies.
          </p>
          <button
            onClick={() => refetch()}
            className="rounded bg-red-600 px-6 py-2 transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
