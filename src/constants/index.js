import {
   javascript,
   typescript,
   html,
   css,
   reactjs,
   redux,
   tailwind,
   nodejs,
   nextjs,
   mongodb,
   git,
   figma,
   docker,
   carrent,
   jobit,
   tripguide,
   threejs,
} from "../assets";


const technologies = [
   {
      name: "HTML 5",
      icon: html,
   },
   {
      name: "CSS 3",
      icon: css,
   },
   {
      name: "JavaScript",
      icon: javascript,
   },
   {
      name: "TypeScript",
      icon: typescript,
   },
   {
      name: "React JS",
      icon: reactjs,
   },
   {
      name: "Redux Toolkit",
      icon: redux,
   },
   {
      name: "Tailwind CSS",
      icon: tailwind,
   },
   {
      name: "Node JS",
      icon: nodejs,
   },
   {
      name: "MongoDB",
      icon: mongodb,
   },
   {
      name: "Next JS",
      icon: nextjs,
   },
   {
      name: "Three JS",
      icon: threejs,
   },
   {
      name: "git",
      icon: git,
   },
   {
      name: "figma",
      icon: figma,
   },
   {
      name: "docker",
      icon: docker,
   },
];

const about = "I’m a Full-Stack Developer passionate about building scalable, user-friendly apps that solve real-world problems. I love clean code and turning ideas into impactful digital experiences. Let’s create something amazing together!";



const projects = [
   {
      name: "Car Rent",
      description:
         "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
      tags: [
         {
            name: "react",
            color: "blue-text-gradient",
         },
         {
            name: "mongodb",
            color: "green-text-gradient",
         },
         {
            name: "tailwind",
            color: "pink-text-gradient",
         },
      ],
      image: carrent,
      source_code_link: "https://github.com/",
   },
   {
      name: "Job IT",
      description:
         "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
      tags: [
         {
            name: "react",
            color: "blue-text-gradient",
         },
         {
            name: "restapi",
            color: "green-text-gradient",
         },
         {
            name: "scss",
            color: "pink-text-gradient",
         },
      ],
      image: jobit,
      source_code_link: "https://github.com/",
   },
   {
      name: "Trip Guide",
      description:
         "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
      tags: [
         {
            name: "nextjs",
            color: "blue-text-gradient",
         },
         {
            name: "supabase",
            color: "green-text-gradient",
         },
         {
            name: "css",
            color: "pink-text-gradient",
         },
      ],
      image: tripguide,
      source_code_link: "https://github.com/",
   },
];

export { technologies, projects, about };