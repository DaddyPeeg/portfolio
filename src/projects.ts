// I didnt sort the projects array. C.P. should always be the first category
import {
  reactAdminImg,
  animeImg,
  codebilityImg,
  messengerImg,
  pathfindingImg,
  taskmanagerImg,
  threadsImg,
} from "./components/Slider/images";

export type Project = {
  category: "C.P." | "W.I.P.";
  name: string;
  title: string;
  image?: string;
  definition: string;
  live?: boolean;
  url?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    category: "C.P.",
    name: "Anime Vault",
    title: "Anime Vault",
    image: animeImg,
    definition: "Anime catalog with infinite scroll and dynamic loading.",
    live: true,
    url: "https://anime-vault-lyart.vercel.app/",
    githubUrl: "https://github.com/DaddyPeeg/anime_vault",
  },
  {
    category: "C.P.",
    name: "Messenger Clone",
    title: "Messenger Clone",
    image: messengerImg,
    definition: "A real time chat app.",
    live: true,
    url: "https://messenger-clone-swart.vercel.app/",
    githubUrl: "https://github.com/DaddyPeeg/messenger-clone",
  },
  {
    category: "C.P.",
    name: "Kanban App",
    title: "Kanban App",
    image: taskmanagerImg,
    definition: "SaaS Kanban board.",
    live: true,
    url: "https://task-management-kanban.vercel.app/",
    githubUrl: "https://github.com/DaddyPeeg/task-management-kanban",
  },
  {
    category: "W.I.P.",
    name: "Image Gallery",
    title: "Image Gallery",
    // image: "image url",
    definition:
      "A simple image gallery utilizing image optimization using cloudinary.",
    live: false,
    // url: "",
    githubUrl: "https://github.com/DaddyPeeg/image-gallery-church",
  },
  {
    category: "C.P.",
    name: "Pathfinding Visualization",
    title: "Pathfinding Visualization",
    image: pathfindingImg,
    definition: "ReactJS graph pathfinding algorithms visualizer.",
    live: true,
    url: "https://daddypeeg.github.io/pathfinding/",
    githubUrl: "https://github.com/DaddyPeeg/pathfinding",
  },
  {
    category: "W.I.P.",
    name: "Discord Clone",
    title: "Discord Clone",
    // image: "image url",
    definition: "A discord clone, with realtime messaging and video chat.",
    githubUrl: "https://github.com/DaddyPeeg/discord-clone",
  },
  {
    category: "C.P.",
    name: "React Admin",
    title: "React Admin",
    image: reactAdminImg,
    definition: "Reusable components and Admin Template.",
    live: true,
    url: "https://daddypeeg.github.io/react-admin-temp/",
    githubUrl: "https://github.com/DaddyPeeg/react-admin-temp",
  },
  {
    category: "C.P.",
    name: "Threads",
    title: "Threads",
    image: threadsImg,
    definition:
      "A social app where users can create threads and discuss topics.",
    live: true,
    url: "https://threads-sample-app.vercel.app/",
    githubUrl: "https://github.com/DaddyPeeg/threads-app",
  },
  {
    category: "W.I.P.",
    name: "Codebility",
    title: "Codebility",
    image: codebilityImg,
    definition: "A employee and cliet management platform.",
    live: true,
    url: "https://codebility-fe.vercel.app/",
    githubUrl: " https://github.com/Zeff01/codebility-fe/tree/main",
  },
];
