import CategoriesList from "../_features/categories/components/CategoriesList";

function Page() {
  return (
    <div className="space-y-10 py-10">
      <h1 className="text-3xl font-bold">Best categories to shop from</h1>
      <CategoriesList />
    </div>
  );
}

export default Page;
