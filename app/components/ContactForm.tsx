"use client";

import { useState } from "react";
import { useIDEStore } from "@/store/useIDEStore";
import { ExternalLink } from "lucide-react";
import { event } from "@/lib/gtag";

export default function ContactForm() {
    const { addTerminalLog } = useIDEStore();
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleConnect = async (e: React.MouseEvent) => {
        e.preventDefault();

        setStatus("loading");

        // WhatsApp Phone Number (include country code without + or 00, e.g., 91 for India)
        const waNumber = "919337492146"; // Actual phone number

        // Format a default greeting message
        const waMessage = `Hi Pritam! I explored your Portfolio OS and would love to connect.`;

        // Create the WhatsApp API link
        const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

        // Open WhatsApp in a new tab
        window.open(waLink, '_blank');

        setStatus("success");

        // Add a terminal log of the sequence
        addTerminalLog({
            type: "system",
            command: "",
            output: (
                <div className="text-green-500 mt-2">
                    [REDIRECT] Establishing secure WhatsApp connection...
                </div>
            )
        });
    };

    if (status === "success") {
        return (
            <div className="mt-4 bg-[#1a1a1a] border border-[#333] rounded-md p-5 max-w-2xl text-center">
                <div className="text-green-400 font-bold mb-2 flex items-center justify-center gap-2"><span>💬</span> WHATSAPP OPENED</div>
                <div className="text-gray-400 text-sm">You have been redirected to WhatsApp to send your message securely.</div>
            </div>
        );
    }

    return (
        <div className="mt-4 bg-[#1a1a1a] border border-[#333] rounded-md p-5 max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-yellow-400 font-bold border-b border-[#333] pb-3 mb-4 flex items-center gap-2">
                <span>📞</span> INITIATING CONTACT SEQUENCE...
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Email</div>
                    <a href="mailto:palaipritam62@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">palaipritam62@gmail.com</a>
                </div>
                <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Location</div>
                    <div className="text-gray-300">Bengaluru, India</div>
                </div>
                <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">LinkedIn</div>
                    <a href="https://www.linkedin.com/in/pritam-priyabrata-palai-591664280/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                        linkedin.com/in/pritam-priyabrata-palai-591664280/ <ExternalLink size={12} />
                    </a>
                </div>
                <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">GitHub</div>
                    <a
                        href="https://github.com/hg-ppp-2807-dev"
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:text-gray-300 transition-colors flex items-center gap-1"
                        onClick={() =>
                            event({
                                action: "github_click",
                                category: "portfolio",
                                label: "github_profile",
                            })
                        }
                    >
                        github.com/hg-ppp-2807-dev <ExternalLink size={12} />
                    </a>
                </div>
            </div>

            <div className="border-t border-[#333] pt-4">
                <button
                    onClick={handleConnect}
                    className="w-full bg-green-600 hover:bg-green-500 flex items-center justify-center gap-2 text-white font-bold py-3 px-4 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={status === "loading"}
                >
                    {status === "loading" ? "CONNECTING..." : "CONNECT VIA WHATSAPP"} <ExternalLink size={16} />
                </button>
            </div>

            <div className="mt-4 pt-4 border-t border-[#333] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-green-400 text-sm font-semibold tracking-wide">STATUS: OPEN FOR NEW PROJECTS</span>
            </div>
        </div>
    );
}
