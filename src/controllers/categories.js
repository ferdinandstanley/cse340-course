import { getProjectDetails } from '../models/projects.js';

import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments
} from '../models/categories.js';

// Display all categories
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Project Categories';

    res.render('categories', {
        title,
        categories
    });
};

// Display one category and its associated projects
const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryDetails(categoryId);

    if (!category) {
        const err = new Error('Category Not Found');
        err.status = 404;
        throw err;
    }

    const projects = await getProjectsByCategoryId(categoryId);

    const title = category.name;

    res.render('category', {
        title,
        category,
        projects
    });
};

export {
    showCategoriesPage,
    showCategoryDetailsPage
};

// Display the category assignment form
export const showAssignCategoriesForm = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;

        const project = await getProjectDetails(projectId);

        if (!project) {
            const error = new Error('Project not found');
            error.status = 404;
            throw error;
        }

        const categories = await getAllCategories();
        const assignedCategories = await getCategoriesByProjectId(projectId);

        res.render('assign-categories', {
            title: 'Assign Categories',
            project,
            categories,
            assignedCategories
        });
    } catch (error) {
        next(error);
    }
};

// Process category assignments
export const processAssignCategoriesForm = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;

        let categoryIds = req.body.categoryIds || [];

        // Convert a single selected category into an array
        if (!Array.isArray(categoryIds)) {
            categoryIds = [categoryIds];
        }

        await updateCategoryAssignments(projectId, categoryIds);

        // Display success message
        req.flash('success', 'Project categories assigned successfully!');

        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};