import { settingsWindowSection, settingsBtn } from '../../selectors.js';
//a function that closes the settings window
export function closeSettingsWindow() {
  settingsWindowSection.classList.add('hidden');
}
//a function that opens the settings window
export function openSettingsWindow() {
  settingsWindowSection.classList.remove('hidden');
}

//a function that closes the settings window with the escape key
export function closeSettingsWindowEsc(event) {
  event = event || window.event;
  if (event.key === 'Escape') {
    closeSettingsWindow();
    settingsBtn.blur();
  }
}
