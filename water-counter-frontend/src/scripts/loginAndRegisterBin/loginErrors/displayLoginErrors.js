import {
  loginEmailErrorSpan,
  loginEmailInput,
  loginPasswordInput,
  loginPasswordErrorSpan,
} from '../../selectors.js';

//checks if the message is about the email, or password and then adds a border and adds the error message to the correct span
export function displayLoginErrors(message) {
  if (/\bemail\b/i.test(message)) {
    loginEmailInput.classList.add('border-2');
    loginEmailErrorSpan.textContent = message;
  } else if (/\bpassword\b/i.test(message)) {
    loginPasswordInput.classList.add('border-2');
    loginPasswordErrorSpan.textContent = message;
  }
}
