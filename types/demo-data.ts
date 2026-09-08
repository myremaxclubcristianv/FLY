import { DataStatus } from "./verification";

export interface WorldItem {
  id: string;
  title: string;
  code: string;
  description: string;
  href: string;
  badge: string;
  status: DataStatus;
  metrics: string;
}

export interface AircraftCategoryPreview {
  id: string;
  category: string;
  name: string;
  description: string;
  range: string;
  capacity: string;
  speed: string;
  status: DataStatus;
}

export interface ExperiencePreview {
  id: string;
  title: string;
  location: string;
  type: string;
  duration: string;
  description: string;
  status: DataStatus;
}

export interface DestinationPreview {
  id: string;
  name: string;
  region: string;
  highlights: string;
  indicativeAccess: string;
  status: DataStatus;
}

export interface JournalArticlePreview {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
}
