import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useMatchQueryParams = (queryParams: Record<string, string>) => {
  const [match, setMatch] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const entries = searchParams.entries();
    for (const [key, value] of entries) {
      if (queryParams[key] !== value) {
        setMatch(false);
        return;
      }
    }
    setMatch(true);
  }, [searchParams, queryParams]);

  return match;
};
