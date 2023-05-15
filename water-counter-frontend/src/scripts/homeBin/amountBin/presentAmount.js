import { amountPresentor } from '../../selectors.js';
import { fetchDailyAmount } from '../onLoad/fetchDailyAmount.js';

//presents the daily amount on to the amount presented
export async function presentAmount() {
  const newAmount = await fetchDailyAmount();
  const formatedNewAmount = newAmount / 1000;
  if (formatedNewAmount > 0) {
    amountPresentor.textContent = `${formatedNewAmount}L`;
  } else {
    amountPresentor.textContent = `0.0L`;
  }
}
