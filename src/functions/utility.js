export const toDate = (seconds) => {
  let date = new Date(seconds * 1000).toString().split('(')[0];
  date = `${date.substring(4, 24)}`;
  return date;
};

export const getMonth = () => {
  const d = new Date();
  const month = new Array();
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';
  return month[d.getMonth()];
};
