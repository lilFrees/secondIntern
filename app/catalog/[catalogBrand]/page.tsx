import SearchProducts from "@/app/_components/SearchResults/SearchProducts";
import SearchSidebar from "@/app/_components/SearchResults/SearchSidebar";
import descriptions from "@/app/_data/categoryDescriptions.json";
import { getCategoryName } from "@/app/_lib/product-service";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const category = params.catalogBrand;
  const categoryName = await getCategoryName(category);
  const description = descriptions.descriptions[category];

  return {
    title: `${categoryName} - Green Haven Store`,
    description: description || `Explore our ${categoryName} collection`,
  };
}

async function Page({ params }) {
  const category = params.catalogBrand;
  const categoryName = await getCategoryName(category);
  const description = descriptions.descriptions[category];

  return (
    <div className="py-5">
      <Breadcrumb separator="/">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/catalog">Catalog</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={`/catalog/${category}`}>
            {categoryName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <h1 className="mt-10 text-3xl font-bold">{categoryName}</h1>
      <p className="mt-5">{description}</p>

      <div className="flex flex-col gap-5 py-10 md:flex-row md:gap-10">
        <SearchSidebar />
        <SearchProducts category={category} />
      </div>
    </div>
  );
}

export default Page;
