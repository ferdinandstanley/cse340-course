
import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId
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
