import { useState, useEffect, act } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline"

// GRID COMPONENT
export default function Grid({ id, name }) {
    
    // DATA FETCHING
    const [data, setData] = useState(null);

    useEffect(() => {
        async function getFullObj() {
            try {
                const raw = await fetch(`${import.meta.env.VITE_API_URL}`);
                const json = await raw.json();
                setData(json);
            } catch(error) {
                console.log("Erro na request das atividades:", error);
            };
        };

        getFullObj();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    // ARROW EFFECT
    const [active, setActive] = useState(false);

    const Wrapper = id === 'done' ? 'section' : 'main';

    return (
        <Wrapper className="py-[4%]">
            <div className="flex group items-center justify-start pl-[8%] text-text w-min">
                <button onClick={() => setActive(!active)} className="flex gap-3 items-center justify-center font-semibold font-[Inter]">
                    <ArrowRightIcon className={`${active? "rotate-90" : "rotate-0"} h-7.5 xl:h-8.5 stroke-[2.5] font-extrabold opacity-100 sm:opacity-0 sm:group-hover:flex sm:group-hover:opacity-100 hover:bg-hover-bg active:bg-active-bg rounded-full aspect-square p-1 transition-all duration-300`} />
                    <h2 className="text-4xl group-hover:scale-110 xl:group-hover:scale-100 xl:text-5xl sm:-translate-x-7 xl:-translate-x-9 sm:group-hover:translate-x-0 font-semibold font-[satoshi] transition-all duration-200">{name}</h2>
                </button>
            </div>
        </Wrapper>
    );
};
