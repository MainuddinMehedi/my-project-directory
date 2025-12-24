import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { getRepos } from "@/lib/github";

export default async function LatestProjects() {
  const repos = await getRepos(12);

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
        {repos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}
