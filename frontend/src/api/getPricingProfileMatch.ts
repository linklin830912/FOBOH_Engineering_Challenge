import { GetPricingProfileMatchRequest } from "../type/Api";

const API_URL = import.meta.env.VITE_API_URL;

export async function getPricingProfileMatch(
  query: GetPricingProfileMatchRequest
) {
  const params = new URLSearchParams();

  params.append("customerId", query.customerId);
  params.append("productId", query.productId);

  const response = await fetch(
    `${API_URL}/api/pricing-profile/match?${params.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch pricing profile match");
  }

  return data.value;
}