import { BlockNode } from "@/types/node";
import Common from "./Common";

interface Props {
    data: BlockNode | null;
}

const Decision: React.FC<Props> = ({ data }) => {
    return (
        <Common className="border-2 border-black bg-yello bg-black diamond">
            <div className="diamond-inner bg-white"/>
            {data?.text}
        </Common>
    );
};

export default Decision;
