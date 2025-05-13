import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    try {
        // Get token from header
        // const token = req.headers.authorization?.split(' ')[1];
        const token = req.cookies.token || req.headers['x-auth-token'] || req.query.token || req.body.token;

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ 
                success: false,
                message: 'Token is not valid' });
        }
        
        // Add user from payload
        req.user = decoded;
        // req.userId = decoded.userId; // Assuming the token contains userId
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default isAuthenticated;