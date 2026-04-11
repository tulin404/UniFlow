import GridTitle from "./GridTitle";

export default function DoneGrid({ name, data, active, setActive }) {
    return (
        <section id="done" className="py-[4%] px-[8%]">
            <GridTitle name={name} active={active} setActive={setActive} />
            <div id="done-grid" className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] min-h-48">
                
            </div>
        </section>
    )
}