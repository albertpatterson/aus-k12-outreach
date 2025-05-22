import { fetchContacts } from './fetch.js';
import { fetchEvents } from './fetch.js';
import { parseContact } from './parse.js';
import { parseEvent } from './parse.js';
import { writeFile } from 'fs/promises';
import { sortByStart, getFuture } from './util.js';

const contactData = await fetchContacts();
const contacts = contactData.map(parseContact).filter(Boolean);

console.log('Contacts:', contacts);
await writeFile('./json/all-contacts.json', JSON.stringify(contacts, null, 2));

const eventData = await fetchEvents();
const events = eventData.map(parseEvent).filter(Boolean);
const sortedEvents = sortByStart(events);
const futureEvents = getFuture(sortedEvents);
console.log('Events:', sortedEvents);
await writeFile(
  './json/all-events.json',
  JSON.stringify(sortedEvents, null, 2)
);
await writeFile(
  './json/future-events.json',
  JSON.stringify(futureEvents, null, 2)
);
