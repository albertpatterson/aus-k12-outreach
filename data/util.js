export function sortByStart(events) {
  return events.sort((a, b) => {
    return a.start - b.start;
  });
}

export function getFuture(events) {
  const now = new Date();
  return events.filter((event) => event.end && event.end >= now);
}

export function getRecent(events) {
  const now = new Date();
  events.filter((event) => event.end < now);
  return events.slice(-10);
}
