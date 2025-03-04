import { JumpToTopBtn } from "@/components/JumpToTopBtn";
import { MoviesContainer } from "./MoviesContainer";
import { SearchForm } from "@/components/SearchForm";
import { RefreshableTitle } from "@/components/RefreshableTitle";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  return (
    <div className="bg-[#141414] text-white">
      <div className="container mx-auto px-4 py-6  flex flex-col">
        <div className="w-full max-w-6xl mx-auto mb-8">
          <div className="text-center mb-6">
            <RefreshableTitle />
            <p className="text-gray-400 text-lg">AI-Powered Movie Discovery</p>
          </div>

          <SearchForm searchParams={searchParams} />
        </div>

        <MoviesContainer />
      </div>

      <JumpToTopBtn />
    </div>
  );
}
