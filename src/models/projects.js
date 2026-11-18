
import db from './db.js';

// Get all service projects
export const getAllProjects = async () => {
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
};

// Get service projects belonging to one organization
export const getProjectsByOrganizationId = async (organizationId) => {
    const result = await db.query(`
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY date ASC, project_id ASC
    `, [organizationId]);

    return result.rows;
};
