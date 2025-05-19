const BASE_URL = "https://restcountries.com/v3.1";

export async function fetchAllCountries() {
  const response = await fetch(`${BASE_URL}/all`);
  if (!response.ok) throw new Error("Failed to fetch all countries");
  return await response.json();
}

export async function fetchCountryByName(name) {
  const response = await fetch(`${BASE_URL}/name/${name}`);
  if (!response.ok) throw new Error("Failed to fetch country by name");
  return await response.json();
}
