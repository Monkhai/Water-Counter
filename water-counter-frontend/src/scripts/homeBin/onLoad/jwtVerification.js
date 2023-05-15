import { getJWT } from './getJWT.js';
//makes sure that if the user does not have a jwt when they go in the the home page they are sent to register.
export function checkJWT() {
  const token = getJWT();
  if (!token) {
    window.location.href = '../src/loginAndRegister.html';
  }
}

// Function to retrieve a specific cookie by name
