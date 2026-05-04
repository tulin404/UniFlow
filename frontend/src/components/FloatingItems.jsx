import { useMemo } from "react";
import { AcademicCapIcon, BookOpenIcon, PencilIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const ICONS = [AcademicCapIcon, BookOpenIcon, PencilIcon, DocumentTextIcon];
const ANIMATIONS = ['floatA', 'floatB', 'floatC'];

const rangeBetween = (min, max) => Math.random() * (max - min) + min;

const getChoice = (poss) => {
    return poss[Math.floor(rangeBetween(0, poss.length))];
};

export default function FloatingItems() {

    // LAZY LOADING, HIGH CPU COST
    const itemsArray = useMemo(() => {
        return Array.from({ length: 3 }).map((_, index) => ({
            id: index,
            choice: getChoice(ICONS),
            top: rangeBetween(20, 80),
            left: rangeBetween(10, 80),
            duration: rangeBetween(12, 22),
            delay: rangeBetween(0, 5),
            animation: getChoice(ANIMATIONS),
            height: rangeBetween(16, 32),
            filter: rangeBetween(0.5, 1.5)
        }));
    }, []);

    return (
        <>
            {itemsArray.map(item => {
                return (
                    <item.choice
                        key={item.id}
                        className="floating-item"
                        style={{
                            height: `${item.height}px`,
                            top: `${item.top}%`,
                            left: `${item.left}%`,
                            animationName: item.animation,
                            animationDuration: `${item.duration}s`,
                            animationDelay: `${item.delay}s`,
                            filter: `blur(${item.filter}px)`,
                            zIndex: `-${item.filter}`
                        }}
                    />
                );
            })}
        </>
    );
};
