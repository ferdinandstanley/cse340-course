
import db from './db.js';

/**
 * Retrieves all service projects and their organization names.
 */
export const getAllProjects = async () => {
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
            INNER JOIN organization AS o
                ON sp.organization_id = o.organization_id
            ORDER BY sp.date ASC, sp.project_id ASC
        `);

        return result.rows;

    } catch (error) {
        console.error('Error retrieving service projects:', error);
        throw error;
    }
};
