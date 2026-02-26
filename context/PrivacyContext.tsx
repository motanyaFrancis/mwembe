"use client";

import { createContext, useContext, useState } from "react";
import PrivacyOverlay from "@/components/PrivacyOverlay";


type PrivacyContextType = {
    open: () => void;
    close: () => void;
};

const PrivacyContext = createContext<PrivacyContextType | null>(null);

export function PrivacyProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <PrivacyContext.Provider value={{ open, close }}>
            {children}
            <PrivacyOverlay isOpen={isOpen} onClose={close} />
        </PrivacyContext.Provider>
    );
}

export function usePrivacy() {
    const context = useContext(PrivacyContext);
    if (!context) {
        throw new Error("usePrivacy must be used inside PrivacyProvider");
    }
    return context;
}

