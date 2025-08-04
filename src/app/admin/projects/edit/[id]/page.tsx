"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getProjects, updateProject } from "@/services/projectService";
import {
  Project,
  ProjectFormData,
  AVAILABLE_TECH_STACK,
} from "@/types/project";
import Image from "next/image";

export default function EditProject() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    image: null,
    techStack: [],
    featured: false,
    liveUrl: "",
    githubUrl: "",
    websiteLocation: "",
    createdAt: "",
  });

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push("/admin/login");
      return;
    }

    fetchProject();
  }, [user, isAdmin, router, projectId]);

  const fetchProject = async () => {
    try {
      const projects = await getProjects();
      const foundProject = projects.find((p) => p.id === projectId);

      if (!foundProject) {
        router.push("/admin/dashboard");
        return;
      }

      setProject(foundProject);
      setFormData({
        title: foundProject.title,
        description: foundProject.description,
        image: null,
        techStack: foundProject.techStack,
        featured: foundProject.featured,
        liveUrl: foundProject.liveUrl || "",
        githubUrl: foundProject.githubUrl || "",
        websiteLocation: foundProject.websiteLocation || "",
        createdAt: foundProject.createdAt
          ? typeof foundProject.createdAt === "string"
            ? foundProject.createdAt.split("T")[0]
            : foundProject.createdAt.toISOString().split("T")[0]
          : "",
      });
      setImagePreview(foundProject.imageUrl);
    } catch (error) {
      console.error("Error fetching project:", error);
      router.push("/admin/dashboard");
    } finally {
      setPageLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTechStackChange = (tech: string) => {
    const isSelected = formData.techStack.includes(tech);
    if (isSelected) {
      setFormData({
        ...formData,
        techStack: formData.techStack.filter((t) => t !== tech),
      });
    } else {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, tech],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProject(projectId, formData);
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Error updating project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-300">
          Loading project...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-300">
          Project not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Edit Project: {project.title}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Project Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter project title"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Describe your project..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Image
            </label>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 dark:file:bg-gray-800 file:text-gray-700 dark:file:text-gray-300 hover:file:bg-gray-200 dark:hover:file:bg-gray-700"
              />

              {imagePreview && (
                <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Technologies Used
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {AVAILABLE_TECH_STACK.map((tech) => (
                <label
                  key={tech}
                  className={`flex items-center space-x-2 p-3 border rounded-xl cursor-pointer transition-all ${
                    formData.techStack.includes(tech)
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                      : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.techStack.includes(tech)}
                    onChange={() => handleTechStackChange(tech)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      formData.techStack.includes(tech)
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {formData.techStack.includes(tech) && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {tech}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Featured Project Toggle */}
          <div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="featured"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Featured Project
              </label>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Featured projects will appear on the homepage's "Featured Work"
              section
            </p>
          </div>

          {/* Project URLs */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="liveUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Live URL (optional)
              </label>
              <input
                id="liveUrl"
                type="url"
                value={formData.liveUrl || ""}
                onChange={(e) =>
                  setFormData({ ...formData, liveUrl: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label
                htmlFor="githubUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                GitHub URL (optional)
              </label>
              <input
                id="githubUrl"
                type="url"
                value={formData.githubUrl || ""}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          {/* Website Location and Creation Date */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="websiteLocation"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Website Location (optional)
              </label>
              <input
                id="websiteLocation"
                type="text"
                value={formData.websiteLocation || ""}
                onChange={(e) =>
                  setFormData({ ...formData, websiteLocation: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., Deployed on Vercel, AWS, etc."
              />
            </div>

            <div>
              <label
                htmlFor="createdAt"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Creation Date (optional)
              </label>
              <input
                id="createdAt"
                type="date"
                value={
                  formData.createdAt
                    ? typeof formData.createdAt === "string"
                      ? formData.createdAt.split("T")[0]
                      : formData.createdAt.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setFormData({ ...formData, createdAt: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 px-6 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating Project..." : "Update Project"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
