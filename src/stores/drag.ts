import { BlockNode } from "@/types/node";
import { createContext } from "react";

interface DragContext {
    data: BlockNode | null;
    setData: (data: BlockNode | null) => void;
}

export const DragContext = createContext<DragContext | null>(null);
