import eventData from "./events.json";

export type StaticEvent = {
  slug: string;
  title: string;
  description: string;
  date: string;
  type: string;
  platform: string;
  eventUrl?: string;
  registrationLink?: string;
  thumbnail?: string;
  featured?: boolean;
};

/**
 * Generated from the existing database by `pnpm content:export`.
 * Individual registrations are intentionally not migrated into the public site.
 */
export const events = eventData as StaticEvent[];
