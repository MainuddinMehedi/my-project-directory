import Link from "next/link";
import ProjectCard from "./ProjectCard";

export default function LatestProjects() {
  return (
    <div>
      <div className="my-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Latest Projects</h2>

        <Link
          href={"/projects"}
          className="text-primary underline underline-offset-3 decoration-stone-400"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {[...Array(5)].map((_, index) => (
          <ProjectCard
            key={index}
            title="Project 1"
            description="Description of Project 1"
            tags={["Tag 1", "Tag 2"]}
          />
        ))}
      </div>
    </div>
  );
}
