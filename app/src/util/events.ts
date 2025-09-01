import recentAndFutureEvents from '../../../data/json/recent-and-future-events.json' with { type: 'json' };
import {replaceEmailWithMarkdown, replaceRawLinkWithMarkdown} from './markdown';
import {Event, Coordinates} from '../types/types';

interface EventJson {
    name?: string;
    description?: string;
    start?: string;
    end?: string;
    location?: string;
    signUpLink?: string;
    signUpByEmailInstruction?: string;
    coordinatesList?: Coordinates[];
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

    if(!(json.name && json.description && json.start && json.end && json.location && signUpMarkdown && json.coordinatesList && json.id)){
        console.error('Event is missing required fields:', json);
        return null;
    }

    const coordinatesList: Coordinates[] = json.coordinatesList || []

    return {
        name: json.name,
        description: json.description,
        start: new Date(json.start),
        end: new Date(json.end),
        location: json.location,
        signUpMarkdown: signUpMarkdown,
        coordinatesList,
        id: json.id,
    }
}

interface EventPartition {
    distantFuture: Event[];
    upcoming: Event[];
    past: Event[];
}

function partitionEvents(eventsJson: EventJson[]): EventPartition {
    const partitions = {
        distantFuture: [] as Event[],
        upcoming: [] as Event[],
        past: [] as Event[],
    }

    const now = new Date();
    const twoMonthsFromNow = new Date();
    twoMonthsFromNow.setMonth(now.getMonth() + 2);
  
    for(const eventJson of eventsJson) {
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

const EVENT_PARTITIONS  = partitionEvents(recentAndFutureEvents)


export function getUpcomingEvents(){
    return EVENT_PARTITIONS.upcoming;
}

export function getRecentEvents() {
    return EVENT_PARTITIONS.past;
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