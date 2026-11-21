
import {
    getUpcomingProjects,
    getProjectDetails,
    createProject,
    updateProject
} from '../models/projects.js';

import { getCategoriesByProjectId } from '../models/categories.js';
import { getAllOrganizations } from '../models/organizations.js';

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

// Display the new service project form
export const showNewProjectForm = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();

        res.render('new-project', {
            title: 'Create New Service Project',
            organizations
        });
    } catch (error) {
        next(error);
    }
};

// Process the new service project form
export const processNewProjectForm = async (req, res, next) => {
    try {
        const {
            title,
            description,
            location,
            date,
            organizationId
        } = req.body;

        const newProject = await createProject(
            title,
            description,
            location,
            date,
            organizationId
        );

        // Display success message
        req.flash('success', 'New service project created successfully!');

        res.redirect(`/project/${newProject.project_id}`);
    } catch (error) {
        next(error);
    }
};

// Display the edit service project form
export const showEditProjectForm = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const project = await getProjectDetails(projectId);

        if (!project) {
            const error = new Error('Service Project Not Found');
            error.status = 404;
            throw error;
        }

        const organizations = await getAllOrganizations();

        res.render('edit-project', {
            title: 'Edit Service Project',
            project,
            organizations
        });
    } catch (error) {
        next(error);
    }
};

// Process the edit service project form
export const processEditProjectForm = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const {
            title,
            description,
            location,
            date,
            organizationId
        } = req.body;

        await updateProject(
            projectId,
            title,
            description,
            location,
            date,
            organizationId
        );

        // Display success message
        req.flash('success', 'Service project updated successfully!');

        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};