/**
 * Utility module that allows the creation of a hash string from the passed argument
 * @author Christoffer Hansen
 *
 * @param  {Any} args Any variable type that the created hash String will represent
 * @return {String} Returns the hash String that represents the passed argument
 */
export default async function Hash(args) {
  if (typeof args === "object") {
    args = Object.keys(args)
      .sort()
      .reduce((obj, key) => {
        obj[key] = args[key];
        return obj;
      }, {});
  }

  const encodeParam = new TextEncoder().encode(JSON.stringify(args));
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodeParam);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hashHex;
}
