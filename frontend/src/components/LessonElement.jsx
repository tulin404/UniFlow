import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function LessonElement({ actCourse, actName, actLink, dueDate, done, status, theme }) {
    const BadgeIcon = () => {
        if (done) return <div className="flex justify-center"><CheckCircleIcon className={`${theme === "dark" ? "text-primary" : "text-green-500"} size-7 md:size-7.5 stroke-[1.5]`} /></div>
        if (status === 0) return <div className="flex justify-center items-center"><ExclamationCircleIcon className="text-red-500 size-6 md:size-6.5 stroke-[1.5]" /></div>
    };

    return (
        <article className={`${done ? "opacity-70 bg-card-done border-card-done-border hover:bg-card-done-hover" : "opacity-100 bg-card hover:bg-card-hover border-card-border gap-2"} flex flex-col font-[Inter] transition-all duration-200 rounded-md border-2 px-4 py-2 gap-2 h-min`}>
            <h3 className="act-title text-text flex gap-2.5 font-semibold">
                <span className="flex-1 md:text-lg">{actName}</span>
                <BadgeIcon />
            </h3>
            {done ? <h4 className="act-course text-sm md:text-base text-text-muted font-medium">{actCourse}</h4> : <div className="flex items-center justify-center gap-1"><ExclamationCircleIcon className="text-red-600 size-5 md:size-5.5 stroke-[1.5]" /><span className="text-red-400 font-medium">{dueDate}</span></div>}
        </article>
    );
};