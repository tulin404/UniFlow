/* !!!IMPORTANT
   FUNCTIONS HERE ARE HIGHLY COUPLED BECAUSE IT SIMULATES A BROWSER.
   THATS WHY ALL THE FUNCTIONS ARE IN JUST ONE FILE
*/

import axios from "axios";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import * as cheerio from "cheerio";
import achelper from "../helpers/activitiesHelpers.js";
import { configDotenv } from "dotenv";
import { resolve } from "node:path";

configDotenv({ path: resolve("..", ".env.local")})

const lang = "pt_br"
const jar = new CookieJar();
const client = wrapper(axios.create({ jar, withCredentials: true}));
const helper = achelper();

async function getLoginToken() {
    const response = await client.get('https://ava-grad.unifacef.com.br/login/index.php');
    const html = response.data;
    const $ = cheerio.load(html);
    const loginToken = $('input[name="logintoken"]').val();
    return loginToken;
};

async function getSessKey() {
    const RA = process.env.RA;
    const pass = process.env.PASS;

    const loginToken = await getLoginToken();
    const response = await client.post('https://ava-grad.unifacef.com.br/login/index.php', 
        new URLSearchParams({
            anchor: "",
            logintoken: loginToken,
            username: RA,
            password: pass
        })
    );
    const data = await response.data;
    const match = data.match(/M\.cfg\s*=\s*({.*?});/s);
    const mcfg = JSON.parse(match[1].replace(/'/g, '"'));
    return mcfg.sesskey;
};

async function getCourses() {
    const sesskey = await getSessKey();
    const response = await client.post(`https://ava-grad.unifacef.com.br/lib/ajax/service.php?sesskey=${sesskey}&info=core_course_get_enrolled_courses_by_timeline_classification&lang=${lang}`,
    [{
        args: {
            "classification": "all",
            "customfieldname": "",
            "customfieldvalue": "",
            "limit": 0,
            "offset": 0,
            "sort": "fullname"
        },
        index: 0,
        methodname: "core_course_get_enrolled_courses_by_timeline_classification"
    }], {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = response.data[0].data.courses;

    let coursesArray = [];
    for (const obj of data) {
        if (obj.coursecategory.includes("semestre")) {
            const object = helper.Course(obj.shortname, obj.viewurl);
            coursesArray.push(object);
        };
    };
    
    return(coursesArray);
};

export default async function getAllActivities() {
    const courses = await getCourses();
    const finalArr = [];
    for (const course of courses) {
        const activitiesArray = [];
        const raw = await client.get(`${course.link}&lang=${lang}`);
        const html = raw.data;
        const $ = cheerio.load(html);
        const links = $("a[href*='assign']");

        links.each(async (index, link) => {
            const href = $(link).attr("href");
            const raw = await client.get(href);
            const html = raw.data;
            const id = parseInt(href.slice(-6));
            const name = helper.getActName(link);
            const dueDate = helper.getDueDate(html);
            const done = helper.isDone(html);
            if (name) {
                const actObj = helper.CreateActivityObj(id, name, href, dueDate, done);
                activitiesArray.push(actObj);
            };
        });
        const finalObj = helper.CreateActivitiesWithCourse(course.name, activitiesArray);
        finalArr.push(finalObj);
    };
    return finalArr;
};