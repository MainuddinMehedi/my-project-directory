import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/service/projects";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "All Projects | Mainuddin",
  description: "A complete list of my open source projects and experiments.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="py-10 min-h-screen">
      <div className="mb-10 space-y-4">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          All Projects
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A collection of {projects.length} repositories including open source
          libraries, experiments, and learning exercises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}
