import { ComponentProps } from "react";

type SearchInputProps = {
  onClear: () => void;
} & ComponentProps<"input">;

export const SearchInput = ({
  value,
  onClear,
  ...delegated
}: SearchInputProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        name="query"
        value={value}
        placeholder="Search movies..."
        className="w-full bg-[#333333] px-4 py-2 rounded text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        {...delegated}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
