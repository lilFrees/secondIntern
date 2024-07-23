const BASE_URL = "https://dummyjson.com/products";
import { notFound } from "next/navigation";
import { supabase } from "./supabase";
import { IProduct } from "../_interfaces/IProduct";

export async function getProducts() {
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

interface FilterOptions {
  priceRange?: [number, number]; // [min, max]
  brands?: string[];
  query?: string;
  category?: string;
}

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

export async function getProductById(id: number) {
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

export async function getCategoryList() {
  try {
    const req = await fetch(`${BASE_URL}/categories`);
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    notFound();
  }
}

export async function getProductsByBrands(brands) {
  // Ensure brands is an array
  if (!Array.isArray(brands)) {
    throw new Error("brands must be an array");
  }

  // If brands array is empty, return an empty array
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

export async function getProductsByCategory(category: string) {
  try {
    const req = await fetch(`${BASE_URL}/category/${category}`);
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    notFound();
  }
}

export async function getCategoryName(cat: string) {
  const allCategories = await getCategoryList();
  const name = await allCategories.find((el) => el.slug === cat);
  return name.name;
}

export async function getRecommendedByCategory(category: string) {
  try {
    const req = await fetch(`${BASE_URL}/category/${category}?limit=40`);
    const data = await req.json();
    return data.products;
  } catch (error) {
    console.log(error);
    notFound();
  }
}
