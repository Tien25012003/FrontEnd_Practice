const DataConfig = (currentDate = new Date()) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const maxDateOfCurrMonth = new Date(year, month, 0).getDate();
  const maxDateOfPrevMonth = new Date(year, month - 1, 0).getDate();
  const lastDayOfPrevMonth = new Date(
    year,
    month - 2,
    maxDateOfPrevMonth,
  ).getDay();
  const firstDayOfNextMonth = new Date(year, month, 1).getDay();
  let DATA = [];
  for (let i = 0; i <= lastDayOfPrevMonth; i++) {
    //DATA.push({date: maxDateOfPrevMonth - lastDayOfPrevMonth + i, curr: -1});
    DATA.push(
      new Date(year, month - 2, maxDateOfPrevMonth - lastDayOfPrevMonth + i),
    );
  }
  for (let i = 1; i <= maxDateOfCurrMonth; i++) {
    //DATA.push({date: i});
    DATA.push(new Date(year, month - 1, i));
  }
  for (let i = 1; i <= 7 - firstDayOfNextMonth; i++) {
    //DATA.push({date: i, curr: 1});
    DATA.push(new Date(year, month, i));
  }
  return DATA;
};
export default DataConfig;
