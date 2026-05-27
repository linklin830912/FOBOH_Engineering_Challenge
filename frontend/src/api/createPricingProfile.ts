import { PricingProfileRequest } from "../type/Api";

const API_URL = import.meta.env.VITE_API_URL;
export async function createPricingProfile(
  payload: PricingProfileRequest
) {
  const response = await fetch(`${API_URL}/pricing-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to create pricing profile");
  }
console.log("DEBUG", data.debug);
  return data.data;
}