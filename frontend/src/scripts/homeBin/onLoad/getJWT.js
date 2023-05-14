export function getJWT() {
  const cookies = document.cookie.split('; ');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] === 'jwt') {
      return cookie[1];
    }
  }
  return false;
}
