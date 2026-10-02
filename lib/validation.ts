import { z } from 'zod';
import { SITE_CONFIG } from './config';

const { contact } = SITE_CONFIG.forms;

// Schéma Contact - Standard EHAF
export const ContactSchema = z.object({
  name: z
    .string()
    .min(contact.validation.name.minLength, 'Le nom est trop court')
    .max(contact.validation.name.maxLength, 'Le nom est trop long'),
  email: z
    .string()
    .email("Format d'email invalide")
    .max(contact.validation.email.maxLength, "L'email est trop long"),
  subject: z.string().optional().or(z.literal('')),
  message: z
    .string()
    .min(contact.validation.message.minLength, 'Le message est trop court')
    .max(contact.validation.message.maxLength, 'Le message est trop long'),
});

export const BlogPostSchema = z.object({
  title: z.string().trim().min(1).max(160),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(180),
  excerpt: z.string().trim().min(1).max(500),
  content: z.string().min(1).max(500_000),
  published: z.boolean(),
  thumbnail: z.string().url().max(2048).optional().or(z.literal('')),
});

export const EventIdSchema = z.string().trim().min(1).max(128);

export type ContactFormData = z.infer<typeof ContactSchema>;
export type BlogPostData = z.infer<typeof BlogPostSchema>;
