import { mainURL } from '../../common.js';
import { getJWT } from './getJWT.js';

//fetching the settings of how much to increase in every time as well as to load the correct option in the select element of the settings
export async function fetchSettings() {
  const jwt = getJWT();

  const loginApiUrl = `${mainURL}/api/settings/get_settings`;

  try {
    const response = await fetch(loginApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': jwt,
      },
    });
    if (!response.ok) {
      throw new Error('Cannot get settings!');
    }
    const data = await response.json();
    const amount = data.setting.amount;
    return amount;
  } catch (error) {
    console.error(error);
  }
}
