export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Event {
    name: string;
    description: string;
    start: Date;
    end: Date;
    location: string;
    signUpMarkdown: string;
    coordinatesList: Coordinates[];
    id: string;
  }

export interface Contact {
    name: string;
    description?: string;
    email?: string;
    linkedin?: string;
}
