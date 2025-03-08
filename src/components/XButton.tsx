"use client";
import { ComponentProps } from "react";

type Size = "small" | "medium" | "large";

type XButtonProps = {
  size?: Size;
  className?: string;
} & Omit<ComponentProps<"button">, "className">;

export const XButton = ({
  size = "medium",
  className = "",
  ...props
}: XButtonProps) => {
  const sizeClasses: Record<Size, string> = {
    small: "h-3 w-3",
    medium: "h-4 w-4",
    large: "h-5 w-5",
  };

  return (
    <button
      type="button"
      className={`text-current hover:opacity-80 focus:outline-none ${className}`}
      aria-label="Close"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClasses[size]}
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
  );
};
