import { mainURL } from '../../common.js';
import { getJWT } from './getJWT.js';

//fetch request to get all of the weekly stats
export async function fetchWeeklyStats() {
  const jwt = getJWT();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const apiUrl = `${mainURL}/api/logs/get_weekly_stats`;

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
    return data.weeklyStats;
  } catch (error) {
    console.error(error);
  }
}
