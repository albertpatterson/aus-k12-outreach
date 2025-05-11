export function sortByStart(events) {
  return events.sort((a, b) => {
    return a.start - b.start;
  });
}

export function getUpcoming(events) {
  const now = new Date();
  const twoMonthsFromNow = new Date();
  twoMonthsFromNow.setMonth(now.getMonth() + 2);
  return events.filter(
    (event) => event.start >= now && event.start <= twoMonthsFromNow
  );
}
