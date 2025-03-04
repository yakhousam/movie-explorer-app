"use client";
import { ComponentProps, useState } from "react";

type SearchInputProps = {
  error?: { status: boolean; message?: string };
  handleClearError?: () => void;
} & ComponentProps<"input">;

export const SearchInput = ({
  name,
  value,
  error = { status: false },
  handleClearError = () => {},
  ...delegated
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleClear = () => {
    setInputValue("");
    handleClearError();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    handleClearError();
  };

  return (
    <div className="relative">
      {error.status && (
        <div className="absolute -top-8 left-0  bg-red-600 text-white text-sm py-1 px-2 rounded z-10">
          {error.message || "Error"}
        </div>
      )}
      <input
        type="text"
        name={name}
        value={inputValue}
        onChange={handleChange}
        placeholder="Search movies..."
        className="w-full bg-[#333333] pl-4 pr-8 py-2 rounded text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        {...delegated}
      />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
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
