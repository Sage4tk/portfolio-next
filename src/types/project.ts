export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  websiteLocation?: string;
  createdAt?: Date | string;
  updatedAt: Date | string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  image: File | null;
  techStack: string[];
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  websiteLocation?: string;
  createdAt?: Date | string;
}

export const AVAILABLE_TECH_STACK = [
  "React",
  "TypeScript",
  "Next.js",
  "React Native",
  "Tailwind CSS",
  "Supabase",
  "Firebase",
  "AWS",
  "Google Cloud",
  "Node.js",
  "SQL",
  "NoSQL",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "REST API",
  "Jest",
  "Cypress",
  "Vercel",
  "Netlify",
  "PHP",
  "Python",
  "Django",
  "Flask",
  "Wordpress",
  "Payment Gateways",
  "Stripe",
  "CMS (Content Management System)",
  "Directus",
];
