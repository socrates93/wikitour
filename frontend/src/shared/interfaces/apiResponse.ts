import { Article, Lang, Thumbnail } from '.';

export interface FeedData {
  onthisday: Article[];
  onthisdayCount: number;
}

export interface FeedDataImage {
  title: string;
  thumbnail: Thumbnail;
  image: Thumbnail;
  file_page: string;
  artist: Artist;
  credit: Artist;
  license: License;
  description: Description;
  wb_entity_id: string;
  structured: Structured;
}

export interface Artist {
  html: string;
  text: string;
}

export interface Description {
  html: string;
  text: string;
  lang: Lang;
}

export interface License {
  type: string;
  code: string;
  url: string;
}

export interface Structured {
  captions: Captions;
}

export interface Captions {
  en: string;
  vi: string;
  uk: string;
  ru: string;
}
