export const GITHUB_USERNAME = "MainuddinMehedi"; // Replace with your GitHub username

export interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

export async function getRepos(limit?: number): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch repos:", res.statusText);
      return [];
    }

    const repos: GithubRepo[] = await res.json();

    // The API sort=updated should handle sorting, but we ensure it here just in case
    const sortedRepos = repos.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

    if (limit) {
      return sortedRepos.slice(0, limit);
    }

    return sortedRepos;
  } catch (error) {
    console.error("Error fetching repos:", error);
    return [];
  }
}
