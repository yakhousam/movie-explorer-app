"use client";
import { enhanceQuery } from "@/app/actions";
import { POPULAR_GENRES } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Generes } from "./Generes";
import { SearchButton } from "./SearchButton";
import { SearchInput } from "./SearchInput";
import { YearInput } from "./YearInput";

type SearchFormProp = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const SearchForm = ({ searchParams }: SearchFormProp) => {
  const router = useRouter();
  const [useEnhancedSearch, setUseEnhancedSearch] = useState(false);
  const [endhancedText, setEnhancedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ status: boolean; message?: string }>({
    status: false,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const query = formData.get("query") as string;
      if (!query || query.trim().length < 2) {
        setError({
          status: true,
          message: "Query should be at least 2 characters long.",
        });
        return;
      }
      const genres: string[] = [];
      const data = Object.fromEntries(formData.entries());

      const searchParams = new URLSearchParams();

      for (const [name, value] of Object.entries(data)) {
        if (POPULAR_GENRES.includes(name as string)) {
          genres.push(name as string);
        } else if (
          name === "query" &&
          useEnhancedSearch &&
          query !== endhancedText
        ) {
          setIsLoading(true);
          const enhanced = await enhanceQuery(value as string);
          searchParams.set(name, enhanced);
          setEnhancedText(enhanced);
          setIsLoading(false);
        } else if (value) {
          searchParams.set(name, value as string);
        }
      }
      if (genres.length > 0) {
        searchParams.set("genre", genres.join(","));
      }

      router.push("?" + searchParams.toString());
    } catch {
      setError({ status: true, message: "query is too vague" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div className="space-y-2">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <SearchInput
              key={searchParams.query?.toString() || ""}
              name="query"
              value={searchParams.query}
              error={error}
              handleClearError={() => setError({ status: false, message: "" })}
            />
          </div>
          <div className="w-32">
            <YearInput name="yearFrom" value={searchParams.yearFrom} />
          </div>
          <div className="w-32">
            <YearInput
              name="yearTo"
              value={searchParams.yearTo}
              placeholder="Year To"
            />
          </div>
          <SearchButton isLoading={isLoading} />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            id="enhancedSearch"
            className="rounded border-gray-400 text-red-600 focus:ring-red-600"
            checked={useEnhancedSearch}
            onChange={(e) => setUseEnhancedSearch(e.target.checked)}
          />
          <label htmlFor="enhancedSearch">
            Use AI-enhanced search (improves search accuracy)
          </label>
        </div>

        <div className="mt-3">
          <p className="text-sm text-gray-300 mb-2">Filter by genre:</p>
          <Generes genres={(searchParams.genre || []) as string[]} />
        </div>
      </div>
    </form>
  );
};
