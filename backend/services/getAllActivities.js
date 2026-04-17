/* 
    !!! IMPORTANT !!!
    FUNCTIONS HERE ARE HIGHLY COUPLED BECAUSE IT SIMULATES A BROWSER.
    THATS WHY ALL THE FUNCTIONS ARE IN JUST ONE FILE
*/

import axios from "axios";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import * as cheerio from "cheerio";
import AcHelper from "../helpers/activitiesHelpers.js";
import { configDotenv } from "dotenv";
import { resolve } from "node:path";

configDotenv({ path: resolve("..", ".env.local")})

const lang = "pt_br"
const jar = new CookieJar();
const client = wrapper(axios.create({ jar, withCredentials: true}));
const helper = AcHelper();

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
        const raw = await client.get(`${course.link}&lang=${lang}`);
        const html = raw.data;
        const $ = cheerio.load(html);
        const links = $("a[href*='assign']");
        const courseNameFiltered = helper.filterCourseName(course.name.slice(8));
        
        const activitiesArray = await Promise.all(
            links.map(async (index, link) => {
                const href = $(link).attr("href");
                const raw = await client.get(href);
                const html = raw.data;
    
                const id = parseInt(new URL(href).searchParams.get("id"));
                const actName = helper.getActName(link);
    
                // DUEDATE, PRIORITY AND STATE
                const smartDateObj = helper.getDueDateAndPriority(html);
                const dueDate = smartDateObj[0];
                const priority = smartDateObj[1];
                const state = smartDateObj[2];
    
                const done = helper.isDone(html);
                let lastMod;
                if (done) {
                    lastMod = helper.getLastMod(html);
                };
                
                if (!actName) return null;

                const actObj = helper.CreateActivityObj(id, courseNameFiltered, actName, href, dueDate, done, lastMod, priority, state);
                return actObj;
                
            })
        );

        const filtered = activitiesArray.filter(Boolean);
        const sortedActArr = helper.sortActArray(filtered);
        const finalObj = helper.CreateActivitiesWithCourse(courseNameFiltered, sortedActArr);
        finalArr.push(finalObj);
    };
    return finalArr;
};