import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function LessonCard({ actCourse, actName, actLink, dueDate, done, state, lastMod, theme, childrenNum }) {
    console.log(state)

    const getStyles = () => {
        if (done) {
            return "card-done";
        } else {
            if (state === 0) return "card-urgent";
            if (state === 1) return "card-warn";
            if (state === 2) return "card-risk";
            return "card";
        }
    }; 


    const badgeStyles = {
        "card-done": {
            bg: "bg-card-done",
            hover: "hover:bg-card-done-hover",
            border: "border-card-done-border",
            text: "text-card-done-text",
        },
        "card-urgent": {
            bg: "bg-card-urgent",
            hover: "hover:bg-card-urgent-hover",
            border: "border-card-urgent-border",
            text: "text-card-urgent-text",
        },
        "card-risk": {
            bg: "bg-card-risk",
            hover: "hover:bg-card-risk-hover",
            border: "border-card-risk-border",
            text: "text-card-risk-text",
        },
        "card": {
            bg: "bg-card",
            hover: "hover:bg-card-hover",
            border: "border-card-border",
            text: "text-text-soft",
        }
    };

    const renderBagdeIcon = () => {
        switch (state) {
            case 0:
                return <div className="flex justify-start"><ExclamationCircleIcon className="text-urgent-icon size-5 md:size-5.5 stroke-[1.5]" /></div>
            case 1:
                return <div className="flex justify-start"><ExclamationTriangleIcon className="text-warn-icon size-5 md:size-5.5 stroke-[1.5]" /></div>
            case 2:
                return <div className="flex justify-start"><ClockIcon className="text-card-risk size-5 md:size-5.5 stroke-[1.5]" /></div>
            case 3:
                return <div className="flex justify-start"><CalendarDaysIcon className="text-card-text size-5 md:size-5.5 stroke-[1.5]" /></div>
            default:
                return <div className="flex justify-start"><CheckCircleIcon className="text-done-icon size-6 md:size-6.5 stroke-[1.5]" /></div>
        };
    };

    const color = getStyles();
    const styles = badgeStyles[color];

    return (
        <a href={actLink} target="_blank" rel="noopener noreferrer" className={`${childrenNum <= 1 ? "w-[60dvw] sm:w-[45dvw] md:w-[40dvw] lg:w-[35dvw] xl:w-[25dvw]" : "h-full"}`}>
            <article className={`${done ? "opacity-75" : "opacity-100"} ${styles.bg} ${styles.hover} ${styles.border} flex flex-col font-[Inter] transition-all duration-200 rounded-md border-2 hover:-translate-y-1 px-4 py-2 gap-2 h-full`}>
                <h3 className="act-title text-text flex gap-2.5">
                    <span className="flex-1 md:text-lg font-bold">{actName}</span>
                    {state !== 3 ? renderBagdeIcon() : null}
                </h3>
                {done ? <h5 className="act-course text-sm md:text-base text-text-muted font-medium italic">{actCourse}</h5> : <div className="flex items-center justify-start gap-1.5 md:gap-2">{renderBagdeIcon()}<span className={`${styles.text} italic font-medium`}>{dueDate}</span></div>}
                {done && <h4 className="font-[Inter] font-semibold text-sm md:text-base text-text-soft">{lastMod}</h4>}
            </article>
        </a>
    );
};