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
      des: "Whether you're a casual listener or a music aficionado, HarmonySound is designed to elevate your listening experience. Join millions of music lovers worldwide and discover why HarmonySound is the ultimate destination for music exploration and enjoyment.",
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
    des: "Explore, rate, and review your favorite anime series and movies with AnimeHub. ",
    detail: {
      title: "AnimeHub",
      des: "Whether you're a seasoned otaku or just beginning your anime journey, discover the best titles and share your thoughts with the community. Dive into a world of ratings, recommendations, and spirited discussions on AnimeRatings—where every anime fan finds their voice.",
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
    des: "Meet our Healthcare Insurance Inquiry Chatbot—a smart, efficient way to get answers to all your insurance-related questions.",
    detail: {
      title: "Healthcare SaaS",
      des: "Meet our Healthcare Insurance Inquiry Chatbot—a smart, efficient way to get answers to all your insurance-related questions. From coverage details to policy options, our chatbot is here 24/7 to provide clear, personalized assistance, ensuring you make informed decisions about your healthcare coverage.",
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
      des: "Whether you need a sleek website, cutting-edge mobile app, or customized software, our expert team delivers tailored technology solutions that drive your business forward. With a passion for innovation and a commitment to excellence, TechCraft Solutions is your trusted partner in navigating the digital landscape.",
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
    des: "This app is your ultimate tool for visual project management.",
    detail: {
      title: "Task Management App",
      des: "Organize tasks, collaborate seamlessly, and track progress effortlessly with our intuitive Kanban board. Whether you're a team of one or many, achieve peak productivity and clarity in your projects with SwiftKanban. Start visualizing your workflow today and experience the power of streamlined project management.",
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
    des: "Welcome to Zwift Tech, where creating your personalized ID card is fast, easy, and professional. ",
    detail: {
      title: "Zwift Tapup",
      des: "Customize your details, choose from sleek templates, and preview your card instantly. Perfect for businesses, schools, events, and more—IDCardMaker helps you make an impression with every ID. Create your identity today, hassle-free.",
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
