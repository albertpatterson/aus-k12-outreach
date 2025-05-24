import { fetchContacts } from './fetch.js';
import { fetchEvents } from './fetch.js';
import { parseContact } from './parse.js';
import { parseEvents } from './parse.js';
import { writeFile } from 'fs/promises';
import { sortByStart, getFuture, getRecent } from './util.js';

const contactData = await fetchContacts();
const contacts = contactData.map(parseContact).filter(Boolean);

console.log('Contacts:', contacts);
await writeFile('./json/all-contacts.json', JSON.stringify(contacts, null, 2));

const eventData = await fetchEvents();
const events = parseEvents(eventData);
const sortedEvents = sortByStart(events);
const futureEvents = getFuture(sortedEvents);
const recentEvents = getRecent(sortedEvents);
console.log('Events:', sortedEvents);
await writeFile(
  './json/all-events.json',
  JSON.stringify(sortedEvents, null, 2)
);
await writeFile(
  './json/future-events.json',
  JSON.stringify(futureEvents, null, 2)
);
await writeFile(
  './json/recent-events.json',
  JSON.stringify(recentEvents, null, 2)
);
