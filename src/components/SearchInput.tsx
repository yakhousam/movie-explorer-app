"use client";
import { ComponentProps, useState } from "react";
import { XButton } from "./XButton";

type SearchInputProps = {
  error?: { status: boolean; message?: string };
  handleClearError?: () => void;
} & ComponentProps<"input">;

export const SearchInput = ({
  name,
  value,
  error = { status: false },
  handleClearError = () => {},
  ...props
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
        <div className="absolute -top-8 left-0 z-10 flex items-center rounded bg-red-600 px-2 py-1 text-sm text-white">
          <span>{error.message || "Error"}</span>
          <XButton
            size="small"
            onClick={handleClearError}
            className="ml-2 text-white"
            aria-label="Close error message"
          />
        </div>
      )}
      <input
        type="text"
        name={name}
        value={inputValue}
        onChange={handleChange}
        placeholder="Search movies..."
        className="w-full rounded bg-[#333333] py-2 pl-4 pr-8 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        autoFocus
        {...props}
      />
      {inputValue && (
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center">
          <XButton
            onClick={handleClear}
            className="text-gray-400 hover:text-white"
            aria-label="Clear search"
          />
        </div>
      )}
    </div>
  );
};
