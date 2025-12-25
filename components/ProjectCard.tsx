import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Layers } from "lucide-react";
// import Image from "next/image"; // Optional if we use thumbnails

interface Technology {
  _id: string;
  name: string;
  icon?: string;
}

interface ProjectProps {
  project: {
    name: string;
    slug: string;
    description: string;
    thumbnail?: string;
    technologies: Technology[];
    devPhase?: {
      status?: string;
      startDate?: string;
      endDate?: string;
    };
  };
}

export default function ProjectCard({ project }: ProjectProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block h-full group transition-all duration-300 hover:-translate-y-1 outline-none"
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm border-muted/50 overflow-hidden">
        {project.thumbnail && (
          <div className="w-full h-48 bg-muted relative overflow-hidden">
            {/* Placeholder for real Image component if needed */}
            <img
              src={project.thumbnail}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <CardTitle className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text group-hover:text-primary transition-colors">
              {project.name}
            </CardTitle>
            {project.devPhase?.status && (
              <Badge variant="outline" className="text-xs shrink-0">
                {project.devPhase.status}
              </Badge>
            )}
          </div>
          <CardDescription className="line-clamp-2 min-h-[40px]">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto flex-col items-start gap-4">
          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies?.slice(0, 3).map((tech) => (
              <Badge
                key={tech._id}
                variant="secondary"
                className="px-1.5 py-0.5 text-[10px] flex items-center gap-1"
              >
                {tech.icon && (
                  <img src={tech.icon} alt={tech.name} className="w-3 h-3" />
                )}
                {tech.name}
              </Badge>
            ))}
            {project.technologies?.length > 3 && (
              <span className="text-[10px] text-muted-foreground">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground w-full pt-2 border-t border-border/50">
            {project.devPhase?.startDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(project.devPhase.startDate).toLocaleDateString(
                  undefined,
                  {
                    month: "short",
                    year: "numeric",
                  }
                )}
              </div>
            )}

            <div className="flex items-center gap-1.5 ml-auto">
              <Layers className="w-3.5 h-3.5" />
              Case Study
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
