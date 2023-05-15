import {
  loginEmailInput,
  loginEmailErrorSpan,
  loginPasswordInput,
  loginPasswordErrorSpan,
} from '../../selectors.js';

//removes red borders and error text. Used when user has a mistake and then tries again and is wrong in they will see both errors.
export function resetLoginInputErrors() {
  loginEmailInput.classList.remove('border');
  loginPasswordInput.classList.remove('border');

  loginEmailErrorSpan.textContent = '';
  loginPasswordErrorSpan.textContent = '';
}
