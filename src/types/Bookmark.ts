export type ISODateString = string & { __brand: 'ISODateString' };

export interface Bookmark {
    title: string;
    url: string;
    category: string;
    dateAdded: ISODateString; // Enforces the use of an ISO date string
}
