import { z } from 'zod';
import { SITE_CONFIG } from './config';

const { contact } = SITE_CONFIG.forms;

// Schéma Contact - Standard EHAF
export const ContactSchema = z.object({
  name: z
    .string()
    .min(contact.validation.name.minLength, "Le nom est trop court")
    .max(contact.validation.name.maxLength, "Le nom est trop long"),
  email: z
    .string()
    .email("Format d'email invalide")
    .max(contact.validation.email.maxLength, "L'email est trop long"),
  subject: z.string().optional().or(z.literal('')),
  message: z
    .string()
    .min(contact.validation.message.minLength, "Le message est trop court")
    .max(contact.validation.message.maxLength, "Le message est trop long"),
});

// Schéma Collaboration Initiative (Project Request sur dev)
export const ProjectRequestSchema = z.object({
  organization: z.string().min(2, "Le nom de l'organisation est requis"),
  role: z.string().min(2, "Le rôle est requis"),
  location: z.string().optional().or(z.literal('')),
  email: z.string().email("Format d'email invalide"),
  phone: z.string().optional().or(z.literal('')),
  country: z.string().min(2, "Le pays est requis"),
  
  initiativeType: z.string().min(1, "Le type d'initiative est requis"),
  initiativeName: z.string().min(3, "Le nom de l'initiative est trop court"),
  vision: z.string().min(10, "La vision doit être plus détaillée"),
  context: z.string().optional().or(z.literal('')),
  
  engagementLevel: z.string().min(1, "Le niveau d'engagement est requis"),
  priority: z.string().min(1, "La priorité est requise"),
  timeline: z.string().min(1, "La timeline est requise"),
  dataSensitivity: z.string().min(1, "La sensibilité des données est requise"),
  existingInfrastructure: z.string().optional().or(z.literal('')),
  regulatoryRequirements: z.string().optional().or(z.literal('')),
  technologies: z.array(z.string()).default([]),
});

export type ContactFormData = z.infer<typeof ContactSchema>;
export type ProjectRequestFormData = z.infer<typeof ProjectRequestSchema>;
