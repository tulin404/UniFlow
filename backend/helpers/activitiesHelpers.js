import * as cheerio from "cheerio";

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

function CreateActivityObj(actName, actLink, dueDate, done) {
    return {
        actName: actName,
        actLink: actLink,
        dueDate: dueDate,
        done: done
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

function getDueDate(html) {
    const $ = cheerio.load(html);
    const lastDiv = $("div.activity-dates > div:last-child");
    const allTxt = lastDiv.text();
    const strongTxt = $(lastDiv).find("strong").text();
    const realTxt = allTxt.replace(`<strong>${strongTxt}</strong>`, "").trim();
    if (realTxt.startsWith(openMsg)) {
        return("Data para entrega não definida.")
    } else {
        return realTxt;
    };
};

export default function achelper() {
    return{
        Course: (name, link) => Course(name, link),
        CreateActivitiesWithCourse: (courseName, activiesArray) => CreateActivitiesWithCourse(courseName, activiesArray),
        CreateActivityObj: (actName, actLink, dueDate, done) => CreateActivityObj(actName, actLink, dueDate, done),
        getActName: (linkElement) => getActName(linkElement),
        getDueDate: (html) => getDueDate(html),
        isDone: (html) => isDone(html)
    };
};