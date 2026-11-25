
import { getProjectDetails } from '../models/projects.js';

import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} from '../models/categories.js';

// Display all categories
const showCategoriesPage = async (req, res, next) => {
    try {
        const categories = await getAllCategories();

        res.render('categories', {
            title: 'Service Project Categories',
            categories
        });
    } catch (error) {
        next(error);
    }
};

// Display one category and its associated projects
const showCategoryDetailsPage = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        const category = await getCategoryDetails(categoryId);

        if (!category) {
            const err = new Error('Category Not Found');
            err.status = 404;
            throw err;
        }

        const projects = await getProjectsByCategoryId(categoryId);

        res.render('category', {
            title: category.name,
            category,
            projects
        });
    } catch (error) {
        next(error);
    }
};

// Display the new category form
const showNewCategoryForm = (req, res) => {
    res.render('new-category', {
        title: 'Create New Category',
        category: {},
        errors: []
    });
};

// Process the new category form
const processNewCategoryForm = async (req, res, next) => {
    try {
        const { name } = req.body;

        const newCategory = await createCategory(name);

        req.flash('success', 'Category created successfully!');

        res.redirect(`/category/${newCategory.category_id}`);
    } catch (error) {
        next(error);
    }
};

// Display the edit category form
const showEditCategoryForm = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        const category = await getCategoryDetails(categoryId);

        if (!category) {
            const error = new Error('Category not found');
            error.status = 404;
            throw error;
        }

        res.render('edit-category', {
            title: 'Edit Category',
            category,
            errors: []
        });
    } catch (error) {
        next(error);
    }
};

// Process the edit category form
const processEditCategoryForm = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;

        await updateCategory(categoryId, name);

        req.flash('success', 'Category updated successfully!');

        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        next(error);
    }
};

// Display the category assignment form
const showAssignCategoriesForm = async (req, res, next) => {
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
const processAssignCategoriesForm = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;

        let categoryIds = req.body.categoryIds || [];

        if (!Array.isArray(categoryIds)) {
            categoryIds = [categoryIds];
        }

        await updateCategoryAssignments(projectId, categoryIds);

        req.flash('success', 'Project categories assigned successfully!');

        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    showAssignCategoriesForm,
    processAssignCategoriesForm
};
