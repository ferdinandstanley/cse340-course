
import db from './db.js';

// Get all categories
export const getAllCategories = async () => {
    try {
        const result = await db.query(`
            SELECT
                category_id,
                name
            FROM category
            ORDER BY category_id ASC
        `);

        return result.rows;
    } catch (error) {
        console.error('Error retrieving categories:', error);
        throw error;
    }
};

// Get one category by its ID
export const getCategoryDetails = async (categoryId) => {
    try {
        const result = await db.query(`
            SELECT
                category_id,
                name
            FROM category
            WHERE category_id = $1
        `, [categoryId]);

        return result.rows[0];
    } catch (error) {
        console.error('Error retrieving category details:', error);
        throw error;
    }
};

// Get all categories associated with a project
export const getCategoriesByProjectId = async (projectId) => {
    try {
        const result = await db.query(`
            SELECT
                c.category_id,
                c.name
            FROM category AS c
            INNER JOIN project_category AS pc
                ON c.category_id = pc.category_id
            WHERE pc.project_id = $1
            ORDER BY c.name ASC
        `, [projectId]);

        return result.rows;
    } catch (error) {
        console.error('Error retrieving project categories:', error);
        throw error;
    }
};

// Get all projects associated with a category
export const getProjectsByCategoryId = async (categoryId) => {
    try {
        const result = await db.query(`
            SELECT
                sp.project_id,
                sp.organization_id,
                sp.title,
                sp.description,
                sp.location,
                sp.date,
                o.name AS organization_name
            FROM service_project AS sp
            INNER JOIN project_category AS pc
                ON sp.project_id = pc.project_id
            INNER JOIN organization AS o
                ON sp.organization_id = o.organization_id
            WHERE pc.category_id = $1
            ORDER BY sp.date ASC, sp.project_id ASC
        `, [categoryId]);

        return result.rows;
    } catch (error) {
        console.error('Error retrieving projects by category:', error);
        throw error;
    }
};
