export default function DoneGrid({ name, data, active, setActive, theme, limit }) {

    const elements = Array.isArray(data) ? data?.map(piece => piece.activities)?.filter(activ => activ.length > 0)?.flat()?.filter(item => item.done)?.toSorted((a, b) => b.priority - a.priority) : [];
    
    if (!Array.isArray(data)) {
        return (
            <main id="main" className="py-[4%] px-[8%] gap-4 flex flex-col">
                <GridTitle name={name} active={active} setActive={setActive} />
                <div id="main-grid" className={`grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 overflow-hidden transition-[max-height] duration-200 pt-2 ${active ? "max-h-250" : "max-h-0"}`}>
                    {Array.from({ length: (limit * 2) }).fill(null).map((_, index) => <LessonSkeleton key={index} />)}
                </div>
            </main>
        )
    } else {
        return (
            <main className="py-[4%] px-[8%] gap-4 flex flex-col">
                <GridTitle name={name} active={active} setActive={setActive} />
                <div id="main-grid" className={`grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 overflow-hidden transition-[max-height] duration-200 pt-2 ${active ? "max-h-250" : "max-h-0"}`}>
                    {elements.slice(0, (limit * 2)).map(element => <LessonElement key={element.actId} theme={theme} actCourse={element.actCourse} actName={element.actName} actLink={element.actLink} dueDate={element.dueDate} done={element.done} status={element.status} lastMod={element.lastMod} />)}
                </div>
            </main>
        );
    };
};