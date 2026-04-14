import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function LessonElement({ actId, actName, actLink, dueDate, done, status, theme }) {
    const BadgeIcon = () => {
        if (done) return <div className="flex justify-center items-center"><CheckCircleIcon className={`${theme === "dark" ? "text-primary" : "text-green-500"} size-6 md:size-7 stroke-[1.5]`} /></div>
        if (status === 0) return <ExclamationTriangleIcon />
    };

    return (
        <article className={`${done ? "opacity-70 bg-card-done border-card-done-border hover:bg-card-done-hover" : "opacity-100 bg-card hover:bg-card-hover border-card-border"} font-[Inter] transition-all duration-200 rounded-md border-2 h-full px-4 py-2`}>
            <h3 className="act-title text-text flex gap-2.5 font-semibold font-[Inter]">
                <BadgeIcon />
                <span className="flex-1 md:text-lg">{actName}</span>
            </h3>
            <h4 className="text-sm md:text-base"></h4>
        </article>
    );
};