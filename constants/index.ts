
import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "@/assets/profile-pictures/user1.jpg";
import user2 from "@/assets/profile-pictures/user2.jpg";
import user3 from "@/assets/profile-pictures/user3.jpg";
import user4 from "@/assets/profile-pictures/user4.jpg";
import user5 from "@/assets/profile-pictures/user5.jpg";
import user6 from "@/assets/profile-pictures/user6.jpg";


export const navItems = [
  { label: "Home", route: "/",  icon: "/assets/icons/home.svg" },
  { label: "About",  route: "/About",  icon: "/assets/icons/home.svg"},
  { label: "Contact", route: "/Contact",  icon: "/assets/icons/home.svg" },
  { label: "Blog", route: "/blog",  icon: "/assets/icons/home.svg" },
  
  
];


export const navLinks = [
    {
      label: "Home",
      route: "/",
      icon: "/assets/icons/home.svg",
    },
    {
      label: "Student Admin",
      route: "/studentadmin",
      icon: "/assets/icons/image.svg",
    },
    {
      label: "Students",
      route: "/studentdetails/readstudents",
      icon: "/assets/icons/image.svg",
    },
    /*{
      label: "Generative Fill",
      route: "/transformations/add/fill",
      icon: "/assets/icons/stars.svg",
    },
    {
      label: "Object Remove",
      route: "/transformations/add/remove",
      icon: "/assets/icons/scan.svg",
    },
    {
      label: "Object Recolor",
      route: "/transformations/add/recolor",
      icon: "/assets/icons/filter.svg",
    },
    {
      label: "Background Remove",
      route: "/transformations/add/removeBackground",
      icon: "/assets/icons/camera.svg",
    },*/
    {
      label: "Profile",
      route: "/profile",
      icon: "/assets/icons/profile.svg",
    },
    {
      label: "Buy Credits",
      route: "/credits",
      icon: "/assets/icons/bag.svg",
    },
  ];
  
  export const plans = [
    {
      _id: 1,
      name: "Free",
      icon: "/assets/icons/free-plan.svg",
      price: 0,
      credits: 20,
      inclusions: [
        {
          label: "20 Free Credits",
          isIncluded: true,
        },
        {
          label: "Basic Access to Services",
          isIncluded: true,
        },
        {
          label: "Priority Customer Support",
          isIncluded: false,
        },
        {
          label: "Priority Updates",
          isIncluded: false,
        },
      ],
    },
    {
      _id: 2,
      name: "Pro Package",
      icon: "/assets/icons/free-plan.svg",
      price: 40,
      credits: 120,
      inclusions: [
        {
          label: "120 Credits",
          isIncluded: true,
        },
        {
          label: "Full Access to Services",
          isIncluded: true,
        },
        {
          label: "Priority Customer Support",
          isIncluded: true,
        },
        {
          label: "Priority Updates",
          isIncluded: false,
        },
      ],
    },
    {
      _id: 3,
      name: "Premium Package",
      icon: "/assets/icons/free-plan.svg",
      price: 199,
      credits: 2000,
      inclusions: [
        {
          label: "2000 Credits",
          isIncluded: true,
        },
        {
          label: "Full Access to Services",
          isIncluded: true,
        },
        {
          label: "Priority Customer Support",
          isIncluded: true,
        },
        {
          label: "Priority Updates",
          isIncluded: true,
        },
      ],
    },
  ];
  
  export const transformationTypes = {
    restore: {
      type: "restore",
      title: "Restore Image",
      subTitle: "Refine images by removing noise and imperfections",
      config: { restore: true },
      icon: "image.svg",
    },
    removeBackground: {
      type: "removeBackground",
      title: "Background Remove",
      subTitle: "Removes the background of the image using AI",
      config: { removeBackground: true },
      icon: "camera.svg",
    },
    fill: {
      type: "fill",
      title: "Generative Fill",
      subTitle: "Enhance an image's dimensions using AI outpainting",
      config: { fillBackground: true },
      icon: "stars.svg",
    },
    remove: {
      type: "remove",
      title: "Object Remove",
      subTitle: "Identify and eliminate objects from images",
      config: {
        remove: { prompt: "", removeShadow: true, multiple: true },
      },
      icon: "scan.svg",
    },
    recolor: {
      type: "recolor",
      title: "Object Recolor",
      subTitle: "Identify and recolor objects from the image",
      config: {
        recolor: { prompt: "", to: "", multiple: true },
      },
      icon: "filter.svg",
    },
  };
  
  export const aspectRatioOptions = {
    "1:1": {
      aspectRatio: "1:1",
      label: "Square (1:1)",
      width: 1000,
      height: 1000,
    },
    "3:4": {
      aspectRatio: "3:4",
      label: "Standard Portrait (3:4)",
      width: 1000,
      height: 1334,
    },
    "9:16": {
      aspectRatio: "9:16",
      label: "Phone Portrait (9:16)",
      width: 1000,
      height: 1778,
    },
  };
  
  export const defaultValues = {
    title: "",
    aspectRatio: "",
    color: "",
    prompt: "",
    publicId: "",
  };
  
  export const creditFee = -1;


  //landing page
  export const testimonials = [
    {
      user: "John Doe",
      company: "Stellar Solutions",
      image: user1,
      text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
    },
    {
      user: "Jane Smith",
      company: "Blue Horizon Technologies",
      image: user2,
      text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
    },
    {
      user: "David Johnson",
      company: "Quantum Innovations",
      image: user3,
      text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
    },
    {
      user: "Ronee Brown",
      company: "Fusion Dynamics",
      image: user4,
      text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
    },
    {
      user: "Michael Wilson",
      company: "Visionary Creations",
      image: user5,
      text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
    },
    {
      user: "Emily Davis",
      company: "Synergy Systems",
      image: user6,
      text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
    },
  ];
  
  
  export const checklistItems = [
    {
      title: "Code merge made easy",
      description:
        "Track the performance of your VR apps and gain insights into user behavior.",
    },
    {
      title: "Review code without worry",
      description:
        "Track the performance of your VR apps and gain insights into user behavior.",
    },
    {
      title: "AI Assistance to reduce time",
      description:
        "Track the performance of your VR apps and gain insights into user behavior.",
    },
    {
      title: "Share work in minutes",
      description:
        "Track the performance of your VR apps and gain insights into user behavior.",
    },
  ];
  
  export const pricingOptions = [
    {
      title: "Free",
      price: "$0",
      features: [
        "Private board sharing",
        "5 Gb Storage",
        "Web Analytics",
        "Private Mode",
      ],
    },
    {
      title: "Pro",
      price: "$10",
      features: [
        "Private board sharing",
        "10 Gb Storage",
        "Web Analytics (Advance)",
        "Private Mode",
      ],
    },
    {
      title: "Enterprise",
      price: "$200",
      features: [
        "Private board sharing",
        "Unlimited Storage",
        "High Performance Network",
        "Private Mode",
      ],
    },
  ];
  
  export const resourcesLinks = [
    { href: "#", text: "Getting Started" },
    { href: "#", text: "Documentation" },
    { href: "#", text: "Tutorials" },
    { href: "#", text: "API Reference" },
    { href: "#", text: "Community Forums" },
  ];
  
  export const platformLinks = [
    { href: "#", text: "Features" },
    { href: "#", text: "Supported Devices" },
    { href: "#", text: "System Requirements" },
    { href: "#", text: "Downloads" },
    { href: "#", text: "Release Notes" },
  ];
  
  export const communityLinks = [
    { href: "#", text: "Events" },
    { href: "#", text: "Meetups" },
    { href: "#", text: "Conferences" },
    { href: "#", text: "Hackathons" },
    { href: "#", text: "Jobs" },
  ];


  export const achievementsList = [
    {
        metric: "Projects",
        value: "100",
        postfix: "+",
    },
    {
        prefix: "~",
        metric: "Users",
        value: "100,000",
    } ,
    {
        metric: "Awards",
        value: "7",
    },
    {
        metric: "Years",
        value: "5",
    }
]

