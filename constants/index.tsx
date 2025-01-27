import { BiLogoPostgresql } from "react-icons/bi";
import { DiMongodb } from "react-icons/di";
import { FaCss3Alt, FaHtml5, FaNode, FaStripe } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { RiSupabaseFill, RiReactjsFill } from "react-icons/ri";
import {
  SiClerk,
  SiKeystone,
  SiNextdotjs,
  SiOpenai,
  SiShadcnui,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
export const projects = [
  {
    title: "Spotify Clone",
    topic: "Next Js",
    img: "images/spotify.png",
    des: "Discover the next evolution in music streaming. Your all-in-one destination for endless tunes and immersive audio. ",
    detail: {
      title: "Spotify Clone",
      des: "A fully responsive Spotify-inspired music streaming application built to showcase my front-end development skills. This project features a sleek user interface, music playback functionality, playlist creation, and a dynamic search system. It demonstrates proficiency in modern web technologies, including React, Tailwind CSS, and API integration.",
      tech: [
        <RiSupabaseFill />,
        <SiNextdotjs />,
        <RiReactjsFill />,
        <IoLogoJavascript />,
        <FaCss3Alt />,
        <FaHtml5 />,
      ],
    },
    links: {
      live: "",
      github: "",
    },
  },
  {
    title: "AnimeHub",
    topic: "React",
    img: "images/anime.png",
    des: "A sleek web platform for anime fans to explore, search, and discover shows. Built with React, Tailwind CSS, and API integration, showcasing my skills in modern web development.",
    detail: {
      title: "AnimeHub",
      des: "A dynamic web platform designed for anime enthusiasts to explore, search, and discover their favorite shows. This project features an intuitive UI with categorized anime listings, detailed show information, and a responsive design. Built using React, Tailwind CSS, and third-party API integration, it highlights my skills in building engaging and user-friendly applications.",
      tech: [
        <FaNode />,
        <SiNextdotjs />,
        <RiReactjsFill />,
        <IoLogoJavascript />,
        <FaCss3Alt />,
        <FaHtml5 />,
      ],
    },
    links: {
      live: "",
      github: "",
    },
  },
  {
    title: "Healthcare SaaS",
    topic: "Next Js",
    img: "images/chatbot.png",
    des: "An AI-powered chatbot designed to assist users with healthcare insurance queries. Built with natural language processing and responsive design, it streamlines information retrieval and enhances user experience.",
    detail: {
      title: "Healthcare SaaS",
      des: "A smart virtual assistant designed to make navigating healthcare insurance effortless. Equipped with AI-driven natural language processing, it provides instant answers, personalized plan suggestions, and real-time support through an intuitive and user-friendly interface.",
      tech: [
        <FaNode />,
        <SiNextdotjs />,
        <RiReactjsFill />,
        <IoLogoJavascript />,
        <FaCss3Alt />,
        <FaHtml5 />,
        <SiOpenai />,
        <SiKeystone />,
      ],
    },
    links: {
      live: "",
      github: "",
    },
  },
  {
    title: "Codebility",
    topic: "Next Js",
    img: "images/codebImg.jpg",
    des: "At Codebility, we specialize in transforming your ideas into robust digital solutions.",
    detail: {
      title: "Codebility",
      des: "Whether you need a sleek website, cutting-edge mobile app, or customized software, our expert team delivers tailored technology solutions that drive your business forward. With a passion for innovation and a commitment to excellence, Codebility is your trusted partner in navigating the digital landscape.",
      tech: [
        <FaNode />,
        <SiNextdotjs />,
        <RiReactjsFill />,
        <IoLogoJavascript />,
        <FaCss3Alt />,
        <FaHtml5 />,
        <SiShadcnui />,
      ],
    },
    links: {
      live: "",
      github: "",
    },
  },
  {
    title: "Task Management App",
    topic: "Next Js",
    img: "images/taskify.png",
    des: "A sleek Kanban-style app for organizing tasks with drag-and-drop boards, progress tracking, and a modern UI. Built with React and Tailwind CSS.",
    detail: {
      title: "Task Management App",
      des: "A modern task management application inspired by the Kanban methodology, designed to streamline workflow and boost productivity. Featuring intuitive drag-and-drop functionality, customizable boards, and progress tracking, it provides an efficient way to organize tasks. Built with React, Tailwind CSS, and state management tools for a seamless user experience.",
      tech: [
        <FaNode />,
        <SiNextdotjs />,
        <RiReactjsFill />,
        <BiLogoPostgresql />,
        <SiClerk />,
        <SiShadcnui />,
        <FaStripe />,
      ],
    },
    links: {
      live: "",
      github: "",
    },
  },
  {
    title: "Zwift Tapup",
    topic: "Next Js",
    img: "images/zwifttech.jpg",
    des: "A unique portfolio creation platform built with Next.js and Firebase, where users can design, edit, and manage portfolio cards. Each card represents a personal collection that can be bought, sold, and traded, creating a dynamic marketplace experience.",
    detail: {
      title: "Zwift Tapup",
      des: "Zwift Tapup is an innovative platform that allows users to create, customize, and manage portfolio cards, with each card representing a unique personal collection. Built with Next.js and Firebase, the app provides a seamless and interactive experience for users to design their portfolios with ease. The platform features a marketplace where users can buy, sell, and trade portfolio cards, adding a dynamic layer to portfolio management. It combines modern web technologies to offer a fluid and engaging experience for portfolio enthusiasts and traders alike.",
      tech: [
        <FaNode />,
        <SiNextdotjs />,
        <RiReactjsFill />,
        <DiMongodb />,
        <SiShadcnui />,
        <TbBrandFramerMotion />,
      ],
    },
    links: {
      live: "",
      github: "",
    },
  },
];
