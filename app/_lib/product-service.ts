/**
 * Base URL for the product API.
 */
const BASE_URL = "https://dummyjson.com/products";

import { notFound } from "next/navigation";
import { supabase } from "./supabase";
import { IProduct } from "../_interfaces/IProduct";

/**
 * Retrieves all products from the database.
 * @returns A promise that resolves to an array of products.
 * @throws If there is an error fetching the products.
 */
export async function getProducts(): Promise<IProduct[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .limit(36);

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
}

/**
 * Retrieves filtered products based on the provided filter options.
 * @param filterOptions - The filter options to apply.
 * @returns A promise that resolves to an array of filtered products.
 * @throws If there is an error fetching the filtered products.
 */
export async function fetchFilteredProducts(
  filterOptions: FilterOptions = {},
): Promise<IProduct[]> {
  const { priceRange, brands, query, category } = filterOptions;

  console.log(filterOptions);

  let supabaseQuery = supabase.from("products").select("*");

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

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return data as IProduct[];
}

/**
 * Retrieves a product by its ID.
 * @param id - The ID of the product to retrieve.
 * @returns A promise that resolves to the product with the specified ID.
 * @throws If there is an error fetching the product.
 */
export async function getProductById(id: number): Promise<IProduct> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error(`Error fetching product with ID ${id}:`, error.message);
    throw error;
  }
}

/**
 * Retrieves the list of categories.
 * @returns A promise that resolves to the list of categories.
 * @throws If there is an error fetching the categories.
 */
export async function getCategoryList(): Promise<any> {
  try {
    const req = await fetch(`${BASE_URL}/categories`);
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    notFound();
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
    const req = await fetch(`${BASE_URL}/category/${category}`);
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    notFound();
  }
}

/**
 * Retrieves the name of a category.
 * @param cat - The category slug.
 * @returns A promise that resolves to the name of the category.
 */
export async function getCategoryName(cat: string): Promise<string> {
  const allCategories = await getCategoryList();
  const name = await allCategories.find((el) => el.slug === cat);
  return name.name;
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
    const req = await fetch(`${BASE_URL}/category/${category}?limit=40`);
    const data = await req.json();
    return data.products;
  } catch (error) {
    console.log(error);
    notFound();
  }
}
