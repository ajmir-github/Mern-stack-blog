// ------------------------------
// LOCAL COOKIE FUNCTIONS
// ------------------------------
export const cookieName = "auth";

export function removeCookie() {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function setCookie(cvalue, exdays = 45) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie() {
  let name = cookieName + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


export function hasCookie() {
  return getCookie() !== "";
}

