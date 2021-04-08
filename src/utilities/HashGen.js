// ! NOT IN USE
// # HashGen creates a hashcode of the passed argument

export default async function Hash(args) {
  const encodeParam = new TextEncoder().encode(args);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodeParam);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}
