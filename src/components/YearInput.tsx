"use client";
import { useState } from "react";

type YearInputProps = React.ComponentProps<"input">;

export const YearInput = ({ name, value, ...delegated }: YearInputProps) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleClear = () => {
    setInputValue("");
  };
  return (
    <div className="relative">
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none z-10"
          aria-label="Clear year from"
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
      <input
        type="number"
        placeholder="Year from"
        name={name}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        min={1995}
        className={`w-full bg-[#333333] px-4 py-2 rounded text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 ${
          inputValue ? "pl-10" : ""
        }`}
        {...delegated}
      />
    </div>
  );
};
