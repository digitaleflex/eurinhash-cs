/**
 * Événements publics versionnés dans Git.
 *
 * Exporter d'abord les événements utiles de la base existante vers ce format.
 * Les inscriptions individuelles ne font pas partie du portfolio public V1.
 */
export type StaticEvent = {
  slug: string;
  title: string;
  description: string;
  date: string;
  type: "Live" | "Webinaire" | "Conférence" | "Autre";
  platform: "YouTube" | "TikTok" | "Google Meet" | "Substack" | "Autre";
  eventUrl?: string;
  registrationLink?: string;
  thumbnail?: string;
  featured?: boolean;
};

/**
 * Pas d'événements inventés : renseigner ce tableau après export et vérification
 * des événements historiques/futurs existants.
 */
export const events: StaticEvent[] = [];
