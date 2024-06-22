export interface FeedData {
  tfa?: Article;
  mostread?: MostRead;
  image?: FeedDataImage;
  onthisday?: Onthisday[];
  news?: News;
}

export interface FeedResponse {
  onthisday?: Article[];
  onthisdayCount?: number;
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

export interface News {
  text: string;
  pages: Article[];
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

export enum Lang {
  En = 'en',
}

export interface Thumbnail {
  source: string;
  width: number;
  height: number;
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

export interface MostRead {
  date: string;
  articles: Article[];
  count?: number;
}

export interface Article {
  views?: number;
  rank?: number;
  view_history?: ViewHistory[];
  type: Type;
  title: string;
  displaytitle: string;
  namespace: Namespace;
  wikibase_item: string;
  titles: Titles;
  pageid: number;
  lang: Lang;
  dir: Dir;
  revision: string;
  tid: string;
  timestamp: Date;
  description?: string;
  description_source?: DescriptionSource;
  content_urls: ContentUrls;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
  thumbnail?: Thumbnail;
  originalimage?: Thumbnail;
  coordinates?: Coordinates;
}

export interface ContentUrls {
  desktop: Desktop;
  mobile: Desktop;
}

export interface Desktop {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export enum DescriptionSource {
  Local = 'local',
}

export enum Dir {
  LTR = 'ltr',
}

export interface Namespace {
  id: number;
  text: string;
}

export interface Titles {
  canonical: string;
  normalized: string;
  display: string;
}

export enum Type {
  Standard = 'standard',
}

export interface ViewHistory {
  date: string;
  views: number;
}

export interface Onthisday {
  text: string;
  pages: Article[];
  year: number;
  count?: number;
}

export interface FeedQueryParams {
  language: string;
  date: string;
  type?: string;
  limit?: string;
  offset?: string;
}

export interface FeedTranslateResponse {
  translatedText: string;
  alternatives?: string[];
}

export interface FeedTranslateParams {
  text: string;
  source?: string;
}

export interface FeedTranslateLanguageResponse {
  code: string;
  name: string;
  targets: string[];
}
