function formatDueDate(dueDate) {
    const replacedDue = dueDate.replace("Vencimento: ", "");
    // MONTHS
    const months = {
        jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5, 
        jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 12
    };

    const regex = /(\d{1,2}) (\w+)\. (\d{4}), (\d{2}):(\d{2})/
    const [, day, month, year, hour, minute] = replacedDue.match(regex);

    // GET TIME
    const date = new Date(
        year, 
        months[month.toLowerCase()],
        day,
        hour,
        minute
    );
    
    return date;
};


export default function smartFormat(dueDate) {
    const formatted = formatDueDate(dueDate);
    if (!formatted) return dueDate;

    const now = new Date();

    // DAY WITHOUT HOUR 
    const dueDay = new Date(formatted.getFullYear(), formatted.getMonth(), formatted.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const dueTime = new Intl.DateTimeFormat("pt-br", {
        hour: "2-digit",
        minute:"2-digit"
    }).format(formatted);

    const diffDays = Math.floor( (dueDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) );
    const diffTime = Math.floor(formatted.getTime() - now.getTime())

    // SMART FORMATTING
    if (diffDays === 0) return [`Hoje • ${dueTime}`, diffTime];
    if (diffDays === 1) return [`Amanhã • ${dueTime}`, diffTime];
    if (diffDays < 0) return [`Atrasado • ${dueTime}`, diffTime];

    // FUTURE LESSONS
    const weekday = new Intl.DateTimeFormat("pt-br", {
        weekday: "short"
    }).format(formatted).replace(".", "");

    const dayAndMonth = new Intl.DateTimeFormat("pt-br", {
        day: "2-digit",
        month: "short"
    }).format(formatted);

    const capWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

    return ([`${capWeekday}, ${dayAndMonth} • ${dueTime}`, diffTime]);
};

console.log(
    smartFormat("quarta-feira, 15 abr. 2026, 18:00")
)