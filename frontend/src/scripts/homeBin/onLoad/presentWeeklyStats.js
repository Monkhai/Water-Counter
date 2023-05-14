import { fetchWeeklyStats } from './fetchWeeklyStats.js';

//presents the weekly stats that were fetched.
export async function presentWeeklyStats() {
  const weeklyStats = await fetchWeeklyStats();

  weeklyStats.forEach((item, index) => {
    const dateElement = document.querySelector(`.date_${index + 1}`);
    const itemElement = document.querySelector(`.item_${index + 1}`);

    if (dateElement && dateElement.textContent !== 'Yesterday')
      dateElement.textContent = formatDate(item.date);

    const formattedAmount = item.totalAmount / 1000;
    if (itemElement) itemElement.textContent = `${formattedAmount}L`;
  });
}

//a function that takes the date and reformats it to dd-mm-yy
function formatDate(dateString) {
  // Manually parse the date string
  const [year, month, day] = dateString.split('-').map(Number);

  // Create a new Date object with the year, month, and day
  // Note: Months are 0-based in JavaScript
  const date = new Date(year, month - 1, day);

  // Format the date as dd-mm-yy
  const formattedDay = String(date.getDate()).padStart(2, '0');
  const formattedMonth = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
  const formattedYear = String(date.getFullYear()).slice(-2); // Get the last 2 digits of the year
  return `${formattedDay}-${formattedMonth}-${formattedYear}`;
}
