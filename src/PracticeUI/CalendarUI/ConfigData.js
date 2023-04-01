export const ConfigData = currentDate => {
  const now = new Date();
  let data = [];
  const ConvertDate = (date, distanceMonth, number) => {
    return new Date(
      date.getFullYear(),
      date.getMonth() + distanceMonth,
      number ?? date.getDate(),
    );
  };
  let firstDayOfCurrMonth = ConvertDate(currentDate, 0, 1).getDay();
  let maxDateOfPrevMonth = ConvertDate(currentDate, 0, 0).getDate();
  const maxDateOfCurrMonth = ConvertDate(currentDate, 1, 0).getDate();
  const lastDayOfCurrMonth = ConvertDate(
    currentDate,
    0,
    maxDateOfCurrMonth,
  ).getDay();
  // condition here is to disable date in the past
  data = Array.from([...new Array(maxDateOfCurrMonth)], (_, i) => {
    if (
      ConvertDate(currentDate, 0, i + 1) < now &&
      currentDate.toDateString() !== now.toDateString()
    ) {
      return {
        value: i + 1,
      };
    } else {
      return {
        isEnable: true,
        value: i + 1,
      };
    }
  });
  if (firstDayOfCurrMonth === 0) {
    firstDayOfCurrMonth = 7;
  }
  for (let i = 1; i < firstDayOfCurrMonth; i++) {
    data.unshift({value: maxDateOfPrevMonth - i});
  }
  if (lastDayOfCurrMonth === 0) return data;
  else {
    for (let i = 1; i < 7 - lastDayOfCurrMonth + 1; i++) {
      data.push({value: i});
    }
  }
  return data;
};
