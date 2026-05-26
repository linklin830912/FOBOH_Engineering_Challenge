export async function getProducts(filters: {
  name?: string;
  sku?: string;
  category?: string;
  segment?: string;
  brand?: string;
}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  const res = await fetch(
    `http://localhost:3001/api/products?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data.value;
}