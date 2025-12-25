import { NextResponse } from "next/server";
import { dbConnect } from "@/service/mongo";
import { Project } from "@/models/project-model";
import { Technology } from "@/models/technology-model";
import { Tag } from "@/models/tag-model";

const technologies = [
  {
    name: "Next.js",
    slug: "next-js",
    category: "Framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "React",
    slug: "react",
    category: "Library",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Tailwind CSS",
    slug: "tailwind-css",
    category: "Tool",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "MongoDB",
    slug: "mongodb",
    category: "Database",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "TypeScript",
    slug: "typescript",
    category: "Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
];

const tags = [
  { name: "E-commerce", slug: "e-commerce" },
  { name: "SaaS", slug: "saas" },
  { name: "Open Source", slug: "open-source" },
  { name: "Dark Mode", slug: "dark-mode" },
];

export async function GET() {
  try {
    await dbConnect();

    // Clear existing data
    await Project.deleteMany({});
    await Technology.deleteMany({});
    await Tag.deleteMany({});

    // Insert Tech & Tags
    const createdTechs = await Technology.insertMany(technologies);
    const createdTags = await Tag.insertMany(tags);

    const techMap = createdTechs.reduce((acc: any, tech: any) => {
      acc[tech.slug] = tech._id;
      return acc;
    }, {});

    const tagMap = createdTags.reduce((acc: any, tag: any) => {
      acc[tag.slug] = tag._id;
      return acc;
    }, {});

    // Insert Projects
    const projects = [
      {
        name: "DevDirectory",
        slug: "dev-directory",
        description:
          "A comprehensive directory for developers to showcase their projects with detailed case studies.",
        thumbnail:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
        repoLink: "https://github.com/MainuddinMehedi/dev-directory",
        technologies: [
          techMap["next-js"],
          techMap["typescript"],
          techMap["mongodb"],
          techMap["tailwind-css"],
        ],
        tags: [tagMap["open-source"], tagMap["saas"]],
        devPhase: {
          startDate: new Date("2023-11-01"),
          endDate: new Date("2023-12-25"),
          status: "Completed",
        },
        overview:
          "## Introduction\nDevDirectory is built to solve the fragmentation of developer portfolios...",
        challenges: [
          {
            title: "Database Schema Design",
            description:
              "Designing a schema that works for both simple and complex projects was tricky.",
            solution:
              "Used a flexible Mongoose schema where most case-study fields are optional.",
          },
        ],
        relatedConfigs: [
          {
            title: "Next.js Config",
            codeSnippet: "module.exports = { reactStrictMode: true }",
            language: "javascript",
          },
        ],
        gallery: [
          {
            url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
            caption: "Initial Sketch",
          },
          {
            url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
            caption: "Dashboard UI",
          },
        ],
      },
      {
        name: "ShopFlow",
        slug: "shop-flow",
        description:
          "A minimal e-commerce starter kit using React and Tailwind.",
        thumbnail:
          "https://images.unsplash.com/photo-1472851294608-415105094f72?q=80&w=1000&auto=format&fit=crop",
        technologies: [techMap["react"], techMap["tailwind-css"]],
        tags: [tagMap["e-commerce"]],
        devPhase: {
          startDate: new Date("2024-01-10"),
          status: "In Progress",
        },
      },
      {
        name: "CodeSnippet CLI",
        slug: "codesnippet-cli",
        description: "A terminal tool to manage code snippets.",
        technologies: [techMap["typescript"]],
        devPhase: {
          startDate: new Date("2023-05-01"),
          endDate: new Date("2023-05-10"),
          status: "Completed",
        },
      },
    ];

    await Project.insertMany(projects);
    return NextResponse.json({ message: "Database seeded successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to seed DB" }, { status: 500 });
  }
}
