import { DragContext } from "@/stores/drag";
import React, { useContext } from "react";
import Block from "./Block/Block";

const Drag = React.forwardRef<HTMLDivElement>((_, ref) => {
    const drag = useContext(DragContext)!;

    if (!drag.data) return null;

    return (
        <div ref={ref} className="pointer-events-none fixed z-10 -translate-x-1/2 -translate-y-1/2">
            <Block data={drag.data} />
        </div>
    );
});

export default Drag;
