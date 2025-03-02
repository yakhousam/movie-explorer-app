import React from "react";

type YearInputProps = {
  onClear: () => void;
} & React.ComponentProps<"input">;

export const YearInput = ({ value, onClear, ...delegated }: YearInputProps) => {
  return (
    <div className="relative">
      {value && (
        <button
          type="button"
          onClick={onClear}
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
        value={value}
        min={1995}
        className={`w-full bg-[#333333] px-4 py-2 rounded text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 ${
          value ? "pl-10" : ""
        }`}
        {...delegated}
      />
    </div>
  );
};
