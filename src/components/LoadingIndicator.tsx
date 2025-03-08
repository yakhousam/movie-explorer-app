type Size = "sm" | "md" | "lg";

type LoadingIndicatorProps = {
  size?: Size;
  color?: string; // Tailwind color class like 'border-red-600'
  className?: string; // Additional classes for further customization
};

export const LoadingIndicator = ({
  size = "md",
  color = "border-red-600",
  className = "",
}: LoadingIndicatorProps) => {
  // Size mapping
  const sizeClasses: Record<Size, string> = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`animate-spin rounded-full border-b-2 ${color} ${sizeClasses[size]} ${className}`}
    ></div>
  );
};
