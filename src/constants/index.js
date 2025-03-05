import {
   javascript,
   typescript,
   html,
   css,
   reactjs,
   tailwind,
   nodejs,
   nextjs,
   mongodb,
   git,
   java,
   expressjs,
   mysql,
   servebridge,
   userAuth,
   userManagement,
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
      name: "Java",
      icon: java,
   },
   {
      name: "Expressjs",
      icon: expressjs,
   },
   {
      name: "MySQL",
      icon: mysql,
   },
   {
      name: "git",
      icon: git,
   },
];

const about = "I’m a Full-Stack Developer passionate about building scalable, user-friendly apps that solve real-world problems. I love clean code and turning ideas into impactful digital experiences. Let’s create something amazing together!";



const projects = [
   {
      name: "ServeBridge",
      description:
         "Built a real-time service booking platform with separate dashboards, dynamic announcements, and real-time updates for improved user experience.",
      tags: [
         {
            name: "typescript",
            color: "blue-text-gradient",
         },
         {
            name: "nextjs",
            color: "green-text-gradient",
         },
         {
            name: "mongodb",
            color: "pink-text-gradient",
         },
      ],
      image: servebridge,
      source_code_link: "https://github.com/Veera5iva/ServeBridge",
   },
   {
      name: "User Authentication",
      description:
         "Built a secure authentication system with JWT, email verification, and efficient user credential management for seamless registration, login, and session handling.",
      tags: [
         {
            name: "typescript",
            color: "blue-text-gradient",
         },
         {
            name: "nextjs",
            color: "green-text-gradient",
         },
         {
            name: "mongodb",
            color: "pink-text-gradient",
         },
      ],
      image: userAuth,
      source_code_link: "https://github.com/Veera5iva/auth-app-nextjs",
   },
   {
      name: "User Management",
      description:
         "Built a user management backend with JWT authentication, error handling, and tested RESTful APIs for registration, login, and account management.",
      tags: [
         {
            name: "expressjs",
            color: "blue-text-gradient",
         },
         {
            name: "mongodb",
            color: "green-text-gradient",
         },
         {
            name: "postman",
            color: "pink-text-gradient",
         },
      ],
      image: userManagement,
      source_code_link: "https://github.com/Veera5iva/user-management-backend",
   },
];

export { technologies, projects, about };