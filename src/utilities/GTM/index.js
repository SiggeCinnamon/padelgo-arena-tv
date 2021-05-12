export default function sendEventToGTM(name, data) {
  console.log("GTM:", process.env.REACT_APP_GTM_ACTIVE);
  if (typeof window !== "undefined" && process.env.REACT_APP_GTM_ACTIVE === true) {
    console.log("I AM IN BRUH!!!!!!?! WOOP WOOP");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: name,
      data: data
    });
  }
}
