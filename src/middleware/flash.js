// Flash message middleware
const flashMiddleware = (req, res, next) => {
    req.flash = (type, message) => {
        if (message) {
            // Store a new flash message
            req.session.flash = req.session.flash || {};
            req.session.flash[type] = req.session.flash[type] || [];
            req.session.flash[type].push(message);
        } else if (type) {
            // Retrieve and clear messages of a specific type
            const messages = req.session.flash?.[type] || [];

            if (req.session.flash) {
                delete req.session.flash[type];
            }

            return messages;
        } else {
            // Retrieve and clear all flash messages
            const messages = req.session.flash || {};
            req.session.flash = {};
            return messages;
        }
    };

    // Make flash messages available to EJS templates
    res.locals.flash = req.flash;

    next();
};

export default flashMiddleware;