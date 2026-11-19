
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

// Get projects belonging to one organization
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

// Get upcoming service projects
export const getUpcomingProjects = async (number_of_projects) => {
    const result = await db.query(`
        SELECT
            sp.project_id,
            sp.organization_id,
            sp.title,
            sp.description,
            sp.date,
            sp.location,
            o.name AS organization_name
        FROM service_project AS sp
        INNER JOIN organization AS o
            ON sp.organization_id = o.organization_id
        WHERE sp.date >= CURRENT_DATE
        ORDER BY sp.date ASC, sp.project_id ASC
        LIMIT $1
    `, [number_of_projects]);

    return result.rows;
};

// Get one service project by its ID
export const getProjectDetails = async (id) => {
    const result = await db.query(`
        SELECT
            sp.project_id,
            sp.organization_id,
            sp.title,
            sp.description,
            sp.date,
            sp.location,
            o.name AS organization_name
        FROM service_project AS sp
        INNER JOIN organization AS o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1
    `, [id]);

    return result.rows[0];
};
