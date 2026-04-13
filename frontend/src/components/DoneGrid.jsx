import { useEffect } from "react";
import GridTitle from "./GridTitle";
import LessonElement from "./LessonElement";

export default function DoneGrid({ name, data, active, setActive }) {

    const elements = data?.map(piece => piece.activities)?.filter(activ => activ.length > 0)?.flat()?.filter(item => item.done) || [];

    if (!data) {
        return (
            <section id="done" className="py-[4%] px-[8%]">
                <GridTitle name={name} active={active} setActive={setActive} />
                <div id="done-grid" className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] min-h-48">
                    <div>Loading...</div>
                </div>
            </section>
        )
    } else {
        return (
            <section id="done" className="py-[4%] px-[8%]">
                <GridTitle name={name} active={active} setActive={setActive} />
                <div id="done-grid" className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] min-h-48">
                    {elements.map(element => <LessonElement key={element.actId} actId={element.actId} />)}
                </div>
            </section>
        );
    };
};