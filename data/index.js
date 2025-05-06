import { fetchContacts } from './fetch.js';
import { fetchEvents } from './fetch.js';
import { parseContact } from './parse.js';
import { parseEvent } from './parse.js';
import { writeFile } from 'fs/promises';

const contactData = await fetchContacts();
const contacts = contactData.map(parseContact).filter(Boolean);

console.log('Contacts:', contacts);
await writeFile('./json/contacts.json', JSON.stringify(contacts, null, 2));

const eventData = await fetchEvents();
const events = eventData.map(parseEvent).filter(Boolean);
console.log('Events:', events);
await writeFile('./json/events.json', JSON.stringify(events, null, 2));
