"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@/types/project";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

interface ProjectPageClientProps {
  project: Project;
}

export default function ProjectPageClient({ project }: ProjectPageClientProps) {
  const router = useRouter();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <nav className="border-b border-gray-200/20 dark:border-gray-800/20">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Portfolio</span>
          </button>
        </div>
      </nav>

      {/* Project Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-6 tracking-tight">
            {project.title}
          </h1>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-3 mb-8">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Image */}
        {project.imageUrl && (
          <div className="mb-12">
            <div className="relative w-full h-[400px] md:h-[500px] bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Project Description */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            About This Project
          </h2>
          <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
            {project.description}
          </div>
        </div>

        {/* Project Links */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="mt-12 flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 inline-flex items-center gap-2"
              >
                View Live Project
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-full font-medium hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-200 inline-flex items-center gap-2"
              >
                View Code
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            )}
          </div>
        )}

        {/* Project Meta */}
        <div className="mt-12 p-8 bg-gray-50 dark:bg-gray-950 rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Project Details
          </h3>
          {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Project Timeline
              </h4>
              {project.createdAt ? (
                <p className="text-gray-600 dark:text-gray-300">
                  Created on{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  }).format(new Date(project.createdAt))}
                </p>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  Creation date not available
                </p>
              )}
              {project.updatedAt &&
                project.createdAt &&
                new Date(project.updatedAt).getTime() !==
                  new Date(project.createdAt).getTime() && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Last updated on{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeZone: "UTC",
                    }).format(new Date(project.updatedAt))}
                  </p>
                )}
            </div>
            {project.websiteLocation && (
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Hosting Location
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {project.websiteLocation}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-4">
            Interested in working together?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            I'm always open to discussing new opportunities and exciting
            projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200"
            >
              Get In Touch
            </button>
            <button
              onClick={() => router.push("/#work")}
              className="border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200"
            >
              View More Projects
            </button>
          </div>
        </div>
      </main>

      {/* Contact Form Modal */}
      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </div>
  );
}
