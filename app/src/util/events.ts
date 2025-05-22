import futureEvents from '../../../data/json/future-events.json' with { type: 'json' };
import {replaceEmailWithMarkdown, replaceRawLinkWithMarkdown} from './markdown';
import {Event} from '../types/types';

interface EventJson {
    name?: string;
    description?: string;
    start?: string;
    end?: string;
    location?: string;
    signUpLink?: string;
    signUpByEmailInstruction?: string;
    latitude?: number;
    longitude?: number;
}

function getSignUpMarkdown(json: EventJson): string|null {
    if (json.signUpLink) {
        return replaceRawLinkWithMarkdown(json.signUpLink);
    } else if (json.signUpByEmailInstruction) {
        return replaceEmailWithMarkdown(json.signUpByEmailInstruction);
    }
    return null;
}

function parseEvent(json: EventJson): Event | null {

    const signUpMarkdown = getSignUpMarkdown(json);

    if(!(json.name && json.description && json.start && json.end && json.location && signUpMarkdown && json.latitude && json.longitude)){
        console.error('Event is missing required fields:', json);
        return null;
    }

    return {
        name: json.name,
        description: json.description,
        start: new Date(json.start),
        end: new Date(json.end),
        location: json.location,
        signUpMarkdown: signUpMarkdown,
        latitude: json.latitude,
        longitude: json.longitude,
    }
}

export function getUpcomingEvents(){
  const now = new Date();
  const twoMonthsFromNow = new Date();
  twoMonthsFromNow.setMonth(now.getMonth() + 2);

    return futureEvents.map((eventJson: EventJson) => parseEvent(eventJson)).filter((event: Event|null) => {
        if (event === null) {
            return false;
        }
        const start = event.start;
        const end = event.end;
        return end >= now && start <= twoMonthsFromNow;
    }) as Event[];
}