import { Building2, Layers, Target, Shield, CheckCircle, RefreshCwIcon } from 'lucide-react';

export interface WizardData {
    organization: string;
    role: string;
    location: string;
    email: string;
    phone: string;
    country: string;
    initiativeType: string;
    initiativeName: string;
    vision: string;
    context: string;
    engagementLevel: string;
    priority: string;
    timeline: string;
    dataSensitivity: string;
    existingInfrastructure: string;
    regulatoryRequirements: string;
    technologies: string[];
}

export const initiativeTypes = [
    { value: 'infra', label: 'Architecture d\'Infrastructure', icon: Building2 },
    { value: 'modernization', label: 'Modernisation Système', icon: RefreshCwIcon },
    { value: 'cloud-struct', label: 'Structuration Cloud', icon: Layers },
    { value: 'training', label: 'Programme de Formation Audit', icon: Target },
    { value: 'governance', label: 'Gouvernance & Audit', icon: Shield },
];

export const engagementOptions = [
    { value: 'exploratory', label: 'Exploratoire (Diagnostic Initial)' },
    { value: 'pilot', label: 'Pilote (Preuve de Concept)' },
    { value: 'structuring', label: 'Structuration (Déploiement Core)' },
    { value: 'scale', label: 'Déploiement & Gouvernance (Long Terme)' },
];

export const priorityLevels = [
    { value: 'critical', label: 'Critique (Impact Direct)' },
    { value: 'strategic', label: 'Stratégique (Evolution Planifiée)' },
    { value: 'optimization', label: 'Optimisation (Amélioration des Flux)' },
];

export const technologyOptions = [
    'Docker / Orchestration', 'Infrastructure Hybride', 'Next.js / React Framework',
    'TypeScript (Typed Data Flow)', 'PostgreSQL / SQL Core', 'Security Protocols (SSL/TLS)',
    'Cloud Identity (IAM)', 'DevOps / CI-CD Protocols',
];

export const steps = [
    { id: 1, title: 'Contexte', icon: Building2 },
    { id: 2, title: 'Initiative', icon: Layers },
    { id: 3, title: 'Enjeux', icon: Target },
    { id: 4, title: 'Systémique', icon: Shield },
    { id: 5, title: 'Validation', icon: CheckCircle },
];
