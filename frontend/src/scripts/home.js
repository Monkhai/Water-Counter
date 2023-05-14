import { updateSetting } from './homeBin/settingsHandlers/updateSettings.js';
import {
  blurWindow,
  settingsBtn,
  settingsXBtn,
  saveBtn,
  plusBtn,
  minusBtn,
  logoutBtn,
} from './selectors.js';
import {
  openSettingsWindow,
  closeSettingsWindow,
  closeSettingsWindowEsc,
} from './homeBin/settingsHandlers/setttingsWindowHandler.js';
import { checkJWT } from './homeBin/onLoad/jwtVerification.js';
import { loadSetting } from './homeBin/onLoad/loadSettings.js';
import { incrementAmount, reduceAmount } from './homeBin/amountBin/saveAmount.js';
import { loadAmount } from './homeBin/onLoad/loadAmount.js';
import { presentWeeklyStats } from './homeBin/onLoad/presentWeeklyStats.js';
import { scheduleDaily } from './homeBin/onLoad/dailyRefresher.js';
import { logout } from './homeBin/settingsHandlers/logout.js';

//on load
checkJWT();
loadSetting();
loadAmount();
presentWeeklyStats();
scheduleDaily();

//on action
plusBtn.addEventListener('click', incrementAmount);
minusBtn.addEventListener('click', reduceAmount);
settingsXBtn.addEventListener('click', closeSettingsWindow);
blurWindow.addEventListener('click', closeSettingsWindow);
settingsBtn.addEventListener('click', openSettingsWindow);
document.addEventListener('keyup', closeSettingsWindowEsc);
saveBtn.addEventListener('click', updateSetting);
logoutBtn.addEventListener('click', logout);
