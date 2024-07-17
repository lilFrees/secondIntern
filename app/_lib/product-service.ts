const BASE_URL = "https://dummyjson.com/products";
import { notFound } from "next/navigation";

export async function getProducts() {
  try {
    const req = await fetch(`${BASE_URL}?limit=24`);
    const data = await req.json();
    return data.products;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export async function getProductById(id: number) {
  try {
    const req = await fetch(`${BASE_URL}/${id}`);
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoryList() {
  try {
    const req = await fetch(`${BASE_URL}/categories`);
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export async function getProductsByCategory(category: string) {
  try {
    const req = await fetch(`${BASE_URL}/category/${category}`);
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    return notFound();
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
    return data;
  } catch (error) {
    console.log(error);
    notFound();
  }
}
