import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Your Portfolio",
  description: "Explore my projects and technical work",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
