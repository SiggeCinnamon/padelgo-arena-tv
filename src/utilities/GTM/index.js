export default function sendEventToGTM(name, data) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: name,
      data: data
    });
  }
}
