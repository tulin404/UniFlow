import { useState } from "react";
import { AcademicCapIcon, BookOpenIcon, PencilIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const CHOICES = [AcademicCapIcon, BookOpenIcon, PencilIcon, DocumentTextIcon];

const rangeBetween = (min, max) => Math.random() * (max - min) + min;

const getChoice = () => {
    return CHOICES[Math.floor(rangeBetween(0, CHOICES.length))];
};

export default function FloatingBooks() {

    // LAZY LOADING, HIGH CPU COST
    const [booksArray] = useState(() => {
        return Array.from({ length: 3 }).map((_, index) => ({
            id: index,
            choice: getChoice(),
            top: rangeBetween(0, 80),
            left: rangeBetween(0, 80),
            duration: rangeBetween(12, 22),
            delay: rangeBetween(0, 5),
        }));
    });

    return (
        <>
            {booksArray.map(book => {
                return (
                    <book.choice
                        key={book.id}
                        className="floating-item"
                        style={{
                            top: `${book.top}%`,
                            left: `${book.left}%`,
                            animationDuration: `${book.duration}%`,
                            animationDelay: `${book.delay}%`
                        }}
                    />
                );
            })};
        </>
    );
};
