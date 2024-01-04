import { DragContext } from "@/stores/drag";
import { BlockNode, BlockTypeEnum } from "@/types/node";
import React, { useContext, useState } from "react";
import Block from "./Block/Block";

type SetData = React.Dispatch<React.SetStateAction<Map<string, boolean> | undefined>>;

interface Props {
    data: BlockNode | null;
    setData?: SetData;
}

const Drop = React.forwardRef<HTMLDivElement, Props>(({ data, setData }, ref) => {
    const drag = useContext(DragContext)!;

    const [drop, setDrop] = useState<BlockNode | null>(null);

    const x = (data?.position.x || 0) * 100;
    const y = (data?.position.y || 0) * 80 + 40;

    const activeClass = drop ? "" : "w-[100px] h-[40px] border-2 bg-white";

    const handleDrop = (e: React.PointerEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (drag && drag.data) {
            setDrop(drag.data);
            drag.setData(null);
            document.body.style.cursor = "default";

            const join = drag.data.type === BlockTypeEnum.JOIN && data?.type === BlockTypeEnum.JOIN;
            const answer = drag.data?.id === data?.id || join;

            setData?.((prev) => {
                if (!prev) return;
                const next = new Map(prev);
                next.set(data!.id, answer);
                
                return next;
            });
        }
    };

    return (
        <div
            id={data?.id}
            ref={ref}
            className={`${activeClass} border-black border-dashed absolute -translate-x-1/2 -translate-y-1/2 `}
            style={{ top: `${y}px`, left: `calc(50% + ${x}px)` }}
            onPointerUp={handleDrop}
        >
            {drop && <Block data={drop} />}
        </div>
    );
});

export default Drop;
