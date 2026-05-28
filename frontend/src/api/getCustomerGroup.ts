const API_URL = import.meta.env.VITE_API_URL;
export async function getCustomerGroup(name?: string, id?: string) {
    const params = new URLSearchParams();

      if (id) {
        params.append("id", id);
      }

      if (name) {
        params.append("name", name);
    }
    
      const response = await fetch(
        `${API_URL}/api/customergroup?${params.toString()}`
      );

    const data = await response.json();
    
    return data.value;
}