const API_URL = import.meta.env.VITE_API_URL;

export async function deletePricingProfile(id: string) {
  const response = await fetch(`${API_URL}/api/pricing-profile/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to delete pricing profile");
  }
  return data.value;
}