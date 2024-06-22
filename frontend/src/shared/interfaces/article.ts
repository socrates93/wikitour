export interface Article {
  views?: number;
  rank?: number;
  read?: boolean;
  summary?: string;
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

export enum Lang {
  En = 'en',
}

export interface Thumbnail {
  source: string;
  width: number;
  height: number;
}

export enum DescriptionSource {
  Local = 'local',
}

export enum Dir {
  LTR = 'ltr',
}

export interface ContentUrls {
  desktop: Desktop;
  mobile: Desktop;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Desktop {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

export interface IFetchArticles {
  lang: string;
  date: string;
  limit?: number;
  offset?: number;
}

export interface ArticleTranslationResponse {
  translatedText?: string;
  alternatives?: string[];
}

export interface ArticleCardProps {
  article: Article;
  onClick?: () => void;
  onTranslate?: () => Promise<{ title?: string; summary?: string }>;
}
