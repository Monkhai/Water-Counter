import { mainURL } from '../../common.js';
import { fetchSettings } from '../onLoad/fetchSettings.js';
import { getJWT } from '../onLoad/getJWT.js';

const apiUrl = `${mainURL}/api/logs/new_log`;

// this is a fetch for creating a new log. Used every time a plus button is clicked. Called in saveAmount file in increaseAmount function
export async function createNewPositiveLog() {
  const jwt = getJWT();
  const amount = await fetchSettings();

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': jwt,
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error('Failed to create new log.');
    }
  } catch (error) {
    console.error(error);
  }
}

// this is a fetch for creating a new log. Used every time a minus button is clicked. Called in saveAmount file in decreaseAmount function
export async function createNewNegativeLog() {
  const jwt = getJWT();
  const amount = (await fetchSettings()) * -1;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': jwt,
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error('Failed to create new log.');
    }
  } catch (error) {
    console.error(error);
  }
}
