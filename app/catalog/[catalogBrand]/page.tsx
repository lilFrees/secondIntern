import { getCategoryList } from "@/app/_features/product/services/product-service";
import SearchProducts from "@/app/_features/search/components/SearchProducts";
import SearchSidebar from "@/app/_features/search/components/SearchSidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }): Promise<Metadata> {
  const category = params.catalogBrand;

  const fetchedCategory = await getCategoryList().then((categories) =>
    categories.find((c) => c.slug === category),
  );

  if (!fetchedCategory) {
    notFound();
  }

  const { name, description } = fetchedCategory;

  return {
    title: `${name} - Green Haven Store`,
    description: description || `Explore our ${name} collection`,
  };
}

async function Page({ params }) {
  const category = params.catalogBrand;
  const categoryList = await getCategoryList();

  const fetchedCategory = categoryList.find((c) => c.slug === category);

  if (!fetchedCategory) {
    notFound();
  }

  const { name, description } = fetchedCategory;

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
          <BreadcrumbLink href={`/catalog/${category}`}>{name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <h1 className="mt-10 text-3xl font-bold">{name}</h1>
      <p className="mt-5">{description}</p>

      <div className="flex flex-col gap-5 py-10 md:flex-row md:gap-10">
        <SearchSidebar />
        <SearchProducts category={fetchedCategory.slug} />
      </div>
    </div>
  );
}

export default Page;
