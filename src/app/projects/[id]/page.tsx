import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById } from "@/services/projectService";
import { Project } from "@/types/project";
import ProjectPageClient from "./ProjectPageClient";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectById(resolvedParams.id);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} - Portfolio`,
    description:
      project.description.length > 160
        ? `${project.description.substring(0, 157)}...`
        : project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.imageUrl
        ? [
            {
              url: project.imageUrl,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.imageUrl ? [project.imageUrl] : [],
    },
    keywords: project.techStack.join(", "),
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = await getProjectById(resolvedParams.id);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}
