export default function LessonSkeleton() {
    return (
        <article className={"skeleton opacity-100 bg-card hover:bg-card-hover border-card-border flex flex-col transition-all duration-200 rounded-md border-2 hover:-translate-y-1 px-4 py-2 gap-2 size-full"}>
            <h3 className="flex gap-2.5">
                <span className="flex-1 rounded-sm h-5 bg-skeleton-highlight" />
                <span className="size-5 rounded-sm bg-skeleton-highlight" />
            </h3>
            <span className="" />
            <span />
        </article>
    );
};