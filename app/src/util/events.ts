import upcomingEvents from '../../../data/json/upcoming-events.json' with { type: 'json' };
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

    if(!(json.name && json.description && json.start && json.end && json.location && signUpMarkdown)){
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
    }
}

export function getUpcomingEvents(){
    return upcomingEvents.map((eventJson) => parseEvent(eventJson)).filter((event) => event !== null) as Event[];
}