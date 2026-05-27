export async function getCustomer(name?: string, id?: string) {
    const params = new URLSearchParams();

      if (id) {
        params.append("id", id);
      }

      if (name) {
        params.append("name", name);
      }
      console.log("Fetching customers with params:", params.toString());
      const response = await fetch(
        `http://localhost:3001/customer?${params.toString()}`
      );

        const data = await response.json();
        console.log("Fetched customers with filters", data.value);
    
    return data.value;
}