import { useState } from "react";
import CourseTitle from "./CourseTitle";
import LessonCard from "./LessonCard";

export default function CourseElement({ obj, index, limit }) {
    
    const [active, setActive] = useState(false);
    
    if (obj.activities.length <= 0) {
        return null;
        
    } else {
        const activities = obj?.activities.filter(activity => !activity.done).slice(0, limit);
        const childrenNum = activities.length;
        
        if (childrenNum < 1) {
            return null;
        } else {
            return(
                <>
                    <CourseTitle name={obj.courseName} active={active} setActive={setActive} />
                    <div className={`grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 overflow-hidden transition-[max-height] duration-200 pt-1 px-1 mb-2 sm:mt-2 sm:mb-4 ${active ? "max-h-100" : "max-h-0"}`}>
                        {activities.map(activity => <LessonCard key={activity.actId} actName={activity.actName} actLink={activity.actLink} dueDate={activity.dueDate} done={activity.done} state={activity.state} childrenNum={childrenNum} />)}
                    </div>
                </>
            );
        };
    };
};