export default function LessonElement({ actId, actName, actLink, dueDate }) {
    return (
        <article>
            <p className="text-white">{actId}</p>
        </article>
    );
};