import GridTitle from "./GridTitle";
import CourseTitle from "./CourseTitle";
import CourseElement from "./CourseElement";

export default function MainGrid({ name, data, active, setActive, theme, limit }) {

    if (!Array.isArray(data)) {
        return (
            <main id="main" className="py-[4%] px-[8%] gap-4 flex flex-col">
                <GridTitle name={name} active={active} setActive={setActive} />
                <section id="main-grid" className={`grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 overflow-hidden transition-[max-height] duration-200 pt-2 ${active ? "max-h-250" : "max-h-0"}`}>
                    {Array.from({ length: (limit * 2) }).fill(null).map((_, index) => <LessonSkeleton key={index} />)}
                </section>
            </main>
        )
    } else {
        return (
            <main className="py-[4%] px-[8%] gap-4 flex flex-col">
                <GridTitle name={name} active={active} setActive={setActive} />
                <section className={`${active ? "max-h-250" : "max-h-0"} transition-[max-height] duration-200 overflow-hidden flex flex-col gap-2 sm:gap-4 pt-2`}>
                    {data.map((obj, index) => {
                        return(
                            <CourseElement key={index} obj={obj} limit={limit} />
                        );
                    })}
                </section>
            </main>
        );
    };
};