import { EdgeMap } from "@/types/node";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
    edges: EdgeMap[];
    height: number;
}

const Edges: React.FC<Props> = ({ edges, height }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [path, setPath] = useState<JSX.Element[]>([]);

    const draw = useCallback(() => {
        const path = edges.map((edge) => {
            const fromX = edge.from.offsetLeft;
            const fromY = edge.from.offsetTop;

            let toX = edge.to.offsetLeft;
            let toY = edge.to.offsetTop;

            let textX = (fromX + toX) / 2;
            let textY = (fromY + toY) / 2;

            if (toX === fromX) textX += 10;
            if (toY === fromY) textY += 10;

            const center = svgRef.current!.width.baseVal.value / 2;
            const side = Math.floor(toX - center);

            let direct: string;

            if (fromY > toY && (fromX === toX || side !== 0)) {
                toY += edge.to.offsetHeight / 2;
            } else if (fromY < toY && (fromX === toX || side !== 0)) {
                toY -= edge.to.offsetHeight / 2;
            } else if (fromX > toX) {
                toX += edge.to.offsetWidth / 2;
            } else if (fromX < toX) {
                toX -= edge.to.offsetWidth / 2;
            }

            if (fromX != toX && side !== 0) {
                direct = `M ${fromX} ${fromY} L ${toX} ${fromY} L ${toX} ${toY}`; // 1
            } else if (fromX != toX && side === 0) {
                direct = `M ${fromX} ${fromY} L ${fromX} ${toY} L ${toX} ${toY}`; // 2
            } else {
                direct = `M ${fromX} ${fromY} L ${toX} ${toY}`;
            }

            return (
                <>
                    <path
                        key={`path-${edge.from.id}-${edge.to.id}`}
                        stroke="black"
                        strokeWidth="2"
                        fill="none"
                        d={direct}
                        markerEnd="url(#arrow)"
                    />

                    {edge.label && (
                        <text x={textX} y={textY} text-anchor="middle" alignment-baseline="central">
                            {edge.label}
                        </text>
                    )}
                </>
            );
        });

        setPath(path);
    }, [edges]);

    useEffect(() => {
        const set = new Set(edges.map((edge) => edge.to));
        const observers: ResizeObserver[] = [];

        set.forEach((to) => {
            const observer = new ResizeObserver(draw);
            observer.observe(to);

            observers.push(observer);
        });

        const windowObserver = new ResizeObserver(draw);
        windowObserver.observe(document.body);

        return () => {
            observers.forEach((observer) => observer.disconnect());
            windowObserver.disconnect();
        };
    }, [draw, edges]);

    return (
        <>
            <svg ref={svgRef} width="100%" height={height} className=" -z-10">
                <defs>
                    <marker
                        id="arrow"
                        viewBox="0 0 10 10"
                        refX="10"
                        refY="5"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto-start-reverse"
                    >
                        <path d="M 0 0 L 10 5 L 0 10 z" />
                    </marker>
                </defs>
                {path.map((p) => p)}
            </svg>
        </>
    );
};

export default Edges;
