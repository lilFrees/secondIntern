const BASE_URL = "https://dummyjson.com/products";
import { notFound } from "next/navigation";

export async function getProducts() {
  try {
    const req = await fetch(`${BASE_URL}?limit=20`);
    const data = await req.json();
    return data.products;
  } catch (error) {
    console.log(error);
    notFound();
  }
}

export async function getProductById(id: number) {
  try {
    const req = await fetch(`${BASE_URL}/${id}`);
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    notFound();
  }
}

export async function getCategoryList() {
  try {
    const req = await fetch(`${BASE_URL}/category-list`);
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    notFound();
  }
}
