
import {
    getUpcomingProjects,
    getProjectDetails
} from '../models/projects.js';

import { getCategoriesByProjectId } from '../models/categories.js';

// Number of upcoming projects to display
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Display the five upcoming service projects
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

    const title = 'Upcoming Service Projects';

    res.render('projects', {
        title,
        projects
    });
};

// Display an individual service project
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);

    if (!project) {
        const err = new Error('Service Project Not Found');
        err.status = 404;
        throw err;
    }

    // Retrieve categories associated with this project
    const categories = await getCategoriesByProjectId(projectId);

    const title = project.title;

    res.render('project', {
        title,
        project,
        categories
    });
};

export {
    showProjectsPage,
    showProjectDetailsPage
};
