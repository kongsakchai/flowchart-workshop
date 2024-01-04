import { BlockNode, BlockTypeEnum } from "@/types/node";
import React, { useContext, useEffect, useState } from "react";
import Block from "@/components/nodes/Block/Block";
import { DragContext } from "@/stores/drag";

interface Props {
    data: BlockNode[];
}

const SideSlot: React.FC<Props> = ({ data }) => {
    const drag = useContext(DragContext)!;
    const [slot, setSlot] = useState<BlockNode[]>([]);

    const handleDrag = (block: BlockNode) => {
        drag.setData(block);
    };

    useEffect(() => {
        let join = false;
        const temp = [...data];
        const randomSlot: BlockNode[] = [];

        while (temp.length > 0) {
            const index = Math.floor(Math.random() * temp.length);
            const item = temp.splice(index, 1)[0];
            
            if (join && item.type === BlockTypeEnum.JOIN) continue;
            if (item.type === BlockTypeEnum.JOIN) join = true;

            randomSlot.push(item);
        }

        setSlot(randomSlot);
    }, [data]);

    return (
        <div className=" w-[200px] h-full flex items-center flex-col p-8 gap-4">
            {slot.map((item) => (
                <div key={item.id} onPointerDown={() => handleDrag(item)}>
                    <Block data={item} />
                </div>
            ))}
        </div>
    );
};

export default SideSlot;
