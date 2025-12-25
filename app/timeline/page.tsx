import { getAllProjects } from "@/service/projects";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectCard from "@/components/ProjectCard"; // Or a specialized TimelineItem

// Helper to group by year
function groupProjectsByYear(projects: any[]) {
  const groups: Record<string, any[]> = {};
  projects.forEach((p) => {
    if (!p.devPhase?.startDate) return;
    const year = new Date(p.devPhase.startDate).getFullYear().toString();
    if (!groups[year]) groups[year] = [];
    groups[year].push(p);
  });
  return groups;
}

export const metadata = {
  title: "Development Timeline | Mainuddin",
  description: "A chronological view of my development journey.",
};

export default async function TimelinePage() {
  const projects = await getAllProjects();
  const grouped = groupProjectsByYear(projects);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

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
          Dev Log Timeline
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A chronological journey through my projects and learning phases.
        </p>
      </div>

      <div className="relative border-l-2 border-border ml-4 md:ml-10 space-y-16">
        {years.map((year) => (
          <div key={year} className="relative pl-8 md:pl-12">
            {/* Year Marker */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
            <h2 className="text-3xl font-bold mb-8 text-primary/80">{year}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {grouped[year].map((project) => (
                <div key={project._id} className="relative">
                  <div className="text-sm text-muted-foreground mb-2 font-mono">
                    {new Date(project.devPhase.startDate).toLocaleDateString(
                      undefined,
                      { month: "short", day: "numeric" }
                    )}
                    {project.devPhase.endDate &&
                      ` - ${new Date(
                        project.devPhase.endDate
                      ).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}`}
                  </div>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
