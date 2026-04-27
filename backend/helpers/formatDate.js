function formatDate(rawDate) {
    // MONTHS
    const months = {
        jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5, 
        jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 12
    };

    const regex = /(\d{1,2}) (\w+)\. (\d{4}), (\d{2}):(\d{2})/
    const [, day, month, year, hour, minute] = rawDate.match(regex);

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


export function smartDueFormat(dueDate) {
    const formatted = formatDate(dueDate);
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

    // SMART FORMATTING FOR ONLY HOUR LESSONS
    if (diffDays === 0) return [`Hoje • ${dueTime}`, diffTime, 1];
    if (diffDays === 1) return [`Amanhã • ${dueTime}`, diffTime, 2];
    
    // FUTURE LESSONS
    const weekday = new Intl.DateTimeFormat("pt-br", {
        weekday: "short"
    }).format(formatted).replace(".", "");
    
    const dayAndMonth = new Intl.DateTimeFormat("pt-br", {
        day: "2-digit",
        month: "short"
    }).format(formatted);
    
    const capWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
    
    if (diffDays < 0) return [`Atrasado • ${dayAndMonth}`, diffTime, 0];    

    return ([`${capWeekday}, ${dayAndMonth} • ${dueTime}`, diffTime, 3]);
};

export function smartLastModFormat(lastModDate) {
    const weekDays ={
        0: "Seg", 1: "Ter", 2: "Qua", 3: "Qui", 4: "Sex", 5: "Sáb", 6: "Dom"
    };

    const months = {
        0: "jan", 1: "fev", 2: "mar", 3: "abr", 4: "mai", 5: "jun", 
        6: "jul", 7: "ago", 8: "set", 9: "out", 10: "nov", 11: "dez"
    };

    const now = new Date();
    const lastModTime = formatDate(lastModDate);

    const diffMs = Math.abs(now - lastModTime);
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 24){
        return (`Há ${Math.ceil(diffHours)} horas.`);
    } else {
        if (diffHours <= 72) {
            const days = Math.floor(diffHours / 24);
            const hours = Math.floor(diffHours % 24);
            
            return (`Há ${days} dias e ${hours} horas.`);
        } else {
            const hours = lastModTime.getHours().toString().padStart(2, "0");
            const minutes = lastModTime.getMinutes().toString().padStart(2, "0");
            return (`${weekDays[lastModTime.getDay()]}, ${lastModTime.getDate()} de ${months[lastModTime.getMonth()]}, às ${hours}:${minutes} horas`)
        };
    };
};