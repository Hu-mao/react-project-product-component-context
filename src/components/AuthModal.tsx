import type { ReactNode } from "react";
import Portal from "./Portal";

interface AuthModalProps {
    children: ReactNode;
    onClose: () => void;
}

export default function AuthModal({
                                      children,
                                      onClose
                                  }: AuthModalProps) {
    return (
        <Portal>
            <div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
                onClick={onClose}
            >
                <div
                    className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-2xl font-bold text-gray-400 hover:text-gray-700"
                    >
                        ×
                    </button>

                    {children}
                </div>
            </div>
        </Portal>
    );
}