import { BlockNode } from "@/types/node";
import Common from "./Common";

interface Props {
    data: BlockNode | null;
}

const End: React.FC<Props> = ({ data }) => {
    return <Common className="border-2 border-black bg-blue rounded-full">{data?.text}</Common>;
};

export default End;
