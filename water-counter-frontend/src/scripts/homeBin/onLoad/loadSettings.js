import { amountSelector } from '../../selectors.js';
import { fetchSettings } from './fetchSettings.js';

//load the setting that was fetched

const amount = await fetchSettings();
export function loadSetting() {
  unloadOldSetting();

  amountSelector.querySelectorAll('option').forEach((option) => {
    if (option.value == amount) {
      option.selected = true;
    }
  });
}

function unloadOldSetting() {
  amountSelector.querySelectorAll('option').forEach((option) => {
    if (option.selected === true) {
      option.selected = false;
    }
  });
}
