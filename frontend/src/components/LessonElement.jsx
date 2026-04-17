import { ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function LessonElement({ actCourse, actName, actLink, dueDate, done, status, lastMod, theme }) {
    const BadgeIcon = () => {
        if (done) return <div className="flex justify-center"><CheckCircleIcon className={`${theme === "dark" ? "text-done-icon" : "text-green-500"} size-7 md:size-7.5 stroke-[1.5]`} /></div>
        if (status === 0) return <div className="flex justify-center items-center"><ExclamationCircleIcon className="text-red-500 size-6 md:size-6.5 stroke-[1.5]" /></div>
    };

    return (
        <a href={actLink} target="_blank" rel="noopener noreferrer" className="h-full">
            <article className={`${done ? "opacity-70 bg-card-done border-card-done-border hover:bg-card-done-hover" : "opacity-100 bg-card hover:bg-card-hover border-card-border"} flex flex-col font-[Inter] transition-all duration-200 rounded-md border-2 hover:-translate-y-1 px-4 py-2 gap-2 h-full`}>
                <h3 className="act-title text-text flex gap-2.5">
                    <span className="flex-1 md:text-lg font-bold">{actName}</span>
                    <BadgeIcon />
                </h3>
                {done ? <h5 className="act-course text-sm md:text-base text-text-muted font-medium italic">{actCourse}</h5> : <div className="flex items-center justify-center gap-1"><ExclamationCircleIcon className="text-red-600 size-5 md:size-5.5 stroke-[1.5]" /><span className="text-red-400 font-medium">{dueDate}</span></div>}
                {done && <h4 className="font-[Inter] font-semibold text-sm md:text-base text-text-soft">{lastMod}</h4>}
            </article>
        </a>
    );
};