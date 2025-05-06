import contacts from '../../../data/json/contacts.json' with { type: 'json' };
import {Contact} from '../types/types';

interface ContactJson {
    name?: string;
    description?: string;
    linkedin?: string;
    email?: string;
}


function parseContact(json: ContactJson): Contact | null {

    if(!(json.name && json.description)){
        console.error('Event is missing required fields:', json);
        return null;
    }

    return {
        name: json.name,
        description: json.description,
        email: json.email,
        linkedin: json.linkedin,
    }
}

export function getContacts(){
    return contacts.map((json) => parseContact(json)).filter((contact) => contact !== null) as Contact[];
}