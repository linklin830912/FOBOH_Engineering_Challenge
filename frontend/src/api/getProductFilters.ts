const API_URL = import.meta.env.VITE_API_URL;

export async function getProductFilters() {
  const res = await fetch(`${API_URL}/api/product-filters`);

  if (!res.ok) {
    throw new Error("Failed to fetch product filters");
  }

    const data = await res.json();
    console.log("Fetched product filters:", data.value);
  return data.value; // { categories, segments, brands }
}