export default function sendEventToGTM(name, data) {
  if (typeof window !== "undefined" && process.env.REACT_APP_GTM_ACTIVE === true) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: name,
      data: data
    });
  }
}
