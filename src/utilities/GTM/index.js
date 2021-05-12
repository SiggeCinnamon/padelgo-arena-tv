export default function sendEventToGTM(name, data) {
  if (typeof window !== "undefined") {
    if (process.env.REACT_APP_GTM_ACTIVE) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: name,
        data: data
      });
    }
  }
}
