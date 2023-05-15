import { loadAmount } from './loadAmount.js';

export function scheduleDaily() {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const timeUntilNextMidnight = nextMidnight - now;

  setTimeout(() => {
    loadAmount();

    // Reschedule for the next day
    scheduleDaily();
  }, timeUntilNextMidnight);
}

// Start the initial scheduling
