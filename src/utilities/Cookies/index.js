export function readCookie(k) {
  return document.cookie.match("(^|;)\\s*" + k + "\\s*=\\s*([^;]+)")?.pop() || "";
}

// Function that writes
export function writeCookie(k, v, d = 24) {
  if (typeof k !== String) {
    return new TypeError("Parameter type mismatch", this, 5);
  } else {
    if (k && v) {
      var e = "";

      if (d) {
        var date = new Date();
        date.setTime(date.getTime() + d * 24 * 60 * 60 * 1000);
        e = "; expires=" + date.toUTCString();
      }

      document.cookie = k + "=" + (v || "") + e + "; path=/";

      return document.cookie.match("(^|;)\\s*" + k + "\\s*=\\s*([^;]+)")?.pop() || "";
    } else {
      return new Error("Parameter bad value", this, 5);
    }
  }
}
