interface LoadingIndicatorProps {
  size?: "sm" | "md" | "lg"; // Predefined sizes
  color?: string; // Tailwind color class like 'red-600'
  className?: string; // Additional classes for further customization
}

export const LoadingIndicator = ({
  size = "md",
  color = "red-600",
  className = "",
}: LoadingIndicatorProps) => {
  // Size mapping
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`animate-spin rounded-full border-b-2 border-${color} ${sizeClasses[size]} ${className}`}
    ></div>
  );
};
