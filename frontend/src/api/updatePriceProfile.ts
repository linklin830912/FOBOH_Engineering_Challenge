import { UpdateProductPriceRequest } from "../type/Api";
import { PricingProfile } from "../type/Pricing";

const API_URL = import.meta.env.VITE_API_URL;

export async function updatePriceProfile(
  payload: UpdateProductPriceRequest
): Promise<PricingProfile[]> {
  const response = await fetch(`${API_URL}/api/pricing-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to update pricing profile");
  }
  console.log("Updated pricing profile, new list:", data.debug);
  return data.value;
}