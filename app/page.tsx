"use client";

import TerminalPane from "./components/TerminalPane";
import { useEffect } from "react";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-[#121212] overflow-hidden">
      {/* 100% Full Screen Terminal */}
      <div className="w-full h-full">
        <TerminalPane />
      </div>
    </main>
  );
}
