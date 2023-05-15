import {
  registerEmailErrorSpan,
  registerEmailInput,
  registerPasswordErrorSpan,
  registerPasswordInput,
  registerUsernameErrorSpan,
  registerUsernameInput,
} from '../../selectors.js';

//removes red borders and error text. Used when user has a mistake and then tries again and is wrong in they will see both errors.
export function resetRegisterInputErrors() {
  registerEmailInput.classList.remove('border');
  registerUsernameInput.classList.remove('border');
  registerPasswordInput.classList.remove('border');

  registerEmailErrorSpan.textContent = '';
  registerUsernameErrorSpan.textContent = '';
  registerPasswordErrorSpan.textContent = '';
}
