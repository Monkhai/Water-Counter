export function logout() {
  document.cookie = 'jwt' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.location.href = '../src/loginAndRegister.html';
}
