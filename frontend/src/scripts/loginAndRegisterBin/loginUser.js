import { loginEmailInput, loginPasswordInput } from '../selectors.js';
import { displayLoginErrors } from './loginErrors/displayLoginErrors.js';
import { resetLoginInputErrors } from './loginErrors/resetLoginInputErrors.js';
import { mainURL } from '../common.js';
export async function loginUser() {
  resetLoginInputErrors();
  try {
    //get the info needed for the user loging
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    // The URL of the registration API endpoint
    const loginApiUrl = `${mainURL}/api/users/login`;

    // Create an object to represent the registration data
    const loginData = {
      email: email,
      password: password,
    };

    // Use fetch to send an HTTP POST request to the registration API
    const response = await fetch(loginApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        withCredentials: true,
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    // Check if the request was successful
    if (response.ok) {
      // set the jwt received from the server into a cookie called jwt
      document.cookie = `jwt=${data.jwt};path=/`;
      //send user to the home page
      window.location.href = '../src/home.html';
    } else {
      //if errors arrive from an error or a message, store them in error
      const error = data.error || data.message;
      throw new Error(error);
    }
  } catch (error) {
    // send the error so that the message will be dispalyed and the right field will be bordered in red
    displayLoginErrors(error.message);
  }
}
