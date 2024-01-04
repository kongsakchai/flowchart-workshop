interface Props {
    select: (i: number) => void;
    paths: string[];
    pass: boolean[];
}

const Menu: React.FC<Props> = ({ select, paths, pass }) => {
    return (
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
    );
};

export default Menu;
