import { registerUsernameInput, registerEmailInput, registerPasswordInput } from '../selectors.js';
import { resetRegisterInputErrors } from './registerErrors/resetRegisterInputErrors.js';
import { displayRegisterErrors } from './registerErrors/displayRegisterErrors.js';
import { mainURL } from '../common.js';
export async function registerUser() {
  //reset the red borders and the error span text
  resetRegisterInputErrors();
  try {
    //get the info needed for the user registration
    const username = registerUsernameInput.value;
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;

    // The URL of the registration API endpoint
    const registrationApiUrl = `${mainURL}/api/users/register`;

    // Create an object to represent the registration data
    const registrationData = {
      username: username,
      email: email,
      password: password,
    };

    // Use fetch to send an HTTP POST request to the registration API
    const response = await fetch(registrationApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        withCredentials: true,
      },
      body: JSON.stringify(registrationData),
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
    displayRegisterErrors(error.message);
  }
}
