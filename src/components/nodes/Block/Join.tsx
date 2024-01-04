import { BlockNode } from "@/types/node";
import Common from "./Common";

interface Props {
    data: BlockNode | null;
}

const Join: React.FC<Props> = () => {
    return <Common className="border-2 border-black bg-yello w-[40px] rounded-full bg-green" />;
};

export default Join;
