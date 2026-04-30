import { ArrowRightIcon } from "@heroicons/react/24/outline"

// GRID COMPONENT
export default function GridTitle({ name, active, setActive }) {
    const descText = () => name === "Feitas" ? "Veja as lições que você já concluiu." : "Acompanhe as lições que ainda estão em andamento."

    return (
        <div className="title flex flex-col justify-center items-start text-text">
            <button onClick={() => setActive(!active)} className="flex group peer gap-1 sm:gap-3 items-center justify-center font-semibold font-[Inter]">
                <div className="title-bar relative bg-primary w-1 h-8 rounded-full" />
                <ArrowRightIcon className={`${active ? "rotate-90 sm:opacity-100" : "rotate-0 sm:opacity-0"} h-7.5 xl:h-8.5 stroke-[2.5] font-extrabold opacity-0 group-hover:flex group-hover:opacity-100 hover:bg-hover-bg active:scale-95 active:bg-active-bg rounded-full aspect-square p-1 transition-all duration-200`} />
                <h2 className={`${active ? "sm:translate-x-0 xl:translate-x-0" : "-translate-x-4 sm:-translate-x-7"} text-4xl group-hover:scale-110 xl:group-hover:scale-100 xl:text-5xl xl:-translate-x-9 group-hover:translate-x-0 font-semibold active:scale-90 xl:active:scale-95 font-[satoshi] transition-all duration-200`}>{name}</h2>
            </button>
            <h3 className="text-text-soft pl-4 text-sm sm:text-base sm:max-w-1/2 md:max-w-1/3 opacity-75 peer-hover:opacity-100 transition-opacity duration-200">{descText()}</h3>
        </div>
    );
};
