
export const portfolioData = {
    personal: {
        name: "Pritam Priyabrata Palai",
        title: "AI Engineer & Backend Developer",
        email: "palaipritam62@gmail.com",
        linkedin: "https://www.linkedin.com/in/pritampalai", // Placeholder inferred
        github: "",
        twitter: "https://twitter.com/pritampalai28",
        location: "Bengaluru, India",
        resumeUrl: "/Pritam_Resume.pdf",
        shortBio: "Results-driven computer science student with strong foundations in building RAG systems, LLM integration, and scalable backend architectures. Passionate about AI engineering, big data, and creating robust, high-performance applications."
    },
    skills: [
        { name: "Python", icon: "python" },
        { name: "SQL", icon: "database" },
        { name: "LangChain", icon: "langchain" },
        { name: "LangGraph", icon: "langgraph" },
        { name: "Hugging Face", icon: "huggingface" },
        { name: "Docker", icon: "docker" },
        { name: "Go", icon: "go" },
        { name: "Java", icon: "java" },
        { name: "RAG", icon: "rag" },
        { name: "LLMs", icon: "llm" },
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "next" }
    ],
    projects: [
        {
            title: "Volunteer Connect",
            description: "A Django-based volunteer engagement platform featuring event scheduling, geolocation-based recommendations using Google Maps API, and dynamic certificate generation.",
            techStack: ["Django", "Python", "Google Maps API", "PostgreSQL"],
            link: "#",
            github: "https://github.com/pritampalai28/volunteer-connect", // Placeholder
            image: "/projects/volunteer.jpg"
        },
        {
            title: "Mobile WebRTC Module",
            description: "Real-time audio/video communication module for mobile apps using WebRTC and Socket.io, featuring seamless connection handling and STUN/TURN server configuration.",
            techStack: ["React Native", "WebRTC", "Socket.io", "Firebase"],
            link: "#",
            github: "https://github.com/pritampalai28/webrtc-module", // Placeholder
            image: "/projects/webrtc.jpg"
        },
        {
            title: "3D Portfolio",
            description: "An immersive 3D portfolio website built with Next.js, Three.js, and Framer Motion, featuring interactive 3D elements and smooth page transitions.",
            techStack: ["Next.js", "Three.js", "React Three Fiber", "Tailwind CSS"],
            link: "#",
            github: "https://github.com/pritampalai28/portfolio",
            image: "/projects/portfolio.jpg"
        },
        {
            title: "AI Chat Assistant",
            description: "A specialized AI chat interface integrating modern LLMs for code assistance and general queries.",
            techStack: ["React", "OpenAI API", "Node.js"],
            link: "#",
            github: "#",
            image: "/projects/ai-chat.jpg"
        }
    ]
};
