export interface Event {
    name: string;
    description: string;
    start: Date;
    end: Date;
    location: string;
    signUpMarkdown: string;
  }

export interface Contact {
    name: string;
    description: string;
    email?: string;
    linkedin?: string;
}
