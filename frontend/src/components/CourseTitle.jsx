import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { useState } from "react";

// GRID COMPONENT
export default function CourseTitle({ name, active, setActive }) {

    return (
        <div className="title flex items-center justify-between sm:justify-start text-text sm:pl-4 pl-1">
            <button onClick={() => setActive(!active)} className="flex group gap-2 sm:gap-3 items-center justify-center font-semibold font-[Inter]">
                <ArrowRightIcon className={`${active ? "rotate-90 sm:opacity-100" : "rotate-0 sm:opacity-0"} h-6.5 sm:h-7 xl:h-8 stroke-[2.5] font-extrabold opacity-100 sm:group-hover:flex sm:group-hover:opacity-100 sm:group-hover:mr-2 hover:bg-hover-bg active:scale-95 active:bg-active-bg rounded-full aspect-square p-1 transition-all duration-200`} />
                <h2 className={`${active ? "sm:translate-x-0 xl:translate-x-0" : "sm:-translate-x-7"} text-2xl sm:text-3xl xl:text-4xl group-hover:scale-110 xl:group-hover:scale-100 sm:-translate-x-7 xl:-translate-x-9 sm:group-hover:translate-x-0 font-semibold active:scale-90 xl:active:scale-95 font-[satoshi] transition-all duration-200`}>{name}</h2>
            </button>
        </div>
    );
};