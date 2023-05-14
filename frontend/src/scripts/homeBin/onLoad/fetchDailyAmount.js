import { mainURL } from '../../common.js';
import { getJWT } from './getJWT.js';

//a fetch that gets the daily amount that has already been logged. Used when page is load and when amount is in/decreased.
export async function fetchDailyAmount() {
  const jwt = getJWT();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const apiUrl = `${mainURL}/api/logs/get_daily_amount`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': jwt,
        'x-user-timezone': timezone,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch daily amount');
    }
    const data = await response.json();
    const dailyAmount = data.dailyAmount[0];
    //making sure that if the amount is null (nothing was submitted today), the function will return 0.0 and not null
    if (dailyAmount) {
      return dailyAmount.totalAmount;
    } else {
      return '0.0';
    }
  } catch (error) {
    console.log(error);
  }
}
