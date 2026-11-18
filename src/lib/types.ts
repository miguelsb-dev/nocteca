export type Game = {
  id: string;
  title: string;
  platform?: string;
  tags?: string[];
  cover?: string;
  screenshots?: string[];
  description?: string;
  score?: number;
  playedAt?: string;
  reviewPath: string;
  review?: string;
  addedAt: string;
  updatedAt: string;
  placeholder?: boolean;
};

export type Profile = {
  name: string;
  handle?: string;
  bio?: string;
  photo?: string;
  location?: string;
  email?: string;
  links?: { label: string; url: string }[];
};

export type LibraryIndex = {
  version: 1;
  games: Game[];
  updatedAt: string;
};

export type SortMode = "alpha" | "score" | "playedAt";

export type AppMode = "visitor" | "owner";

export type NavSection = "inicio" | "biblioteca" | "capturas" | "perfil";
