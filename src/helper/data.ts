import { BlockNode, BlockTypeEnum } from "@/types/node";

export const parseNode = (str: string): BlockNode[] => {
    const lines = str.replace(/\r\n/g, "\n").split("\n");

    const nodes: BlockNode[] = [];
    const edgesMap = new Map<string, string[]>();

    lines.forEach((line) => {
        if (line === "") return;

        if (line.includes("->")) {
            const [from, to] = line.split("->");
            edgesMap.set(from, to.split(","));
        } else {
            const node = parseBlock(line);
            nodes.push(node);
        }
    });

    const newIdMap = createRandomIds(nodes);

    nodes.forEach((node) => {
        const next = edgesMap.get(node.id) || [];
        node.next = next.map((id) => newIdMap.get(id) || "").filter((id) => id !== "");
        node.id = newIdMap.get(node.id) || "";
    });

    return nodes;
};

const parseType = (str: string) => {
    switch (str) {
        case "st":
            return BlockTypeEnum.START;
        case "e":
            return BlockTypeEnum.END;
        case "p":
            return BlockTypeEnum.PROCESS;
        case "d":
            return BlockTypeEnum.DECISION;
        case "j":
            return BlockTypeEnum.JOIN;
        default:
            return BlockTypeEnum.PROCESS;
    }
};

const parseBlock = (str: string): BlockNode => {
    const [id, type, text, position] = str.split(";");
    const [x, y] = position.split(",");

    const node: BlockNode = {
        id,
        type: parseType(type),
        text,
        position: {
            x: Number(x),
            y: Number(y),
        },
        next: [],
    };

    return node;
};

const createRandomIds = (nodes: BlockNode[]) => {
    const ids = new Map<string, string>();

    nodes.forEach((node, index) => {
        const id = randomId();
        ids.set(node.id, id + index);
    });

    return ids;
};

const randomId = () => Math.random().toString(36).substring(2, 9);
