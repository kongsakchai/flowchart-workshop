interface Props {
    className?: string;
    children?: React.ReactNode;
}

const Common: React.FC<Props> = ({ className, children }) => {
    return (
        <div
            className={`w-[100px] h-[40px] select-none text-center p-1 text-sm relative flex justify-center items-center  touch-none ${className}`}
        >
            {children}
        </div>
    );
};

export default Common;
