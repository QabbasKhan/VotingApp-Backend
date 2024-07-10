const requireAdminAuth = (req, res, next) => {
    const { name, password } = req.headers; // Assuming name and password are passed in headers
    
    // Replace with your actual admin authentication logic
    if (name === 'admin' && password === 'admin123') {
        return next(); // Allow admin to proceed
    }
    return res.status(401).json({ error: 'Unauthorized' });
};

module.exports = requireAdminAuth 
