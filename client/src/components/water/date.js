export const daysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
}

export const getDateXDaysAgo = (numOfDays, date = new Date()) => {
  const pastDate = new Date(date.getTime());

  pastDate.setDate(date.getDate() - numOfDays);

  return pastDate.toLocaleDateString('en-CA');
}