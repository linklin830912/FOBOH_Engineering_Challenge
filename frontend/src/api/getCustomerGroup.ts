const API_URL = import.meta.env.VITE_API_URL;export async function getCustomerGroup(name?: string, id?: string) {
    const params = new URLSearchParams();

      if (id) {
        params.append("id", id);
      }

      if (name) {
        params.append("name", name);
      }
      console.log("Fetching customer groups with params:", params.toString());
      const response = await fetch(
        `${API_URL}/api/customergroup?${params.toString()}`
      );

        const data = await response.json();
        console.log("Fetched customer groups with filters", data.value);
    
    return data.value; // { categories, segments, brands }
}