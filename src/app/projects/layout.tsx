import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Timothy Timbol",
  description: "A collection of web and mobile projects built by Timothy Timbol.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
