import { mainURL } from '../../common.js';
import { amountSelector } from '../../selectors.js';
import { getJWT } from '../onLoad/getJWT.js';

//a fetch that updates the amount that each click would increase and decrease.
export const updateSetting = async () => {
  const jwt = getJWT();
  const amount = amountSelector.value;
  const settingsURL = `${mainURL}/api/settings/update_settings`;
  try {
    const response = await fetch(settingsURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': jwt,
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error('Setting update failed');
    }

    const data = await response.json();
    console.log(data.message); // Output: 'setting updated!'
  } catch (error) {
    console.error(error);
  }
};
