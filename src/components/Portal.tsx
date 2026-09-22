import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface PortalProps {
    children: ReactNode;
}

export default function Portal({ children }: PortalProps) {
    const modalRoot = document.getElementById("modal-root");

    if (!modalRoot) {
        return null;
    }

    return createPortal(children, modalRoot);
}