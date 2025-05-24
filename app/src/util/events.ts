import futureEvents from '../../../data/json/future-events.json' with { type: 'json' };
import recentEvents from '../../../data/json/recent-events.json' with { type: 'json' };
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
    id?: string;
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

    if(!(json.name && json.description && json.start && json.end && json.location && signUpMarkdown && json.latitude && json.longitude && json.id)){
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
        id: json.id,
    }
}

function splitUpcomingEvents(){
    const partitions = {
        distantFuture: [] as Event[],
        upcoming: [] as Event[],
        past: [] as Event[],
    }

    const now = new Date();
    const twoMonthsFromNow = new Date();
    twoMonthsFromNow.setMonth(now.getMonth() + 2);
  
    for(const eventJson of futureEvents) {
        const event = parseEvent(eventJson);
        if (event === null) {
            continue;
        }
        const start = event.start;
        const end = event.end;

        if (end < now) {
            partitions.past.push(event);
        } else if (start <= twoMonthsFromNow) {
            partitions.upcoming.push(event);
        }else{
            partitions.distantFuture.push(event);
        }
    }

    return partitions;
}

export function getUpcomingEvents(){
    return splitUpcomingEvents().upcoming;
}

export function getRecentEvents() {
    const parsedRecentEvents = recentEvents.map((eventJson: EventJson) => parseEvent(eventJson)).filter((event: Event|null) => event !== null) as Event[];
    const additionalParsedRecentEvents = splitUpcomingEvents().past;

    return [...parsedRecentEvents, ...additionalParsedRecentEvents];
}

export function sortEventsByStart(events: Event[], descending=false): Event[] {
    const sorted = [...events];
    if (descending) {
        sorted.sort((a, b) => b.start.getTime() - a.start.getTime());
    }else {        
        sorted.sort((a, b) => a.start.getTime() - b.start.getTime());
    }
    return sorted
}