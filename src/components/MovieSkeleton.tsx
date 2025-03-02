"use client";
export const MovieSkeleton = () => (
  <div className="relative aspect-[2/3] bg-gray-800 rounded animate-pulse">
    <div className="absolute bottom-0 w-full p-4 space-y-2">
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="h-3 bg-gray-700 rounded w-1/4"></div>
      <div className="h-3 bg-gray-700 rounded w-2/4"></div>
    </div>
  </div>
);
