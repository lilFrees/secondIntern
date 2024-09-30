import { notFound } from "next/navigation";
import SearchProducts from "../_features/search/components/SearchProducts";
import SearchSidebar from "../_features/search/components/SearchSidebar";

async function Page({ searchParams }) {
  if (!searchParams.query) {
    notFound();
  }

  return (
    <div className="py-5">
      <h1 className="mt-10 text-xl font-bold md:text-3xl">
        Search results for {searchParams.query}
      </h1>

      <div className="flex flex-col gap-5 py-10 md:flex-row md:gap-10">
        <SearchSidebar />
        <SearchProducts searchQuery={searchParams.query} />
      </div>
    </div>
  );
}

export default Page;
