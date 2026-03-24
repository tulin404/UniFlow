/* !!!IMPORTANT
   FUNCTIONS HERE ARE HIGHLY COUPLED BECAUSE IT SIMULATES A BROWSER.
   THATS WHY ALL THE FUNCTIONS ARE IN JUST ONE FILE
*/

import axios from "axios";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import * as cheerio from "cheerio";
import achelper from "../helpers/activitiesHelpers.js";

const jar = new CookieJar();
const client = wrapper(axios.create({ jar, withCredentials: true}));
const helper = achelper();

export async function getLoginToken() {
    const response = await client.get('https://ava-grad.unifacef.com.br/login/index.php');
    const html = response.data;
    const $ = cheerio.load(html);
    const loginToken = $('input[name="logintoken"]').val();
    return loginToken;
};

export async function getSessKey() {
    const RA = "FAKE_RA";
    const pass = "FAKE_PASS";

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

export async function getCourses() {
    const sesskey = await getSessKey();
    const response = await client.post(`https://ava-grad.unifacef.com.br/lib/ajax/service.php?sesskey=${sesskey}&info=core_course_get_enrolled_courses_by_timeline_classification`,
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
        const raw = await client.get(course.link);
        const html = raw.data;
        const $ = cheerio.load(html);
        const links = $("a[href*='assign']");
        links.each((index, link) => {
            const href = $(link).attr("href");
            const instanceName = $(link).find(".instancename");
            const allTxt = instanceName.text();
            const removeTxt = instanceName.find(".accesshide").text();
            const name = allTxt.replace(removeTxt, "");
            if (name) {
                const actObj = helper.CreateActivityObj(name, href);
                activitiesArray.push(actObj);
            };
        });
        const finalObj = helper.CreateActivitiesWithCourse(course.name, activitiesArray);
        finalArr.push(finalObj);
    };
    return finalArr;
};