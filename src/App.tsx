import { Flowchart, SideSlot } from "@/components/layout";
import { DragContext } from "@/stores/drag";
import { useEffect, useRef, useState } from "react";
import { BlockNode } from "@/types/node";
import Drag from "@/components/nodes/Drag";
import { parseNode } from "@/helper/data";

const paths = ["data.txt", "data2.txt", "data3.txt"];

function App() {
    const dragRef = useRef<HTMLDivElement>(null);
    const [drag, setDrag] = useState<BlockNode | null>(null);

    const [data, setData] = useState<BlockNode[]>([]);

    const [index, setIndex] = useState<number>(0);
    const [pass, setPass] = useState<boolean[]>();

    useEffect(() => {
        const move = (e: PointerEvent) => {
            if (dragRef.current && drag) {
                dragRef.current.style.left = `${e.clientX}px`;
                dragRef.current.style.top = `${e.clientY}px`;

                document.body.style.cursor = "grabbing";
                document.body.style.touchAction = "none";
            }
        };

        const cancel = () => {
            setDrag(null);
            document.body.style.cursor = "auto";
            document.body.style.touchAction = "auto";
        };

        const start = (e: PointerEvent) => {
            move(e);
        };

        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", cancel);
        window.addEventListener("pointerdown", start);

        return () => {
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", cancel);
            window.removeEventListener("pointerdown", start);
        };
    }, [drag, dragRef]);

    useEffect(() => {
        const load = async () => {
            const res = await fetch(paths[index]);
            if (!res.ok) throw new Error("Failed to load data");

            const data = await res.text();
            if (data.includes("<!DOCTYPE html>")) throw new Error("Failed to load data");

            const node = parseNode(data);
            setData(node);
        };

        load();
    }, [index]);

    useEffect(() => {
        if (data.length === 0) return;

        const passStr = localStorage.getItem("pass");
        if (!passStr) {
            setPass(paths.map(() => false));
            return;
        }

        const pass = JSON.parse(passStr);
        console.log(pass);
        setPass(pass);
    }, [data]);

    const select = (index: number) => {
        setIndex(index);
    };

    const onPass = () => {
        setPass((prev) => {
            if (!prev) return undefined;

            const newValue = [...prev];
            newValue[index] = true;
            localStorage.setItem("pass", JSON.stringify(newValue));

            return newValue;
        });
    };

    return (
        <DragContext.Provider value={{ data: drag, setData: setDrag }}>
            <div className=" lg:w-4/5 w-full flex justify-center">
                <SideSlot data={data} />

                <div className=" flex-1 p-6 h-full">
                    <Flowchart data={data} onPass={onPass} />
                </div>

                <div className="w-[200px] h-full flex items-center flex-col p-8 gap-4">
                    {paths.map((item, i) => (
                        <button
                            key={item}
                            onClick={() => select(i)}
                            className={`w-full bg-blue border-2 border-black p-2 ${pass?.[i] ? "bg-green" : ""}`}
                        >
                            ข้อที่ {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            {drag && <Drag ref={dragRef} />}
        </DragContext.Provider>
    );
}

export default App;
