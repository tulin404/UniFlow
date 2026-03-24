import getAllActivities from "../services/getAllActivities.js";

export default async function activitiesController(req, res) {
    try {
        const response = await getAllActivities();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};