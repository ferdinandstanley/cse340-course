
import db from './db.js';

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
