const jwt = require('jsonwebtoken');

// Middleware to extract and set userId from JWT token
extractUserId = (req, res, next) => {

    // Check if the request path is login or signup
    console.log("http method : " + req.method);
    if (req.path === '/signup' || req.path === '/login' || ( req.path === '/jokes' && ( req.method === 'POST'))) {
        return next(); // Skip authentication for these routes
    }

    // Get the JWT token from the Authorization header
    const token = req.header('Authorization');

    if (token) {
        try {
            // Verify the token and extract the userId and role
            const decodedToken = jwt.verify(token, 'Ahmad_Zafar');
            req.userId = decodedToken.userId;
            req.userRole = decodedToken.role;
        } catch (error) {
            res.send("Invalid token!");
            return;
        }
    }
    console.log("done with authentication!");
    if(req.userId && req.userRole)
        return next();
    if( req.path === '/jokes' && ( req.method === 'GET'))
    {
        return next();
    }
    else
        res.send("You are not authorized to access this resource!")
};

module.exports = extractUserId;
