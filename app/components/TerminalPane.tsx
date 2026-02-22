"use client";

import { useIDEStore } from "@/store/useIDEStore";
import { useState, useRef, useEffect } from "react";
import { fileSystem } from "@/data/files";
import { ExternalLink, Github, Terminal, Wifi, Battery, Clock } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./ContactForm";

// ─── Sub-components ───────────────────────────────────────────────────────────

const PromptPrefix = () => (
    <span className="mr-2 whitespace-nowrap flex items-center gap-0.5" style={{ fontFamily: "var(--font-terminal)" }}>
        <span className="glow-green" style={{ color: '#00ff88', fontWeight: 700 }}>visitor</span>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>@</span>
        <span className="glow-green" style={{ color: '#00ff88', fontWeight: 700 }}>portfolio</span>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>:</span>
        <span className="glow-purple" style={{ color: '#a855f7', fontWeight: 700 }}>~</span>
        <span style={{ color: 'rgba(255,255,255,0.5)' }}> $ </span>
    </span>
);

const StatusBar = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));
    useEffect(() => {
        const t = setInterval(() => setTime(new Date().toLocaleTimeString('en-US', { hour12: false })), 1000);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="flex items-center gap-3 text-xs" style={{ color: 'rgba(100,220,140,0.6)', fontFamily: "var(--font-terminal)" }}>
            <span className="flex items-center gap-1"><Wifi size={10} /> 100%</span>
            <span className="flex items-center gap-1"><Battery size={10} /> PWR</span>
            <span className="flex items-center gap-1"><Clock size={10} /> {time}</span>
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TerminalPane() {
    const { terminalHistory, addTerminalLog, clearTerminal } = useIDEStore();
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Disable browser scroll-position restoration so the page never jumps on refresh
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [terminalHistory]);

    const handleWrapperClick = () => {
        inputRef.current?.focus();
    };

    const handleCommand = async (cmd: string) => {
        const trimmed = cmd.trim();
        if (!trimmed) return;

        addTerminalLog({ type: "input", command: trimmed, output: "" });
        const args = trimmed.split(" ").filter(Boolean);
        const baseCmd = args[0].toLowerCase();

        switch (baseCmd) {
            case "help":
                addTerminalLog({
                    type: "output", command: "",
                    output: (
                        <div className="neon-card p-4 mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            <div className="text-xs mb-3 flex items-center gap-2" style={{ color: '#00d4ff' }}>
                                <Terminal size={12} />
                                <span className="glow-cyan tracking-widest uppercase">Available Commands</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                {[
                                    { cmd: 'help', desc: 'Display this command reference' },
                                    { cmd: 'about', desc: 'Personal background & philosophy' },
                                    { cmd: 'skills', desc: 'Technical stack & expertise' },
                                    { cmd: 'projects', desc: 'Showcase with live demos & repos' },
                                    { cmd: 'contact', desc: 'Send a message directly' },
                                    { cmd: 'clear', desc: 'Wipe the terminal output' },
                                ].map(({ cmd, desc }) => (
                                    <div key={cmd} className="cmd-row">
                                        <span style={{ color: '#facc15', minWidth: 80, fontWeight: 600 }}>{cmd}</span>
                                        <span style={{ color: 'rgba(156,163,175,0.7)' }}>—</span>
                                        <span style={{ color: '#9ca3af' }}>{desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ),
                });
                break;

            case "clear":
                clearTerminal();
                break;

            case "contact":
                addTerminalLog({
                    type: "output", command: "",
                    output: (
                        <div className="neon-card p-4 mt-1">
                            <ContactForm />
                        </div>
                    ),
                });
                break;

            case "projects":
                try {
                    const projectsData = JSON.parse(fileSystem["/portfolio/projects.json"].content);
                    addTerminalLog({
                        type: "output", command: "",
                        output: (
                            <div className="mt-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(0,212,255,0.5), transparent)' }} />
                                    <span className="text-xs tracking-widest glow-cyan" style={{ color: '#00d4ff' }}>
                                        {projectsData.projects.length} PROJECTS FOUND
                                    </span>
                                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5))' }} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {projectsData.projects.map((proj: any, idx: number) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.08 }}
                                            className="neon-card neon-card-purple p-4 flex flex-col"
                                        >
                                            {/* Card top bar */}
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <div className="text-xs mb-0.5" style={{ color: 'rgba(168,85,247,0.6)', letterSpacing: '0.15em' }}>
                                                        [{String(idx + 1).padStart(2, '0')}]
                                                    </div>
                                                    <h3 className="font-bold" style={{ color: '#fff', fontSize: '0.95rem' }}>{proj.name}</h3>
                                                </div>
                                            </div>
                                            <p className="text-sm mb-3" style={{ color: 'rgba(156,163,175,0.8)', lineHeight: 1.5 }}>{proj.focus}</p>

                                            {/* Stack tags */}
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {proj.stack.map((tech: string, i: number) => (
                                                    <span key={i} className="skill-tag">{tech}</span>
                                                ))}
                                            </div>

                                            {/* Links */}
                                            <div className="mt-auto flex items-center gap-4">
                                                {proj.github && (
                                                    <a href={proj.github} target="_blank" rel="noopener noreferrer"
                                                        className="flex items-center gap-1.5 text-xs transition-all hover:opacity-80"
                                                        style={{ color: 'rgba(156,163,175,0.7)' }}
                                                    >
                                                        <Github size={12} /> GitHub
                                                    </a>
                                                )}
                                                {proj.live_demo && (
                                                    <a href={proj.live_demo} target="_blank" rel="noopener noreferrer"
                                                        className="flex items-center gap-1.5 text-xs glow-cyan transition-all"
                                                        style={{ color: '#00d4ff' }}
                                                    >
                                                        <ExternalLink size={12} /> Live Demo
                                                    </a>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ),
                    });
                } catch {
                    addTerminalLog({ type: "error", command: "", output: "Error parsing project data." });
                }
                break;

            case "about":
                try {
                    const aboutData = JSON.parse(fileSystem["/portfolio/about.json"].content);
                    addTerminalLog({
                        type: "output", command: "",
                        output: (
                            <div className="neon-card mt-2 overflow-hidden" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                {/* Top accent strip */}
                                <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #00ff88, #00d4ff, #a855f7)' }} />
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xs tracking-widest glow-green" style={{ color: '#00ff88' }}>
                                            ■ IDENTITY FILE
                                        </span>
                                        <div className="flex-1 h-px" style={{ background: 'rgba(0,255,136,0.15)' }} />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex gap-3">
                                            <span className="text-xs shrink-0 w-20 pt-0.5" style={{ color: 'rgba(168,85,247,0.8)' }}>TITLE</span>
                                            <span className="text-sm" style={{ color: '#e2e8f0' }}>{aboutData.title}</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="text-xs shrink-0 w-20 pt-0.5" style={{ color: 'rgba(168,85,247,0.8)' }}>MISSION</span>
                                            <span className="text-sm" style={{ color: '#e2e8f0', lineHeight: 1.6 }}>{aboutData.mission}</span>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs tracking-widest glow-cyan" style={{ color: '#00d4ff' }}>◈ CORE PHILOSOPHIES</span>
                                        </div>
                                        <div className="space-y-2">
                                            {aboutData.core_philosophies.map((phil: any, i: number) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -8 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex gap-3 p-2.5 rounded"
                                                    style={{ background: 'rgba(0,255,136,0.03)', border: '1px solid rgba(0,255,136,0.07)' }}
                                                >
                                                    <span className="text-xs shrink-0 mt-0.5" style={{ color: '#00ff88' }}>▸</span>
                                                    <div>
                                                        <span className="text-sm font-semibold" style={{ color: '#fff' }}>{phil.title}</span>
                                                        <span className="text-xs ml-2" style={{ color: 'rgba(156,163,175,0.7)' }}>{phil.description}</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ),
                    });
                } catch {
                    addTerminalLog({ type: "error", command: "", output: "Error parsing about data." });
                }
                break;

            case "skills":
                try {
                    const skillsData = JSON.parse(fileSystem["/portfolio/skills.json"].content);
                    addTerminalLog({
                        type: "output", command: "",
                        output: (
                            <div className="mt-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(0,255,136,0.5), transparent)' }} />
                                    <span className="text-xs tracking-widest glow-green" style={{ color: '#00ff88' }}>TECHNICAL STACK</span>
                                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.5))' }} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {Object.entries(skillsData.stack).map(([cat, skills]: [string, any], idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.07 }}
                                            className="neon-card p-3"
                                        >
                                            <div className="text-xs mb-2.5 tracking-wider font-semibold" style={{ color: '#a855f7' }}>
                                                {cat.replace(/_/g, " ").toUpperCase()}
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {(skills as string[]).map((skill, i) => (
                                                    <span key={i} className="skill-tag">{skill}</span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: 'rgba(52,211,153,0.6)' }}>
                                    <span style={{ color: '#34d399' }}>●</span>
                                    <span className="italic">{skillsData.status}</span>
                                </div>
                            </div>
                        ),
                    });
                } catch {
                    addTerminalLog({ type: "error", command: "", output: "Error parsing skills data." });
                }
                break;

            default:
                addTerminalLog({ type: "error", command: "", output: `Command not found: ${baseCmd}` });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        }
    };

    return (
        <div
            className="term-root h-full w-full flex flex-col shadow-2xl relative crt-lines noise-grain overflow-hidden"
            style={{
                fontFamily: "var(--font-terminal)",
                fontSize: '13px',
                background: '#0a0a0c',
                border: '1px solid rgba(0,255,136,0.12)',
                boxShadow: '0 0 60px rgba(0,255,136,0.05), 0 0 120px rgba(0,0,0,0.8), inset 0 0 60px rgba(0,0,0,0.5)',
            }}
            onClick={handleWrapperClick}
        >
            {/* ── Window Chrome ─────────────────────────────────────────── */}
            <div
                className="flex items-center px-4 py-2.5 shrink-0"
                style={{
                    background: 'rgba(10,10,15,0.95)',
                    borderBottom: '1px solid rgba(0,255,136,0.08)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                {/* Traffic lights */}
                <div className="flex gap-2 items-center">
                    {[
                        { bg: '#ff5f56', shadow: 'rgba(255,95,86,0.6)' },
                        { bg: '#ffbd2e', shadow: 'rgba(255,189,46,0.6)' },
                        { bg: '#27c93f', shadow: 'rgba(39,201,63,0.6)' },
                    ].map((dot, i) => (
                        <div key={i} className="w-3 h-3 rounded-full"
                            style={{ background: dot.bg, boxShadow: `0 0 6px ${dot.shadow}` }}
                        />
                    ))}
                </div>

                {/* Title */}
                <div className="flex-1 flex items-center justify-center gap-2">
                    <Terminal size={11} style={{ color: 'rgba(0,255,136,0.5)' }} />
                    <span className="text-xs tracking-widest select-none" style={{ color: 'rgba(100,220,140,0.5)' }}>
                        pritam — bash — portfolio os v2.0
                    </span>
                </div>

                {/* Status bar */}
                <StatusBar />
            </div>

            {/* ── Profile Header ────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="shrink-0 dot-grid relative"
                style={{
                    borderBottom: '1px solid rgba(0,255,136,0.07)',
                    background: 'rgba(8,8,12,0.8)',
                }}
            >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-3 h-3" style={{ borderTop: '1px solid rgba(0,255,136,0.4)', borderLeft: '1px solid rgba(0,255,136,0.4)' }} />
                <div className="absolute top-0 right-0 w-3 h-3" style={{ borderTop: '1px solid rgba(0,255,136,0.4)', borderRight: '1px solid rgba(0,255,136,0.4)' }} />
                <div className="absolute bottom-0 left-0 w-3 h-3" style={{ borderBottom: '1px solid rgba(0,255,136,0.4)', borderLeft: '1px solid rgba(0,255,136,0.4)' }} />
                <div className="absolute bottom-0 right-0 w-3 h-3" style={{ borderBottom: '1px solid rgba(0,255,136,0.4)', borderRight: '1px solid rgba(0,255,136,0.4)' }} />

                <div className="p-4 md:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 relative z-10">
                    {/* Avatar */}
                    <motion.div
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.96 }}
                        className="relative shrink-0 cursor-pointer"
                    >
                        {/* Spinning dashed ring */}
                        <svg className="avatar-ring-spin absolute -inset-2" width="112" height="112" viewBox="0 0 112 112" style={{ top: '-8px', left: '-8px' }}>
                            <circle cx="56" cy="56" r="52" fill="none" stroke="rgba(0,255,136,0.25)" strokeWidth="1" strokeDasharray="6 4" />
                        </svg>
                        {/* Glow backdrop */}
                        <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.15) 0%, transparent 70%)', filter: 'blur(8px)' }} />
                        {/* Avatar image */}
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden"
                            style={{ border: '2px solid rgba(0,255,136,0.35)', boxShadow: '0 0 20px rgba(0,255,136,0.2), inset 0 0 20px rgba(0,0,0,0.5)' }}>
                            <motion.div
                                animate={{ rotateY: [0, 25, 0, -25, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="w-full h-full relative"
                            >
                                <Image src="/robot-avatar.png" alt="3D Robot Avatar" fill className="object-cover" priority />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Info */}
                    <div className="text-center sm:text-left flex flex-col gap-1.5">
                        <motion.div
                            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <span className="font-black tracking-[0.15em] text-2xl md:text-3xl"
                                style={{ color: '#00ff88', fontFamily: "var(--font-display)" }}>
                                PRITAM PRIYABRATA PALAI
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex items-center gap-2"
                        >
                            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: '#00ff88', boxShadow: '0 0 6px #00ff88' }} />
                            <span className="text-sm md:text-base tracking-widest" style={{ color: '#a855f7' }}>
                                AI ENGINEER & BACKEND DEVELOPER
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
                            className="text-xs leading-relaxed"
                            style={{ color: 'rgba(156,163,175,0.75)' }}
                        >
                            Building scalable backend architectures, RAG systems, and AI agent workflows.
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
                            className="flex flex-wrap gap-1.5 mt-0.5"
                        >
                            {['Python', 'LangChain', 'LangGraph', 'Go', 'Docker', 'Next.js'].map((tech, i) => (
                                <span key={i} className="skill-tag text-xs">{tech}</span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* ── Terminal Body ─────────────────────────────────────────── */}
            <div className="flex-1 relative overflow-hidden min-h-0" style={{ background: '#080810' }}>
                {/* Radial glow */}
                <div className="absolute inset-0 pointer-events-none z-0"
                    style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,255,136,0.04) 0%, transparent 70%)', animation: 'glow-pulse 4s ease-in-out infinite' }}
                />
                {/* Scanline sweep */}
                <div className="scanline-sweep" />

                {/* Content */}
                <div ref={scrollContainerRef} className="absolute inset-0 p-4 md:p-5 overflow-y-auto term-scroll z-10 flex flex-col">

                    {/* Welcome message */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }}
                        className="mb-5 text-sm"
                        style={{ color: 'rgba(156,163,175,0.7)' }}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(0,255,136,0.3), transparent)' }} />
                        </div>
                        <span>Portfolio OS </span>
                        <span style={{ color: '#00ff88' }}>v2.0</span>
                        <span> initialized. Type </span>
                        <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'rgba(250,204,21,0.1)', color: '#facc15', border: '1px solid rgba(250,204,21,0.2)' }}>help</span>
                        <span> to begin.</span>
                    </motion.div>

                    {/* History */}
                    <AnimatePresence initial={false}>
                        {terminalHistory.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -8, scale: 0.99 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 0.25 }}
                                className="mb-2"
                            >
                                {log.type === "input" && (
                                    <div className="flex items-center flex-wrap" style={{ color: '#e2e8f0' }}>
                                        <PromptPrefix />
                                        <span style={{ color: '#fff', fontWeight: 500 }}>{log.command}</span>
                                    </div>
                                )}
                                {log.type === "output" && <div className="mt-1">{log.output}</div>}
                                {log.type === "system" && (
                                    <div className="text-xs italic" style={{ color: 'rgba(156,163,175,0.5)' }}>{log.output}</div>
                                )}
                                {log.type === "error" && (
                                    <div className="flex items-center gap-2 mt-1 text-sm" style={{ color: '#f87171' }}>
                                        <span style={{ color: 'rgba(248,113,113,0.6)' }}>✗</span>
                                        <span>bash:</span>
                                        <span>{log.output}</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Active input line */}
                    <div className="flex items-center mt-2 w-full">
                        <PromptPrefix />
                        <div className="flex-1 relative flex items-center">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-transparent border-none outline-none font-medium min-w-0"
                                style={{ color: '#fff', caretColor: 'transparent', fontFamily: "var(--font-terminal)", fontSize: '16px' }}
                                spellCheck={false}
                                autoComplete="off"
                                autoFocus
                            />
                            {/* Custom blinking cursor */}
                            <span className="cursor-block" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}