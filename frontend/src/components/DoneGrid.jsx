import { useState, useEffect } from "react";
import GridTitle from "./GridTitle";
import LessonElement from "./LessonElement";

export default function DoneGrid({ name, data, active, setActive, theme, limit, setLimit }) {

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            if (width < 640) {
                setLimit(4);
            } else if (width < 1024) {
                setLimit(6);
            } else {
                setLimit(9);
            };
        };
        
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const elements = Array.isArray(data) ? data?.map(piece => piece.activities)?.filter(activ => activ.length > 0)?.flat()?.filter(item => item.done) : [];

    if (!Array.isArray(data)) {
        return (
            <section id="done" className="py-[4%] px-[8%]">
                <GridTitle name={name} active={active} setActive={setActive} />
                <div id="done-grid" className={`grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] auto-rows-fr justify-center items-center gap-4 overflow-hidden transition-[max-height] duration-200 ${active ? "max-h-250" : "max-h-0"}`}>
                    <div>Loading...</div>
                </div>
            </section>
        )
    } else {
        return (
            <section className="py-[4%] px-[8%] gap-4 flex flex-col">
                <GridTitle name={name} active={active} setActive={setActive} />
                <div id="done-grid" className={`grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] justify-center items-center gap-4 overflow-hidden transition-[max-height] duration-200 ${active ? "max-h-250" : "max-h-0"}`}>
                    {elements.slice(0, limit).map(element => <LessonElement key={element.actId} theme={theme} actCourse={element.actCourse} actName={element.actName} actLink={element.actLink} dueDate={element.dueDate} done={element.done} status={element.status} />)}
                </div>
            </section>
        );
    };
};