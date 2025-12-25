import { getProjectBySlug } from "@/service/projects";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Github,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import TechBadge from "@/components/TechBadge";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article className="min-h-screen py-10">
      {/* Header / Hero */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {project.name}
              </h1>
              {project.devPhase?.status && (
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {project.devPhase.status}
                </Badge>
              )}
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {project.description}
            </p>
          </div>

          <div className="flex gap-3">
            {project.repoLink && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> Repo
                </a>
              </Button>
            )}
            {project.demoLink && (
              <Button size="sm" asChild>
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
        {/* Main Content - Left 2/3 */}
        <div className="lg:col-span-2 space-y-12">
          {/* Gallery / Main Image */}
          {project.thumbnail && (
            <div className="rounded-xl overflow-hidden border border-border shadow-md">
              <img
                src={project.thumbnail}
                alt={project.name}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Overview / Problem Statement (Markdown placeholder) */}
          {(project.overview || project.problemStatement) && (
            <div className="prose dark:prose-invert max-w-none">
              {project.overview && (
                <section>
                  <h2 className="flex items-center gap-2">
                    <Layers className="w-6 h-6 text-primary" />
                    Overview
                  </h2>
                  <div className="whitespace-pre-wrap leading-relaxed opacity-90">
                    {project.overview}
                  </div>
                </section>
              )}

              {/* Challenges Section */}
              {project.challenges?.length > 0 && (
                <section className="mt-12">
                  <h2>Challenges & Solutions</h2>
                  <div className="grid gap-6">
                    {project.challenges.map((challenge: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-card/50 border rounded-lg p-6"
                      >
                        <h3 className="text-lg font-bold mb-2 text-red-400">
                          Problem: {challenge.title}
                        </h3>
                        <p className="mb-4 text-muted-foreground">
                          {challenge.description}
                        </p>
                        <div className="pl-4 border-l-2 border-green-500/50">
                          <h4 className="font-semibold text-green-400 text-sm mb-1">
                            Solution
                          </h4>
                          <p>{challenge.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - Right 1/3 */}
        <div className="space-y-8">
          {/* Tech Stack */}
          <div className="bg-card/30 rounded-xl p-6 border">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech: any) => (
                <TechBadge key={tech._id} technology={tech} />
              ))}
            </div>
          </div>

          {/* Dev Phase Info */}
          <div className="bg-card/30 rounded-xl p-6 border">
            <h3 className="font-semibold mb-4">Development Phase</h3>
            <div className="space-y-3 text-sm">
              {project.devPhase?.startDate && (
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-muted-foreground">Started</span>
                  <span className="font-medium">
                    {new Date(project.devPhase.startDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              {project.devPhase?.endDate && (
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-medium">
                    {new Date(project.devPhase.endDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Config Snippets */}
          {project.relatedConfigs?.length > 0 && (
            <div className="bg-card/30 rounded-xl p-6 border">
              <h3 className="font-semibold mb-4">Saved Configs</h3>
              <div className="space-y-4">
                {project.relatedConfigs.map((config: any, i: number) => (
                  <div key={i}>
                    <div className="text-xs font-medium mb-1 text-muted-foreground">
                      {config.title}
                    </div>
                    <pre className="bg-zinc-950 p-3 rounded-md text-xs overflow-x-auto border border-white/10">
                      <code>{config.codeSnippet}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
