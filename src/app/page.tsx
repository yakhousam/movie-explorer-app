import { JumpToTopBtn } from "@/components/JumpToTopBtn";
import { MoviesContainer } from "./MoviesContainer";
import { SearchForm } from "@/components/SearchForm";
import Link from "next/link";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  return (
    <div className="h-screen bg-[#141414] text-white">
      <div className="container mx-auto flex flex-col px-4 py-6">
        <div className="mx-auto mb-8 w-full max-w-6xl">
          <div className="mb-6 text-center">
            <Link href="/" className="inline-block w-fit">
              <h1 className="mb-2 cursor-pointer bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-5xl font-bold text-transparent drop-shadow-md md:text-6xl">
                CineMind
              </h1>
            </Link>
            <p className="text-lg text-gray-400">AI-Powered Movie Discovery</p>
          </div>

          <SearchForm searchParams={searchParams} />
        </div>

        <MoviesContainer />
      </div>

      <JumpToTopBtn />
    </div>
  );
}
