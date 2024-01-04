import { BlockNode, BlockTypeEnum, EdgeMap } from "@/types/node";
import { useEffect, useRef, useState } from "react";
import Drop from "@/components/nodes/Drop";
import Edges from "@/components/edges/Edges";

interface Props {
    data: BlockNode[];
    onPass?: () => void;
}

const Flowchart: React.FC<Props> = ({ data, onPass }) => {
    const blocks = useRef<HTMLDivElement[]>([]);

    const [maxHeight, setMaxHeight] = useState(0);
    const [edges, setEdges] = useState<EdgeMap[]>([]);
    const [answer, setAnswer] = useState<Map<string, boolean>>();

    useEffect(() => {
        if (!data.length) return;

        const maxY = Math.max(...data.map((item) => item.position.y));
        setMaxHeight(maxY * 80 + 80);

        const answer = data.map((item) => [item.id, false] as [string, boolean]);
        setAnswer(new Map(answer));
    }, [data]);

    useEffect(() => {
        const edges: EdgeMap[] = [];

        data.forEach((item) => {
            const from = blocks.current.find((block) => block.id === item.id);
            if (!from) return;

            item.next.forEach((next, i) => {
                const to = blocks.current.find((block) => block.id === next);
                if (!to) return;

                const label = item.type === BlockTypeEnum.DECISION ? (i === 0 ? "ไช่" : "ไม่ใช่") : undefined;

                edges.push({ from, to, label });
            });
        });

        setEdges(edges);
    }, [data]);

    const checkAnswer = () => {
        if (!answer) return;

        const answerArray = Array.from(answer.entries());
        const result = answerArray.every((item) => item[1]);

        if (result) {
            alert("ถูกต้อง");
            onPass?.();
        } else {
            alert("ผิด");
        }
    };

    return (
        <div className=" w-full h-full rounded-lg border-2 border-black relative overflow-scroll hidden-scroll">
            {data.map((item, i) => (
                <Drop ref={(element) => (blocks.current[i] = element!)} data={item} key={item.id} setData={setAnswer} />
            ))}
            <Edges edges={edges} height={maxHeight} />

            <button
                onClick={checkAnswer}
                className=" absolute z-10 right-6 bottom-6 bg-green border-2 border-black p-2 rounded-md"
            >
                ตรวจคำตอบ
            </button>
        </div>
    );
};

export default Flowchart;
