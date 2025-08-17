import { fetchContacts } from './fetch.js';
import { fetchEvents } from './fetch.js';
import { parseContact } from './parse.js';
import { parseEvents } from './parse.js';
import { writeFile } from 'fs/promises';
import { getRecentAndFuture } from './util.js';

const contactData = await fetchContacts();
const contacts = contactData.map(parseContact).filter(Boolean);

console.log('Contacts:', contacts);
await writeFile('./json/all-contacts.json', JSON.stringify(contacts, null, 2));

const eventData = await fetchEvents();
const events = parseEvents(eventData);
const recentAndFutureEvents = getRecentAndFuture(events);
console.log('Events:', recentAndFutureEvents);
await writeFile(
  './json/recent-and-future-events.json',
  JSON.stringify(recentAndFutureEvents, null, 2)
);
