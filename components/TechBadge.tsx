"use client";

import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getProjectsByTech } from "@/service/projects";
import ProjectCard from "./ProjectCard";
// Note: ProjectCard is a server component, but we are using it inside a client component?
// Actually ProjectCard is a client component OR simple enough.
// However, passing server components to client is tricky.
// For this simple case, we will fetch data inside this client component or a server action.

// Better approach: Make this a Client Component that calls a Server Action to get data.

interface TechBadgeProps {
  technology: {
    _id: string;
    name: string;
    icon?: string;
  };
}

export default function TechBadge({ technology }: TechBadgeProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    try {
      // We need to act as a bridge. Importing the server action directly here works in Next.js 14+
      const data = await getProjectsByTech(technology._id);
      setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-secondary/80 transition-colors flex items-center gap-1.5 px-3 py-1"
          onClick={loadProjects}
        >
          {technology.icon && (
            <img
              src={technology.icon}
              alt={technology.name}
              className="w-4 h-4"
            />
          )}
          {technology.name}
        </Badge>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl p-6">
          <DrawerHeader>
            <DrawerTitle className="text-2xl flex items-center gap-2">
              {technology.icon && (
                <img
                  src={technology.icon}
                  alt={technology.name}
                  className="w-8 h-8"
                />
              )}
              Projects using {technology.name}
            </DrawerTitle>
            <DrawerDescription>
              We found {projects.length} projects in your directory built with
              this technology.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 h-[50vh] overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-full text-muted-foreground">
                Loading...
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p) => (
                  // Reusing ProjectCard might need it to be importable here.
                  // If ProjectCard imports "lucide-react" it's fine.
                  <div key={p._id} className="h-64">
                    {/* Simplified Card for Drawer */}
                    <div className="border rounded-lg p-4 h-full flex flex-col bg-card">
                      <h3 className="font-bold text-lg">{p.name}</h3>
                      <div className="text-xs text-muted-foreground mt-1 mb-4">
                        {new Date(p.devPhase?.startDate).getFullYear()}
                      </div>
                      <Button className="mt-auto" variant="outline" asChild>
                        <a href={`/projects/${p.slug}`}>View Case Study</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!loading && projects.length === 0 && (
              <div className="text-center text-muted-foreground">
                No projects found for this tech.
              </div>
            )}
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
