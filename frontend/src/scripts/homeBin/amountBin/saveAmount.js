import { fetchDailyAmount } from '../onLoad/fetchDailyAmount.js';
import { createNewNegativeLog, createNewPositiveLog } from './createNewLog.js';
import { presentAmount } from './presentAmount.js';

//this is the function that gets called when a button is clicked. It serves as a funnel that from which the new log creation and the log presentation functions are called.
export async function incrementAmount() {
  await createNewPositiveLog();
  presentAmount();
}

export async function reduceAmount() {
  const dailyAmount = await fetchDailyAmount();
  if (dailyAmount > 0) {
    await createNewNegativeLog();
    presentAmount();
  }
}
