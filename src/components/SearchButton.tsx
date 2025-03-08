"use client";

import { LoadingIndicator } from "./LoadingIndicator";

type SearchButtonProps = {
  isLoading: boolean;
} & React.ComponentProps<"button">;

export const SearchButton = ({
  isLoading,
  ...delegated
}: SearchButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`relative flex min-h-[40px] min-w-[100px] items-center justify-center rounded bg-red-600 px-8 py-2 transition ${isLoading ? "opacity-80" : "hover:bg-red-700"}`}
      {...delegated}
    >
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingIndicator size="sm" color="white" />
        </div>
      )}
      <span className={isLoading ? "opacity-40" : ""}>Search</span>
    </button>
  );
};
