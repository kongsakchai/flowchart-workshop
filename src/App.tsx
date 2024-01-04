import { Flowchart, Menu, SideSlot } from "@/components/layout";
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
    const [pass, setPass] = useState<boolean[]>([]);

    const [index, setIndex] = useState<number>(0);

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
        const pass = localStorage.getItem("pass");
        if (pass) {
            setPass(JSON.parse(pass));
        } else {
            setPass(new Array(paths.length).fill(false));
        }
    }, []);

    const select = (index: number) => {
        setIndex(index);
    };

    const onPass = () => {
        setPass((prev) => {
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

                <Menu select={select} paths={paths} pass={pass} />
            </div>

            {drag && <Drag ref={dragRef} />}
        </DragContext.Provider>
    );
}

export default App;
