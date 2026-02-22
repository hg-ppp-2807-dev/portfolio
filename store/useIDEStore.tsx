import { create } from "zustand";

interface CommandLog {
    command: string;
    output: string | React.ReactNode;
    type: "input" | "output" | "error" | "system";
}

interface IDEState {
    // Terminal State
    terminalHistory: CommandLog[];
    addTerminalLog: (log: CommandLog) => void;
    clearTerminal: () => void;
}

export const useIDEStore = create<IDEState>((set) => ({
    terminalHistory: [],
    addTerminalLog: (log) =>
        set((state) => ({
            terminalHistory: [...state.terminalHistory, log],
        })),
    clearTerminal: () =>
        set({
            terminalHistory: [],
        }),
}));
