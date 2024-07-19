import {
  getCategoryName,
  getProductsByCategory,
} from "@/app/_lib/product-service";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import descriptions from "@/app/_data/categoryDescriptions.json";
import { Metadata } from "next";
import SearchSidebar from "@/app/_components/SearchResults/SearchSidebar";
import SearchProducts from "@/app/_components/SearchResults/SearchProducts";

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
  const productsByCatalog = await getProductsByCategory(category);
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

      <div className="flex gap-10 py-10">
        <SearchSidebar />
        <SearchProducts />
      </div>
    </div>
  );
}

export default Page;
