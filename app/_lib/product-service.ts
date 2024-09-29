/**
 * Base URL for the product API.
 */

import { IProduct } from "../_interfaces/IProduct";
import { getSupabaseClient } from "./supabase/client";

/**
 * Retrieves all products from the database.
 * @returns A promise that resolves to an array of products.
 * @throws If there is an error fetching the products.
 */
const supabase = getSupabaseClient();
export async function getProducts(
  page: number = 1,
  limit: number = 20,
): Promise<IProduct[]> {
  const from = (page - 1) * limit;
  const to = page * limit - 1;
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true })
      .range(from, to)
      .eq("is_active", true);

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error fetching all products:", error.message);
    throw error;
  }
}

/**
 * Options for filtering products.
 */
interface FilterOptions {
  priceRange?: [number, number]; // [min, max]
  brands?: string[];
  query?: string;
  category?: string;
  page?: number;
}

const brandChannel = new BroadcastChannel("brandChannel");

/**
 * Retrieves filtered products based on the provided filter options.
 * @param filterOptions - The filter options to apply.
 * @returns A promise that resolves to an array of filtered products.
 * @throws If there is an error fetching the filtered products.
 */
export async function fetchFilteredProducts(
  filterOptions: FilterOptions = {},
): Promise<{ data: IProduct[]; dataLength: number; brandList: Set<string> }> {
  const { priceRange, brands, query, category, page = 1 } = filterOptions;

  let supabaseQuery = supabase
    .from("products")
    .select("*")
    .eq("is_active", true);

  if (priceRange) {
    supabaseQuery = supabaseQuery
      .gte("price", priceRange[0])
      .lte("price", priceRange[1]);
  }

  if (brands && brands.length > 0) {
    supabaseQuery = supabaseQuery.in("brand", brands);
  }

  if (category) {
    supabaseQuery = supabaseQuery.eq("category", category);
  }

  if (query && query.trim() !== "") {
    supabaseQuery = supabaseQuery.or(
      `title.ilike.%${query}%,description.ilike.%${query}%`,
    );
  }

  const { data, error } = await supabaseQuery;

  const brandList = new Set<string>(
    data!.map((product: IProduct) => product.brand),
  );
  if (!brands?.length) {
    brandChannel.postMessage({
      type: "UPDATE",
      brandList: Array.from(brandList),
    });
  }

  const length = data!.length;

  const sliced = data?.slice(page * 12 - 12, page * 12);

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return { data: sliced as IProduct[], dataLength: length, brandList };
}

/**
 * Retrieves a product by its ID.
 * @param id - The ID of the product to retrieve.
 * @returns A promise that resolves to the product with the specified ID.
 * @throws If there is an error fetching the product.
 */
export async function getProductById(id: number): Promise<IProduct | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return data;
}

/**
 * Retrieves the list of categories.
 * @returns A promise that resolves to the list of categories.
 * @throws If there is an error fetching the categories.
 */
export async function getCategoryList(): Promise<
  {
    id: number;
    name: string;
    description: string;
    slug: string;
  }[]
> {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("id,name,description,slug")
      .order("id", { ascending: true });
    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching categories");
  }
}

/**
 * Retrieves products by brands.
 * @param brands - The brands to filter by.
 * @returns A promise that resolves to an array of products matching the specified brands.
 * @throws If there is an error fetching the products.
 */
export async function getProductsByBrands(
  brands: string[],
): Promise<IProduct[]> {
  if (!Array.isArray(brands)) {
    throw new Error("brands must be an array");
  }

  if (brands.length === 0) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .in("brand", brands);

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching products by brands:", error.message);
    throw error;
  }
}

/**
 * Retrieves products by category.
 * @param category - The category to filter by.
 * @returns A promise that resolves to an array of products matching the specified category.
 * @throws If there is an error fetching the products.
 */
export async function getProductsByCategory(category: string): Promise<any> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching products by category");
  }
}

/**
 * Retrieves recommended products by category.
 * @param category - The category to filter by.
 * @returns A promise that resolves to an array of recommended products.
 * @throws If there is an error fetching the recommended products.
 */
export async function getRecommendedByCategory(
  category: string,
): Promise<IProduct[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .limit(4);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching recommended products by category");
  }
}
