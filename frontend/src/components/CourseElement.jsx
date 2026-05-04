import { useState } from "react";
import CourseTitle from "./CourseTitle";
import LessonCard from "./LessonCard";
import { smartDueFormat } from "../helpers/dateHelper";

export default function CourseElement({ obj, index, limit }) {
    
    const [active, setActive] = useState(false);
    
    if (obj.activities.length <= 0) {
        return null;
    } else {
        const activities = obj.activities.filter(activity => !activity.done);
        const childrenNum = activities.length;
        
        if (childrenNum < 1) {
            return null;
        } else {
            const completeActivities = activities.map(activity => {
                const [formattedDueDate, priority, state] = smartDueFormat(activity.dueDate);
                
                return {
                    ...activity,
                    dueDate: formattedDueDate,
                    priority,
                    state
                };
            });

            const sortedActivities = completeActivities.sort((a, b) => a.priority - b.priority);
            
            return(
                <>
                    <CourseTitle name={obj.courseName} active={active} setActive={setActive} />
                    <div className={`grid ${childrenNum <= 2 ? "grid-cols-[repeat(auto-fit,minmax(230px,max-content))]" : "grid-cols-[repeat(auto-fit,minmax(230px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"} xl:grid-cols-[repeat(auto-fit,minmax(280px,max-content))] gap-4 overflow-hidden transition-[max-height] duration-200 pt-1 px-1 mb-2 sm:mt-2 sm:mb-4 ${active ? "max-h-100" : "max-h-0"}`}>
                        {sortedActivities.map(activity => <LessonCard key={activity.actId} actName={activity.actName} actLink={activity.actLink} dueDate={activity.dueDate} done={activity.done} priority={activity.priority} state={activity.state} childrenNum={childrenNum} />)}
                    </div>
                </>
            );
        };
    };
};