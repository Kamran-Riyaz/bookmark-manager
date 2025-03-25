export type ISODateString = string & { __brand: "ISODateString" };

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  category: string;
  dateAdded: ISODateString;
}
