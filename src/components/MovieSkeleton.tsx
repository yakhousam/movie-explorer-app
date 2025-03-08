export const MovieSkeleton = () => (
  <div className="relative aspect-[2/3] animate-pulse rounded bg-gray-800">
    <div className="absolute bottom-0 w-full space-y-2 p-4">
      <div className="h-4 w-3/4 rounded bg-gray-700"></div>
      <div className="h-3 w-1/4 rounded bg-gray-700"></div>
      <div className="h-3 w-2/4 rounded bg-gray-700"></div>
    </div>
  </div>
);
