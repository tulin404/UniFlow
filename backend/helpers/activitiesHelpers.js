import * as cheerio from "cheerio";
import smartFormat from "./formatDueDate.js";

const openMsg = "Aberto";

function Course(name, link) {
    return { name, link };
};

function CreateActivitiesWithCourse(courseName, activiesArray) {
    return {
        courseName: courseName,
        activities: activiesArray
    };
};

function CreateActivityObj(actId, actCourse, actName, actLink, dueDate, done, lastMod, priority, state) {
    return {
        actId: actId,
        actCourse: actCourse, // FOR DONE LESSONS
        actName: actName,
        actLink: actLink,
        dueDate: dueDate,
        done: done,
        lastMod: lastMod ? lastMod : [],
        priority: priority,
        state: state
    };
};

function getActName(linkElement) {
    const $ = cheerio.load(linkElement);
    const instanceName = $(".instancename");
    const allTxt = instanceName.text();
    const removeTxt = instanceName.find(".accesshide").text();
    const name = allTxt.replace(removeTxt, "");
    return name.trim();
};

function isDone(html) {
    const $ = cheerio.load(html);
    return ($("td.submissionstatussubmitted").length !== 0);
};

function getLastMod(html) {
    const $ = cheerio.load(html);
    const lastModDate = $("td.cell.c1.lastcol").filter((index, element) => {
        const classes = $(element).attr("class")?.trim().split(/\s+/) || [];
        return classes.length === 3 && classes.includes("cell") && classes.includes("c1") && classes.includes("lastcol");
    });

    return lastModDate.contents().first().text().trim();
};

function getDueDateAndPriority(html) {
    const $ = cheerio.load(html);
    const lastDiv = $("div.activity-dates > div:last-child");
    const allTxt = lastDiv.text();
    const strongTxt = $(lastDiv).find("strong").text();
    const replacedStrong = allTxt.replace(`<strong>${strongTxt}</strong>`, "").trim();
    const realDate = smartFormat(replacedStrong);
    
    if (replacedStrong.startsWith(openMsg)) {
        return("Data para entrega não definida.")
    } else {
        return realDate;
    };
};

function filterCourseName(courseName) {
    const courseFilter = {
        "ALGORITMO E LÓGICA DE PROGRAMAÇÃO I": "Alg/Lóg. de Prog. I",
        "FUNDAMENTOS DE PROGRAMAÇÃO E DESENVOLVIMENTO WEB": "Desenvolvimento Web",
        "COMUNICAÇÃO PROFISSIONAL E ACADÊMICA EM COMPUTAÇÃO": "Comunicação em Comp.",
        "INTRODUÇÃO À COMPUTAÇÃO E À INTELIGÊNCIA ARTIFICIAL": "Introd. à Comp. e IA",
        "MATEMÁTICA PARA COMPUTAÇÃO": "Matemática p/ Comp.",
        "METODOLOGIA DE PESQUISA EM COMPUTAÇÃO": "Met. de Pesq. em Comp."
    };

    return courseFilter[courseName];
};

function sortActArray(actArr) {
    return actArr.sort((a, b) => a.priority - b.priority);
};

export default function AcHelper() {
    return{
        Course: (name, link) => Course(name, link),
        CreateActivitiesWithCourse: (courseName, activiesArray) => CreateActivitiesWithCourse(courseName, activiesArray),
        CreateActivityObj: (actId, actCourse, actName, actLink, dueDate, done, lastMod, priority, state) => CreateActivityObj(actId, actCourse, actName, actLink, dueDate, done, lastMod, priority, state),
        getActName: (linkElement) => getActName(linkElement),
        getLastMod: (html) => getLastMod(html),
        getDueDateAndPriority: (html) => getDueDateAndPriority(html),
        isDone: (html) => isDone(html),
        filterCourseName: (courseName) => filterCourseName(courseName),
        sortActArray: (actArr) => sortActArray(actArr)
    };
};