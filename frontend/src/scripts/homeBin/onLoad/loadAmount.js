import { amountPresentor } from '../../selectors.js';
import { fetchDailyAmount } from './fetchDailyAmount.js';

//daily fetch to reload daily amount
//takes the daily amount and present it on the amount presentor
export async function loadAmount() {
  const amount = await fetchDailyAmount();
  if (amount > 0) {
    amountPresentor.textContent = amount / 1000 + 'L';
  } else {
    amountPresentor.textContent = `0.0L`;
  }
}
