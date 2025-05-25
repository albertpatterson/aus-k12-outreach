export function sortByStart(events, descending = false) {
  if (descending) {
    return events.sort((a, b) => {
      return b.start - a.start;
    });
  }

  return events.sort((a, b) => {
    return a.start - b.start;
  });
}

const MAX_EVENTS_PAST = 25;
export function getRecentAndFuture(events) {
  const now = new Date();
  let numPast = 0;

  const recentAndFutureEvents = [];
  for (const event of sortByStart(events, true)) {
    recentAndFutureEvents.push(event);

    if (event.end < now) {
      numPast++;
    }
    if (numPast >= MAX_EVENTS_PAST) {
      break;
    }
  }

  return recentAndFutureEvents;
}
