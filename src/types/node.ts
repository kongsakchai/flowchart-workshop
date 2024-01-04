export enum BlockTypeEnum {
    START = "start",
    END = "end",
    PROCESS = "process",
    DECISION = "decision",
    JOIN = "join",
}

export interface BlockNode {
    id: string;
    text: string;
    type: BlockTypeEnum;
    next: string[];
    position: {
        x: number;
        y: number;
    };
}

export interface EdgeMap {
    from: HTMLDivElement;
    to: HTMLDivElement;
    label?: string;
}
