import {
  registerEmailErrorSpan,
  registerEmailInput,
  registerUsernameErrorSpan,
  registerUsernameInput,
  registerPasswordInput,
  registerPasswordErrorSpan,
} from '../../selectors.js';
//checks if the message is about the username, email, or password and then adds a border and adds the error message to the correct span
export function displayRegisterErrors(message) {
  if (/\busername\b/i.test(message)) {
    registerUsernameInput.classList.add('border');
    registerUsernameErrorSpan.textContent = message;
  } else if (/\bemail\b/i.test(message)) {
    registerEmailInput.classList.add('border');
    registerEmailErrorSpan.textContent = message;
  } else if (/\bpassword\b/i.test(message)) {
    registerPasswordInput.classList.add('border');
    registerPasswordErrorSpan.textContent = message;
  }
}
