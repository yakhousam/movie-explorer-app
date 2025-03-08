"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchButton } from "./SearchButton";
import { SearchInput } from "./SearchInput";
import { CheckIcon } from "./icons/CheckIcon";
import { InfoTooltip } from "./InfoTooltip";

type SearchFormProp = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const SearchForm = ({ searchParams }: SearchFormProp) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ status: boolean; message?: string }>({
    status: false,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const query = formData.get("query") as string;
      const enhanceSearch = formData.get("enhance-search") === "on";
      if (!query || query.trim().length < 2) {
        setError({
          status: true,
          message: "Query should be at least 2 characters long.",
        });
        return;
      }

      const searchParams = new URLSearchParams();
      searchParams.set("query", query);
      if (enhanceSearch) {
        searchParams.set("enhance-search", "true");
      }

      router.push("?" + searchParams.toString());
    } catch {
      setError({ status: true, message: "query is too vague" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4">
      <div className="space-y-2">
        <div className="flex flex-wrap gap-4">
          <div className="min-w-[200px] flex-1">
            <SearchInput
              key={searchParams.query?.toString() || ""}
              name="query"
              value={searchParams.query}
              error={error}
              handleClearError={() => setError({ status: false, message: "" })}
            />
          </div>

          <SearchButton isLoading={isLoading} />
        </div>

        <div className="flex items-center gap-2 py-1">
          <div className="relative flex items-center">
            <input
              id="enhanceSearch"
              type="checkbox"
              className="peer h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-400 bg-transparent checked:border-red-600 checked:bg-red-600 hover:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-600/25"
              name="enhance-search"
              defaultChecked
            />
            <CheckIcon className="pointer-events-none absolute left-[2px] h-3 w-3 text-white opacity-0 peer-checked:opacity-100" />
          </div>
          <div className="relative">
            <label
              htmlFor="enhanceSearch"
              className="flex cursor-pointer items-center text-xs text-gray-300 transition-colors hover:text-gray-100"
            >
              <span className="flex-shrink-0">Enhance search query</span>
              <InfoTooltip content="Uses AI to improve search results by understanding context and finding related content" />
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};
