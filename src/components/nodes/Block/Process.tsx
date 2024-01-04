import { BlockNode } from "@/types/node";
import Common from "./Common";

interface Props {
    data: BlockNode | null;
}

const Process: React.FC<Props> = ({ data }) => {
    return <Common className="border-2 border-black bg-yellow">{data?.text}</Common>;
};

export default Process;
