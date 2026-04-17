export default function LessonSkeleton() {
    return (
        <article className={"skeleton opacity-100 bg-card hover:bg-card-hover border-card-border flex flex-col transition-all duration-200 rounded-md border-2 hover:-translate-y-1 px-6 py-3 gap-4 size-full"}>
            <h3 className="flex gap-2.5">
                <span className="flex-1 rounded-sm h-5 bg-skeleton-highlight md:h-7" />
                <span className="size-5 rounded-sm bg-skeleton-highlight md:size-7" />
            </h3>
            <span className="h-5 md:h-6 bg-skeleton-highlight rounded-sm" />
            <span className="h-5 md:h-6 bg-skeleton-highlight rounded-sm" />
        </article>
    );
};