export async function getProductFilters() {
  const res = await fetch("http://localhost:3001/api/product/filters");

  if (!res.ok) {
    throw new Error("Failed to fetch product filters");
  }

    const data = await res.json();
    console.log("Fetched product filters:", data.value);
  return data.value; // { categories, segments, brands }
}