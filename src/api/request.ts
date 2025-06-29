export async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error;

  return await response.json();
}
