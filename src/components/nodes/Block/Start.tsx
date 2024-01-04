import { BlockNode } from "@/types/node";
import Common from "./Common";

interface Props {
    data: BlockNode | null;
}

const Start: React.FC<Props> = ({ data }) => {
    return <Common className="border-2 border-black bg-red rounded-full">{data?.text}</Common>;
};

export default Start;
