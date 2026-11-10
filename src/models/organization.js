
import db from './db.js';

/**
 * Retrieves all organizations from the database.
 */
export const getAllOrganizations = async () => {
    try {
        const result = await db.query(`
            SELECT
                organization_id,
                name,
                description,
                contact_email,
                logo_filename
            FROM organization
            ORDER BY organization_id ASC
        `);

        return result.rows;

    } catch (error) {
        console.error('Error retrieving organizations:', error);
        throw error;
    }
};
