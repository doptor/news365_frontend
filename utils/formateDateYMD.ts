/**
 * Formats a given date string to the 'YYYY-MM-DD' format.
 *
 * This function takes a date string as input and returns the date formatted in the 'YYYY-MM-DD' format.
 * It first creates a Date object from the provided date string, extracts the year, month, and day, and then
 * constructs the formatted date string. This ensures consistent formatting for displaying dates in a specific
 * format throughout the application.
 *
 * @param {string} dateString - The date string to be formatted (e.g., 'MM/DD/YYYY', 'YYYY-MM-DD', etc.).
 * @returns {string} The formatted date string in the 'YYYY-MM-DD' format.
 */

const formateDateYMD = (dateString: string) => {
  // Create a Date object from the given date string
  const originalDate = new Date(dateString);

  // Get the year, month, and day from the original date
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1); // Months are 0-indexed, so add 1
  const day = String(originalDate.getDate());

  // Create the formatted date string in the desired format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export default formateDateYMD;
