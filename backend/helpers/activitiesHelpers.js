function Course(name, link) {
    return { name, link };
};

function CreateActivitiesWithCourse(courseName, activiesArray) {
    return {
        courseName: courseName,
        activities: activiesArray
    };
};

function CreateActivityObj(actName, actLink) {
    return {
        actName: actName,
        actLink: actLink
    };
};

export default function achelper() {
    return{
        Course: (name, link) => Course(name, link),
        CreateActivitiesWithCourse: (courseName, activiesArray) => CreateActivitiesWithCourse(courseName, activiesArray),
        CreateActivityObj: (actName, actLink) => CreateActivityObj(actName, actLink)
    };
};