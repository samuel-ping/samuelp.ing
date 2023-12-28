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

const monthToAbbreviation = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'June',
  July: 'July',
  August: 'Aug',
  September: 'Sept',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
};

/**
 * Takes an array and sorts it by month year strings (ex. May 2021) in the end-date.
 * @param {*} cardArray
 */
export const DateSorter = (card1, card2) => {
  // Check if one project is currently being worked on (denoted by empty string), while the other isn't.
  if (card1.details['end'] === '' && card2.details['end'] !== '') return -1;
  if (card2.details['end'] === '' && card1.details['end'] !== '') return 1;

  // Tokenize end-dates. 0 index is month, 1 index is year.
  const card1EndDate = card1.details['end'].split(' ');
  const card2EndDate = card2.details['end'].split(' ');

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
  const card1StartDate = card1.details['start'].split(' ');
  const card2StartDate = card2.details['start'].split(' ');

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

/**
 * Takes in start and end dates (format: "<month> <year>") and formats it into a presentable date range.
 * @param {*} start
 * @param {*} end
 */
export const FormatDateStr = (start, end) => {
  const startMonth = start.split(' ')[0];
  const startYear = start.split(' ')[1];
  const endMonth = monthToAbbreviation[end.split(' ')[0]];
  const endYear = end.split(' ')[1];

  var dateString = '';
  if (start === end) {
    // project was completed within a month (start month is same as end month)
    dateString = `${startMonth} ${startYear}`;
  } else if (end == '') {
    // project hasn't been completed
    dateString = `${monthToAbbreviation[startMonth]} ${startYear} - Present`;
  } else {
    // project was completed in different months
    dateString = `${monthToAbbreviation[startMonth]} ${startYear} - ${endMonth} ${endYear}`;
  }

  return dateString;
};
