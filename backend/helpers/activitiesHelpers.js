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

function CreateActivityObj(actId, actName, actLink, dueDate, done, priority, state) {
    return {
        actId: actId,
        actName: actName,
        actLink: actLink,
        dueDate: dueDate,
        done: done,
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

function sortActArray(actArr) {
    return actArr.sort((a, b) => a.priority - b.priority);
};

export default function AcHelper() {
    return{
        Course: (name, link) => Course(name, link),
        CreateActivitiesWithCourse: (courseName, activiesArray) => CreateActivitiesWithCourse(courseName, activiesArray),
        CreateActivityObj: (actId, actName, actLink, dueDate, done, priority, state) => CreateActivityObj(actId, actName, actLink, dueDate, done, priority, state),
        getActName: (linkElement) => getActName(linkElement),
        getDueDateAndPriority: (html) => getDueDateAndPriority(html),
        isDone: (html) => isDone(html),
        sortActArray: (actArr) => sortActArray(actArr)
    };
};