// projects.js or constants.js
export const projects = [
  {
    title: "AI Business Enhancement",
    description: "Leveraged AI to optimize business processes, resulting in a 30% increase in efficiency.",
    features: [
      "Automated workflow",
      "Predictive analytics",
      "AI-driven decision making",
    ],
    //https://pixabay.com/images/search/artificial%20intelligent/
    image: "../assets/images/aiprojects.jpg", // replace with your image path
  },
  {
    title: "Data Science for Decisions",
    description: "Implemented data science models to provide insightful decisions, improving strategic planning.",
    features: [
      "Data visualization",
      "Advanced statistical analysis",
      "Custom dashboards",
    ],
    image: "../assets/images/datascienceproject.jpg", // replace with your image path
  },
  {
    title: "IoT and Mobile Apps",
    description: "Developed IoT solutions and mobile applications to enhance connectivity and user experience.",
    features: [
      "Seamless device integration",
      "Real-time monitoring",
      "User-friendly mobile apps",
    ],
    image: "../assets/images/iot.jpg", // replace with your image path
  },
];


// constants.ts

export const ABOUT_PAGE_CONTENT = {
  title: "About Us",
  introduction: `Welcome to our tech space where passion meets innovation! We're a group of tech enthusiasts dedicated to exploring and sharing the wonders of AI, Data Science, IoT, and Mobile App Development. While we currently operate as a hobbyist group, our commitment to learning and growing in these fields is unwavering.`,
  services: [
    {
      title: "Artificial Intelligence (AI)",
      content: `We dive into the world of AI to uncover how it can enhance business operations, automate tasks, and create smarter solutions. Our projects often explore the latest in machine learning and neural networks.`,
    },
    {
      title: "Data Science",
      content: `Data drives decisions. We use data science to analyze trends, make predictions, and provide insightful recommendations. From data visualization to complex statistical models, we love turning data into actionable insights.`,
    },
    {
      title: "Internet of Things (IoT)",
      content: `Connecting devices and making them smarter is at the heart of IoT. We experiment with IoT to create interconnected systems that can automate and optimize everyday tasks, enhancing both personal and professional environments.`,
    },
    {
      title: "Mobile App Development",
      content: `Mobile apps are revolutionizing the way we interact with technology. We develop intuitive and user-friendly mobile applications that solve problems and improve user experiences.`,
    },
  ],
  mission: `Our mission is simple - to learn, create, and share. We believe in the power of technology to transform lives, and we are committed to using our skills to make a positive impact. Whether it's through innovative AI models, insightful data analysis, smart IoT solutions, or engaging mobile apps, we're here to explore and share our findings with the world.`,
  joinUs: `We're always looking for like-minded enthusiasts who share our passion for technology. If you're interested in AI, Data Science, IoT, or Mobile App Development, we'd love to hear from you. Let's learn and grow together!`,
};

