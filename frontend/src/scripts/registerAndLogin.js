import { loginUser } from './loginAndRegisterBin/loginUser.js';
import { registerUser } from './loginAndRegisterBin/registerUser.js';
import { loginBtn, registerBtn } from './selectors.js';

registerBtn.addEventListener('click', registerUser);
loginBtn.addEventListener('click', loginUser);
