/**
 * Array of months. The sorting function uses the indices to make sorting easier.
 */
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Takes an array and sorts it by month year strings (ex. May 2021) in the end-date.
 * @param {*} cardArray
 */
const DateSorter = (card1, card2) => {
  // First check if one project is currently being worked on (denoted by empty string), while the other isn't.
  if (card1.details['end-date'] === '' && card2.details['end-date'] !== '')
    return -1;
  if (card2.details['end-date'] === '' && card1.details['end-date'] !== '')
    return 1;

  // Tokenize end-dates. 0 index is month, 1 index is year.
  const card1EndDate = card1.details['end-date'].split(' ');
  const card2EndDate = card2.details['end-date'].split(' ');

  // Check which year is more recent
  if (card1EndDate[1] !== card2EndDate[1]) {
    return card2EndDate[1] - card1EndDate[1];
  }
  if (card1EndDate[0] !== card2EndDate[0]) {
    // Compare the months if they are not the same.
    return months.indexOf(card2EndDate[0]) - months.indexOf(card1EndDate[0]);
  }
  // We reached here because the end dates are the same.
  // Now check the start dates (basically the repeat the same function, but reverse everything because less recent start dates should come first).
  // Tokenize end-dates. 0 index is month, 1 index is year.
  const card1StartDate = card1.details['start-date'].split(' ');
  const card2StartDate = card2.details['start-date'].split(' ');

  // Check which year is more recent
  if (card1StartDate[1] !== card2StartDate[1]) {
    return card1StartDate[1] - card2StartDate[1];
  }
  if (card1StartDate[0] !== card2StartDate[0]) {
    // Compare the months if they are not the same.
    return (
      months.indexOf(card1StartDate[0]) - months.indexOf(card2StartDate[0])
    );
  }

  // If we reach here, that means the two cards have the exact same start and end dates.
  return 0;
};

export default function SortCardsByDate(cardArray) {
  return cardArray.sort(DateSorter);
}
