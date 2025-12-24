import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Star, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  repo: {
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    language: string | null;
    updated_at: string;
  };
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <Link
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group transition-all duration-300 hover:-translate-y-1"
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm border-muted/50">
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <CardTitle className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text group-hover:text-primary transition-colors">
              {repo.name}
            </CardTitle>
            <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <CardDescription className="line-clamp-2 min-h-[40px]">
            {repo.description || "No description available"}
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto">
          <div className="flex items-center gap-4 text-sm text-muted-foreground w-full">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary/80" />
                {repo.language}
              </div>
            )}

            <div className="flex items-center gap-1.5 ml-auto">
              <Star className="w-4 h-4 fill-amber-500/20 text-amber-500" />
              {repo.stargazers_count}
            </div>

            <div className="text-xs">
              {new Date(repo.updated_at).toLocaleDateString(undefined, {
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
