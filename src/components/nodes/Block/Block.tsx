import { BlockNode, BlockTypeEnum } from "@/types/node";

import Start from "./Start";
import End from "./End";
import Process from "./Process";
import Join from "./Join";
import React from "react";
import Decision from "./Decision";

interface Props {
    data: BlockNode;
}

const Block: React.FC<Props> = ({ data }) => {
    switch (data.type) {
        case BlockTypeEnum.START:
            return <Start data={data} />;
        case BlockTypeEnum.END:
            return <End data={data} />;
        case BlockTypeEnum.PROCESS:
            return <Process data={data} />;
        case BlockTypeEnum.JOIN:
            return <Join data={data} />;
        case BlockTypeEnum.DECISION:
            return <Decision data={data} />;
        default:
            return null;
    }
};

export default Block;
